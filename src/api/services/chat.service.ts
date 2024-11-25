import axiosInstance from '../axios';
import { Message } from '../../types/chat';

export const chatService = {
  async getChats() {
    const response = await axiosInstance.get('/chats');
    return response.data;
  },

  async createChat() {
    const response = await axiosInstance.post('/chats');
    return response.data;
  },

  async getChatMessages(chatId: string) {
    const response = await axiosInstance.get(`/chats/${chatId}/messages`);
    return response.data;
  },

  async sendMessage(chatId: string, message: Partial<Message>) {
    const response = await axiosInstance.post(`/chats/${chatId}/messages`, message);
    return response.data;
  },

  async deleteChat(chatId: string) {
    const response = await axiosInstance.delete(`/chats/${chatId}`);
    return response.data;
  }
};