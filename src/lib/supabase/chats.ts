import { supabase } from '../supabaseClient';
import { Chat, Message } from '../../types/chat';

export const createChat = async (userId: string, title: string = 'New Chat'): Promise<Chat | null> => {
  try {
    const { data, error } = await supabase
      .from('chats')
      .insert([{ user_id: userId, title }])
      .select('id, title, user_id, created_at, updated_at')
      .single();

    if (error) {
      console.error('Error creating chat:', error);
      return null;
    }

    return {
      id: data.id,
      title: data.title,
      userId: data.user_id,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      messages: []
    };
  } catch (error) {
    console.error('Error creating chat:', error);
    return null;
  }
};

export const getChat = async (chatId: string): Promise<Chat | null> => {
  try {
    // First get the chat details
    const { data: chat, error: chatError } = await supabase
      .from('chats')
      .select('id, title, user_id, created_at, updated_at')
      .eq('id', chatId)
      .single();

    if (chatError) {
      console.error('Error getting chat:', chatError);
      return null;
    }

    // Then get all messages for this chat
    const { data: messages, error: messagesError } = await supabase
      .from('messages')
      .select('*')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true });

    if (messagesError) {
      console.error('Error getting messages:', messagesError);
      return null;
    }

    return {
      id: chat.id,
      title: chat.title,
      userId: chat.user_id,
      createdAt: chat.created_at,
      updatedAt: chat.updated_at,
      messages: messages.map(msg => ({
        id: msg.id,
        chatId: msg.chat_id,
        senderId: msg.sender_id,
        aiAgent: msg.ai_agent,
        content: msg.content,
        role: msg.role,
        createdAt: msg.created_at
      }))
    };
  } catch (error) {
    console.error('Error getting chat:', error);
    return null;
  }
};

export const getUserChats = async (userId: string): Promise<Chat[]> => {
  try {
    // Get all chats for the user
    const { data: chats, error: chatsError } = await supabase
      .from('chats')
      .select('id, title, user_id, created_at, updated_at')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (chatsError) {
      console.error('Error getting user chats:', chatsError);
      return [];
    }

    // Get all messages for these chats
    const chatIds = chats.map(chat => chat.id);
    const { data: messages, error: messagesError } = await supabase
      .from('messages')
      .select('*')
      .in('chat_id', chatIds)
      .order('created_at', { ascending: true });

    if (messagesError) {
      console.error('Error getting messages:', messagesError);
      return [];
    }

    // Group messages by chat_id
    const messagesByChatId = messages?.reduce((acc, msg) => {
      if (!acc[msg.chat_id]) {
        acc[msg.chat_id] = [];
      }
      acc[msg.chat_id].push({
        id: msg.id,
        chatId: msg.chat_id,
        senderId: msg.sender_id,
        aiAgent: msg.ai_agent,
        content: msg.content,
        role: msg.role,
        createdAt: msg.created_at
      });
      return acc;
    }, {} as Record<string, Message[]>) || {};

    // Combine chats with their messages
    return chats.map(chat => ({
      id: chat.id,
      title: chat.title,
      userId: chat.user_id,
      createdAt: chat.created_at,
      updatedAt: chat.updated_at,
      messages: messagesByChatId[chat.id] || []
    }));
  } catch (error) {
    console.error('Error getting user chats:', error);
    return [];
  }
};

export const addMessage = async (
  chatId: string,
  content: string,
  role: 'user' | 'assistant',
  senderId?: string,
  aiAgent?: string
): Promise<Message | null> => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert([{
        chat_id: chatId,
        content,
        role,
        sender_id: senderId,
        ai_agent: aiAgent
      }])
      .select()
      .single();

    if (error) {
      console.error('Error adding message:', error);
      return null;
    }

    // Update chat's updated_at timestamp
    await supabase
      .from('chats')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', chatId);

    return {
      id: data.id,
      chatId: data.chat_id,
      senderId: data.sender_id,
      aiAgent: data.ai_agent,
      content: data.content,
      role: data.role,
      createdAt: data.created_at
    };
  } catch (error) {
    console.error('Error adding message:', error);
    return null;
  }
};

export const deleteChat = async (chatId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('chats')
      .delete()
      .eq('id', chatId);

    if (error) {
      console.error('Error deleting chat:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting chat:', error);
    return false;
  }
};

export const updateChatTitle = async (chatId: string, newTitle: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('chats')
      .update({ title: newTitle })
      .eq('id', chatId);

    if (error) {
      console.error('Error updating chat title:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error updating chat title:', error);
    return false;
  }
};