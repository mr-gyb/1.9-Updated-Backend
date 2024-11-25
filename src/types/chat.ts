export interface Message {
  id: string;
  chatId: string;
  senderId?: string;
  aiAgent?: string;
  content: string;
  role: 'user' | 'assistant';
  createdAt: string;
}

export interface Chat {
  id: string;
  title: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  messages?: Message[];
}