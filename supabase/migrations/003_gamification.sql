-- Migration 003: Gamification tables (achievements, daily logins, XP transactions)

-- Create achievement requirement type enum
create type achievement_requirement_type as enum (
  'first_lesson',
  'streak_3',
  'streak_7',
  'streak_30',
  'first_project',
  'project_5',
  'project_10',
  'hackathon_winner',
  'sponsor_winner'
);

-- Create achievements table
create table public.achievements (
  id uuid primary key default uuid_generate_v4() not null,
  title text not null,
  description text not null,
  icon text not null,
  requirement_type achievement_requirement_type not null,
  requirement_value integer default 1,
  xp_bonus integer default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create index on requirement type for lookups
create index achievements_requirement_type_idx on public.achievements(requirement_type);

-- Create user_achievements table
create table public.user_achievements (
  user_id uuid references auth.users on delete cascade not null,
  achievement_id uuid references public.achievements(id) on delete cascade not null,
  unlocked_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (user_id, achievement_id)
);

-- Create index on user_id for user achievements
create index user_achievements_user_idx on public.user_achievements(user_id);
create index user_achievements_unlocked_at_idx on public.user_achievements(unlocked_at desc);

-- Create daily_logins table
create table public.daily_logins (
  user_id uuid references auth.users on delete cascade not null,
  login_date date not null,
  streak_count integer default 1 not null check (streak_count > 0),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (user_id, login_date)
);

-- Create index on login_date for streak calculations
create index daily_logins_login_date_idx on public.daily_logins(login_date);
create index daily_logins_user_idx on public.daily_logins(user_id);

-- Create xp_transactions table for audit trail
create table public.xp_transactions (
  id uuid primary key default uuid_generate_v4() not null,
  user_id uuid references auth.users on delete cascade not null,
  amount integer not null,
  source text not null,
  reference_id uuid,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes for XP transactions
create index xp_transactions_user_idx on public.xp_transactions(user_id);
create index xp_transactions_created_at_idx on public.xp_transactions(created_at desc);
create index xp_transactions_source_idx on public.xp_transactions(source);

-- Enable Row Level Security
alter table public.achievements enable row level security;
alter table public.user_achievements enable row level security;
alter table public.daily_logins enable row level security;
alter table public.xp_transactions enable row level security;

-- RLS Policies
-- Achievements are public readable
create policy "Achievements are public"
  on public.achievements for select
  using (true);

-- Users can view own achievements
create policy "Users can view own achievements"
  on public.user_achievements for select
  using (auth.uid() = user_id);

-- System can insert achievements (via function)
create policy "System can insert achievements"
  on public.user_achievements for insert
  with check (true);

-- Users can view own daily logins
create policy "Users can view own daily logins"
  on public.daily_logins for select
  using (auth.uid() = user_id);

-- Users can insert own daily logins
create policy "Users can insert own daily logins"
  on public.daily_logins for insert
  with check (auth.uid() = user_id);

-- Users can view own XP transactions
create policy "Users can view own XP transactions"
  on public.xp_transactions for select
  using (auth.uid() = user_id);

-- Function to record daily login and update streak
create or replace function public.record_daily_login(p_user_id uuid)
returns integer as $$
declare
  v_today date := current_date;
  v_yesterday date := current_date - interval '1 day';
  v_streak integer;
  v_last_login date;
begin
  -- Get last login date and current streak
  select max(login_date), max(streak_count)
  into v_last_login, v_streak
  from public.daily_logins
  where user_id = p_user_id;

  -- If no previous login, start new streak
  if v_last_login is null then
    insert into public.daily_logins (user_id, login_date, streak_count)
    values (p_user_id, v_today, 1);
    return 1;
  end if;

  -- If logged in today, return existing streak
  if v_last_login = v_today then
    return v_streak;
  end if;

  -- If logged in yesterday, increment streak
  if v_last_login = v_yesterday then
    v_streak := v_streak + 1;
    insert into public.daily_logins (user_id, login_date, streak_count)
    values (p_user_id, v_today, v_streak);
    return v_streak;
  end if;

  -- Otherwise, reset streak to 1
  insert into public.daily_logins (user_id, login_date, streak_count)
  values (p_user_id, v_today, 1);
  return 1;
end;
$$ language plpgsql security definer;

-- Function to unlock achievement
create or replace function public.unlock_achievement(p_user_id uuid, p_achievement_id uuid)
returns boolean as $$
declare
  v_already_unlocked boolean;
begin
  -- Check if already unlocked
  select exists(
    select 1 from public.user_achievements
    where user_id = p_user_id and achievement_id = p_achievement_id
  ) into v_already_unlocked;

  if v_already_unlocked then
    return false;
  end if;

  -- Unlock achievement
  insert into public.user_achievements (user_id, achievement_id)
  values (p_user_id, p_achievement_id);

  -- Add XP bonus from achievement
  perform public.add_xp(
    p_user_id,
    (select xp_bonus from public.achievements where id = p_achievement_id),
    'achievement',
    p_achievement_id
  );

  return true;
end;
$$ language plpgsql security definer;

-- Function to check and unlock achievements based on streak
create or replace function public.check_streak_achievements(p_user_id uuid, p_streak integer)
returns void as $$
begin
  -- 3-day streak
  if p_streak >= 3 then
    perform public.unlock_achievement(
      p_user_id,
      (select id from public.achievements where requirement_type = 'streak_3' limit 1)
    );
  end if;

  -- 7-day streak
  if p_streak >= 7 then
    perform public.unlock_achievement(
      p_user_id,
      (select id from public.achievements where requirement_type = 'streak_7' limit 1)
    );
  end if;

  -- 30-day streak
  if p_streak >= 30 then
    perform public.unlock_achievement(
      p_user_id,
      (select id from public.achievements where requirement_type = 'streak_30' limit 1)
    );
  end if;
end;
$$ language plpgsql security definer;
