-- Add new columns to profiles table if they don't exist
alter table public.profiles 
  add column if not exists username text,
  add column if not exists bio text,
  add column if not exists location text,
  add column if not exists website text,
  add column if not exists experience text check (experience in ('beginner', 'intermediate', 'proficient', 'advanced', 'expert')),
  add column if not exists rating numeric default 0,
  add column if not exists following integer default 0,
  add column if not exists followers integer default 0,
  add column if not exists cover_image_url text;

-- Only try to rename avatar_url if profile_image_url doesn't exist
do $$ 
begin
  if exists (
    select 1 
    from information_schema.columns 
    where table_name = 'profiles' 
    and column_name = 'avatar_url'
  ) and not exists (
    select 1 
    from information_schema.columns 
    where table_name = 'profiles' 
    and column_name = 'profile_image_url'
  ) then
    alter table public.profiles rename column avatar_url to profile_image_url;
  end if;
end $$;

-- Add profile_image_url if neither it nor avatar_url exists
do $$
begin
  if not exists (
    select 1 
    from information_schema.columns 
    where table_name = 'profiles' 
    and (column_name = 'profile_image_url' or column_name = 'avatar_url')
  ) then
    alter table public.profiles add column profile_image_url text;
  end if;
end $$;