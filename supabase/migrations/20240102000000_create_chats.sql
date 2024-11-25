-- Enable pgcrypto extension
create extension if not exists "pgcrypto";

-- Create updated_at function if it doesn't exist
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create chats table
create table if not exists public.chats (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  user_id uuid references auth.users not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create messages table
create table if not exists public.messages (
  id uuid default gen_random_uuid() primary key,
  chat_id uuid references public.chats on delete cascade not null,
  sender_id uuid references auth.users,
  ai_agent text,
  content text not null,
  role text not null check (role in ('user', 'assistant')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.chats enable row level security;
alter table public.messages enable row level security;

-- Create policies
create policy "Users can view their own chats"
  on chats for select
  using (auth.uid() = user_id);

create policy "Users can insert their own chats"
  on chats for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own chats"
  on chats for update
  using (auth.uid() = user_id);

create policy "Users can delete their own chats"
  on chats for delete
  using (auth.uid() = user_id);

create policy "Users can view messages from their chats"
  on messages for select
  using (
    exists (
      select 1 from chats
      where chats.id = messages.chat_id
      and chats.user_id = auth.uid()
    )
  );

create policy "Users can insert messages to their chats"
  on messages for insert
  with check (
    exists (
      select 1 from chats
      where chats.id = messages.chat_id
      and chats.user_id = auth.uid()
    )
  );

-- Create indexes
create index if not exists chats_user_id_idx on public.chats (user_id);
create index if not exists messages_chat_id_idx on public.messages (chat_id);
create index if not exists messages_sender_id_idx on public.messages (sender_id);

-- Handle updated_at for chats
create trigger handle_chats_updated_at
  before update on public.chats
  for each row
  execute function public.handle_updated_at();