-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create ranks enum type
create type rank_enum as enum ('novice', 'coder', 'developer', 'architect', 'master', 'legend');

-- Create profiles table
create table public.profiles (
  id uuid primary key references auth.users on delete cascade not null,
  username text unique not null,
  avatar_url text,
  rank rank_enum default 'novice' not null,
  xp integer default 0 not null check (xp >= 0),
  level integer default 1 not null check (level >= 1),
  streak integer default 0 not null check (streak >= 0),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create index on username for lookups
create index profiles_username_idx on public.profiles(username);
create index profiles_rank_idx on public.profiles(rank);
create index profiles_xp_idx on public.profiles(xp desc);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- RLS Policies for profiles
-- Users can view all profiles
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

-- Users can update their own profile
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Users can insert their own profile (via trigger)
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Function to handle new user profile creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, xp, level, rank, streak)
  values (
    new.id,
    split_part(new.email, '@', 1), -- Default username from email
    0, -- Starting XP
    1, -- Starting level
    'novice', -- Starting rank
    0 -- Starting streak
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to calculate level from XP
create or replace function public.calculate_level(p_xp integer)
returns integer as $$
begin
  return floor(sqrt(p_xp::float / 100.0)) + 1;
end;
$$ language plpgsql immutable;

-- Function to get rank from XP
create or replace function public.get_rank_from_xp(p_xp integer)
returns rank_enum as $$
begin
  if p_xp >= 100000 then return 'legend';
  elsif p_xp >= 50000 then return 'master';
  elsif p_xp >= 15000 then return 'architect';
  elsif p_xp >= 5000 then return 'developer';
  elsif p_xp >= 1000 then return 'coder';
  else return 'novice';
  end if;
end;
$$ language plpgsql immutable;

-- Function to update user rank and level based on XP
create or replace function public.update_user_rank(p_user_id uuid)
returns void as $$
begin
  update public.profiles
  set
    level = public.calculate_level(xp),
    rank = public.get_rank_from_xp(xp)
  where id = p_user_id;
end;
$$ language plpgsql security definer;
