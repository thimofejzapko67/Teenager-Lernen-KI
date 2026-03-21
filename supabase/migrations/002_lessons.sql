-- Create difficulty enum type
create type difficulty_enum as enum ('beginner', 'intermediate', 'advanced');

-- Create category enum type
create type category_enum as enum ('ki-basics', 'web-dev', 'mobile-dev', 'ai-agents', 'agi-safety', 'security');

-- Create lessons table
create table public.lessons (
  id uuid primary key default uuid_generate_v4() not null,
  title text not null,
  slug text unique not null,
  category category_enum not null,
  difficulty difficulty_enum not null,
  content text not null,
  xp_reward integer not null check (xp_reward > 0),
  duration integer not null check (duration > 0), -- in minutes
  order_index integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes for lessons
create index lessons_category_idx on public.lessons(category);
create index lessons_difficulty_idx on public.lessons(difficulty);
create index lessons_order_idx on public.lessons(order_index);
create index lessons_slug_idx on public.lessons(slug);

-- Create lesson_progress table
create table public.lesson_progress (
  user_id uuid references auth.users on delete cascade not null,
  lesson_id uuid references public.lessons(id) on delete cascade not null,
  completed_at timestamp with time zone,
  quiz_score integer check (quiz_score >= 0 and quiz_score <= 100),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (user_id, lesson_id)
);

-- Create indexes for lesson_progress
create index lesson_progress_user_idx on public.lesson_progress(user_id);
create index lesson_progress_completed_idx on public.lesson_progress(completed_at);

-- Enable Row Level Security on lessons
alter table public.lessons enable row level security;

-- RLS Policies for lessons
-- Everyone can view lessons
create policy "Lessons are public"
  on public.lessons for select
  using (true);

-- Enable Row Level Security on lesson_progress
alter table public.lesson_progress enable row level security;

-- RLS Policies for lesson_progress
-- Users can view their own progress
create policy "Users can view own progress"
  on public.lesson_progress for select
  using (auth.uid() = user_id);

-- Users can insert their own progress
create policy "Users can insert own progress"
  on public.lesson_progress for insert
  with check (auth.uid() = user_id);

-- Users can update their own progress
create policy "Users can update own progress"
  on public.lesson_progress for update
  using (auth.uid() = user_id);

-- Function to add XP to user
create or replace function public.add_xp(
  p_user_id uuid,
  p_amount integer,
  p_source text,
  p_reference_id uuid default null
)
returns integer as $$
declare
  v_new_xp integer;
  v_old_rank rank_enum;
begin
  -- Get current XP
  select xp into v_old_xp
  from public.profiles
  where id = p_user_id;

  -- Update XP
  update public.profiles
  set xp = xp + p_amount
  where id = p_user_id
  returning xp into v_new_xp;

  -- Update rank and level based on new XP
  perform public.update_user_rank(p_user_id);

  -- Return new XP total
  return v_new_xp;
end;
$$ language plpgsql security definer;

-- Function to get lessons by category with user progress
create or replace function public.get_lessons_with_progress(p_user_id uuid, p_category category_enum default null)
returns table (
  lesson_id uuid,
  title text,
  slug text,
  category category_enum,
  difficulty difficulty_enum,
  xp_reward integer,
  duration integer,
  completed_at timestamp with time zone,
  quiz_score integer
) as $$
begin
  return query
  select
    l.id as lesson_id,
    l.title,
    l.slug,
    l.category,
    l.difficulty,
    l.xp_reward,
    l.duration,
    lp.completed_at,
    lp.quiz_score
  from public.lessons l
  left join public.lesson_progress lp on lp.lesson_id = l.id and lp.user_id = p_user_id
  where p_category is null or l.category = p_category
  order by l.order_index;
end;
$$ language plpgsql security definer;
