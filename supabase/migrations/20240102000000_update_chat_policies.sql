-- Update the messages policy to allow viewing messages
drop policy if exists "Users can view messages from their chats" on messages;
create policy "Users can view messages from their chats"
  on messages for select
  using (
    exists (
      select 1 
      from chats 
      where chats.id = messages.chat_id 
      and chats.user_id = auth.uid()
    )
  );

-- Update the messages insert policy
drop policy if exists "Users can insert messages to their chats" on messages;
create policy "Users can insert messages to their chats"
  on messages for insert
  with check (
    exists (
      select 1 
      from chats 
      where chats.id = messages.chat_id 
      and chats.user_id = auth.uid()
    )
  );

-- Add index for performance
create index if not exists messages_created_at_idx on messages (created_at);

-- Grant necessary permissions
grant usage on schema public to authenticated;
grant all on chats to authenticated;
grant all on messages to authenticated;