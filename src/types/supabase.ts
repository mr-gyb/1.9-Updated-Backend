export interface Database {
  public: {
    Tables: {
      chats: {
        Row: {
          id: string;
          title: string;
          user_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          user_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          user_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          chat_id: string;
          sender_id?: string;
          ai_agent?: string;
          content: string;
          role: 'user' | 'assistant';
          created_at: string;
        };
        Insert: {
          id?: string;
          chat_id: string;
          sender_id?: string;
          ai_agent?: string;
          content: string;
          role: 'user' | 'assistant';
          created_at?: string;
        };
        Update: {
          id?: string;
          chat_id?: string;
          sender_id?: string;
          ai_agent?: string;
          content?: string;
          role?: 'user' | 'assistant';
          created_at?: string;
        };
      };
    };
  };
}