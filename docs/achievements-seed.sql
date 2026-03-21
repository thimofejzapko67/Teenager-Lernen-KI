-- Seed achievements for ClawAcademy
-- Run this in your Supabase SQL editor to populate achievements

insert into public.achievements (title, description, icon, requirement_type, requirement_value, xp_bonus)
values
  -- First achievements
  ('First Steps', 'Complete your first lesson on ClawAcademy', '🎓', 'first_lesson', 1, 50),
  ('Starter Pack', 'Upload your first project', '🚀', 'first_project', 1, 100),

  -- Streak achievements
  ('3-Day Streak', 'Maintain a 3-day learning streak', '🔥', 'streak_3', 3, 75),
  ('Week Warrior', 'Maintain a 7-day learning streak', '⚔️', 'streak_7', 7, 200),
  ('Monthly Master', 'Maintain a 30-day learning streak', '👑', 'streak_30', 30, 500),

  -- Project milestones
  ('Rising Creator', 'Upload 5 projects', '⭐', 'project_5', 5, 250),
  ('Prolific Developer', 'Upload 10 projects', '💎', 'project_10', 10, 500),

  -- Competition achievements
  ('Hackathon Hero', 'Win a ClawAcademy hackathon', '🏆', 'hackathon_winner', 1, 1000),
  ('Sponsored Star', 'Get sponsored by a company', '🌟', 'sponsor_winner', 1, 2000)
on conflict do nothing;

-- Verify insert
select * from public.achievements order by created_at;
