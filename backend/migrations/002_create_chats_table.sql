CREATE TABLE IF NOT EXISTS chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX chats_user_id_idx ON chats(user_id);
CREATE INDEX chats_created_at_idx ON chats(created_at);

ALTER TABLE tasks ADD COLUMN chat_id UUID REFERENCES chats(id) ON DELETE CASCADE;
CREATE INDEX tasks_chat_id_idx ON tasks(chat_id);
