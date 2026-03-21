-- Migration 004: Projects and Sponsors tables

-- Create sponsor tier enum
create type sponsor_tier as enum ('bronze', 'silver', 'gold', 'platinum');

-- Create projects table
create table public.projects (
  id uuid primary key default uuid_generate_v4() not null,
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  description text not null,
  github_url text,
  screenshot_url text,
  tech_stack text[] not null default '{}',
  rating_count integer default 0 not null check (rating_count >= 0),
  rating_sum integer default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes for projects
create index projects_user_idx on public.projects(user_id);
create index projects_rating_sum_idx on public.projects(rating_sum desc);
create index projects_created_at_idx on public.projects(created_at desc);

-- Create project_ratings table
create table public.project_ratings (
  user_id uuid references auth.users on delete cascade not null,
  project_id uuid references public.projects(id) on delete cascade not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (user_id, project_id)
);

-- Create index for project ratings
create index project_ratings_project_idx on public.project_ratings(project_id);

-- Create sponsors table
create table public.sponsors (
  id uuid primary key default uuid_generate_v4() not null,
  company_name text not null,
  logo_url text,
  tier sponsor_tier not null,
  contact_email text not null,
  website_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create index for sponsors
create index sponsors_tier_idx on public.sponsors(tier);
create index sponsors_created_at_idx on public.sponsors(created_at desc);

-- Create sponsorships table
create table public.sponsorships (
  id uuid primary key default uuid_generate_v4() not null,
  sponsor_id uuid references public.sponsors(id) on delete cascade not null,
  user_id uuid references auth.users on delete cascade not null,
  status text not null check (status in ('pending', 'active', 'completed', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  expires_at timestamp with time zone
);

-- Create indexes for sponsorships
create index sponsorships_user_idx on public.sponsorships(user_id);
create index sponsorships_sponsor_idx on public.sponsorships(sponsor_id);
create index sponsorships_status_idx on public.sponsorships(status);
create index sponsorships_expires_at_idx on public.sponsorships(expires_at);

-- Create leaderboard_wins table for tracking top performers
create table public.leaderboard_wins (
  id uuid primary key default uuid_generate_v4() not null,
  user_id uuid references auth.users on delete cascade not null,
  period text not null, -- 'week-2025-12', 'month-2025-12', etc.
  rank integer not null check (rank between 1 and 100),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes for leaderboard wins
create index leaderboard_wins_user_idx on public.leaderboard_wins(user_id);
create index leaderboard_wins_period_idx on public.leaderboard_wins(period);
create index leaderboard_wins_created_at_idx on public.leaderboard_wins(created_at desc);

-- Enable Row Level Security
alter table public.projects enable row level security;
alter table public.project_ratings enable row level security;
alter table public.sponsors enable row level security;
alter table public.sponsorships enable row level security;
alter table public.leaderboard_wins enable row level security;

-- RLS Policies

-- Projects: public read, user write own
create policy "Projects are public readable"
  on public.projects for select
  using (true);

create policy "Users can create own projects"
  on public.projects for insert
  with check (auth.uid() = user_id);

create policy "Users can update own projects"
  on public.projects for update
  using (auth.uid() = user_id);

create policy "Users can delete own projects"
  on public.projects for delete
  using (auth.uid() = user_id);

-- Project ratings: public read, user write own
create policy "Project ratings are public readable"
  on public.project_ratings for select
  using (true);

create policy "Users can insert own ratings"
  on public.project_ratings for insert
  with check (auth.uid() = user_id);

create policy "Users can update own ratings"
  on public.project_ratings for update
  using (auth.uid() = user_id);

-- Sponsors: public read
create policy "Sponsors are public readable"
  on public.sponsors for select
  using (true);

-- Sponsorships: users read own, sponsors read relevant
create policy "Users can view own sponsorships"
  on public.sponsorships for select
  using (auth.uid() = user_id);

create policy "Sponsors can view their sponsorships"
  on public.sponsorships for select
  using (
    sponsor_id in (select id from public.sponsors where contact_email = (
      select email from auth.users where id = auth.uid()
    ))
  );

-- Leaderboard wins: public readable
create policy "Leaderboard wins are public readable"
  on public.leaderboard_wins for select
  using (true);

-- Function to rate a project
create or replace function public.rate_project(
  p_user_id uuid,
  p_project_id uuid,
  p_rating integer
)
returns numeric as $$
declare
  v_old_rating integer;
  v_new_rating_count integer;
  v_new_rating_sum integer;
  v_average numeric;
begin
  -- Check if user already rated
  select rating into v_old_rating
  from public.project_ratings
  where user_id = p_user_id and project_id = p_project_id;

  -- Get current project stats
  select rating_count, rating_sum
  into v_new_rating_count, v_new_rating_sum
  from public.projects
  where id = p_project_id;

  -- If updating existing rating
  if v_old_rating is not null then
    v_new_rating_sum := v_new_rating_sum - v_old_rating + p_rating;
    update public.project_ratings
    set rating = p_rating
    where user_id = p_user_id and project_id = p_project_id;
  else
    -- New rating
    v_new_rating_sum := v_new_rating_sum + p_rating;
    v_new_rating_count := v_new_rating_count + 1;
    insert into public.project_ratings (user_id, project_id, rating)
    values (p_user_id, p_project_id, p_rating);
  end if;

  -- Update project stats
  update public.projects
  set rating_count = v_new_rating_count,
      rating_sum = v_new_rating_sum
  where id = p_project_id;

  -- Return new average
  select (rating_sum::numeric / nullif(rating_count, 0))::numeric(3, 2)
  into v_average
  from public.projects
  where id = p_project_id;

  return v_average;
end;
$$ language plpgsql security definer;

-- Function to check if user is in cooldown (too many wins)
create or replace function public.is_user_in_cooldown(p_user_id uuid)
returns boolean as $$
declare
  v_recent_wins integer;
  v_cooldown_until timestamp with time zone;
begin
  -- Count wins in last 3 months
  select count(*)
  into v_recent_wins
  from public.leaderboard_wins
  where user_id = p_user_id
    and created_at > now() - interval '3 months';

  -- If 3 or more wins, check cooldown
  if v_recent_wins >= 3 then
    -- Get most recent win date
    select max(created_at) + interval '1 month'
    into v_cooldown_until
    from public.leaderboard_wins
    where user_id = p_user_id
      and created_at > now() - interval '3 months';

    -- If still in cooldown period
    if v_cooldown_until > now() then
      return true;
    end if;
  end if;

  return false;
end;
$$ language plpgsql security definer;
