import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, PlusCircle, ChevronDown, Camera, Image as ImageIcon, Folder, Mic, Video, Headphones, Edit2, Check, X } from 'lucide-react';
import { useChat } from '../contexts/ChatContext';
import { useAuth } from '../contexts/AuthContext';
import { getChat } from '../lib/supabase/chats';

const Chat: React.FC = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addMessage, updateChatTitle } = useChat();
  const [newMessage, setNewMessage] = useState('');
  const [currentAgent, setCurrentAgent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentChat, setCurrentChat] = useState<any>(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadChat = async () => {
      if (chatId) {
        setIsLoading(true);
        const chatData = await getChat(chatId);
        if (chatData) {
          setCurrentChat(chatData);
          setEditedTitle(chatData.title);
          // Find the last AI message to determine the current agent
          const lastAiMessage = chatData.messages?.reverse().find(m => m.role === 'assistant');
          if (lastAiMessage?.aiAgent) {
            setCurrentAgent(lastAiMessage.aiAgent);
          }
        } else {
          navigate('/new-chat');
        }
        setIsLoading(false);
      }
    };

    loadChat();
  }, [chatId, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat?.messages]);

  // Focus the title input when editing starts
  useEffect(() => {
    if (isEditingTitle) {
      titleInputRef.current?.focus();
    }
  }, [isEditingTitle]);

  const handleSendMessage = async () => {
    if (newMessage.trim() && chatId) {
      const userMessage = newMessage;
      setNewMessage('');

      // Add user message
      await addMessage(chatId, 'user', userMessage);

      // Simulate AI response
      setTimeout(async () => {
        await addMessage(
          chatId,
          'assistant',
          `This is a response from ${currentAgent || 'AI Assistant'} to your message: "${userMessage}"`,
          undefined,
          currentAgent || 'AI Assistant'
        );

        // Refresh chat data
        const updatedChat = await getChat(chatId);
        if (updatedChat) {
          setCurrentChat(updatedChat);
        }
      }, 1000);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleTitleUpdate = async () => {
    if (chatId && editedTitle.trim() !== currentChat.title) {
      const success = await updateChatTitle(chatId, editedTitle.trim());
      if (success) {
        setCurrentChat({ ...currentChat, title: editedTitle.trim() });
      }
    }
    setIsEditingTitle(false);
  };

  const handleTitleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleTitleUpdate();
    } else if (event.key === 'Escape') {
      setIsEditingTitle(false);
      setEditedTitle(currentChat.title);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy-blue"></div>
      </div>
    );
  }

  if (!currentChat) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="bg-navy-blue text-white py-2 px-4">
        <div className="flex items-center justify-between">
          {isEditingTitle ? (
            <div className="flex items-center flex-grow mr-2">
              <input
                ref={titleInputRef}
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onKeyDown={handleTitleKeyPress}
                className="bg-white/10 text-white px-2 py-1 rounded flex-grow"
                placeholder="Enter chat title..."
              />
              <button 
                onClick={handleTitleUpdate}
                className="ml-2 p-1 hover:bg-white/10 rounded"
              >
                <Check size={20} />
              </button>
              <button 
                onClick={() => {
                  setIsEditingTitle(false);
                  setEditedTitle(currentChat.title);
                }} 
                className="ml-1 p-1 hover:bg-white/10 rounded"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <h1 className="text-lg font-semibold mr-2">{currentChat.title}</h1>
              <button 
                onClick={() => setIsEditingTitle(true)}
                className="p-1 hover:bg-white/10 rounded"
              >
                <Edit2 size={16} />
              </button>
            </div>
          )}
          {currentAgent && <p className="text-sm opacity-75">Chatting with: {currentAgent}</p>}
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-2 sm:p-4 space-y-4">
        {currentChat.messages?.map((message: any, index: number) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs sm:max-w-md lg:max-w-lg rounded-lg p-2 sm:p-3 ${
              message.role === 'user' ? 'bg-gold text-navy-blue' : 'bg-navy-blue text-white'
            }`}>
              <p className="text-sm sm:text-base">{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-2 sm:p-4 border-t border-gray-200">
        <div className="flex items-center bg-gray-100 rounded-full">
          <div className="flex items-center space-x-1 sm:space-x-2 px-1 sm:px-2">
            <button className="p-1 sm:p-2 text-gray-600 hover:text-navy-blue">
              <Camera size={16} />
            </button>
            <button className="p-1 sm:p-2 text-gray-600 hover:text-navy-blue">
              <ImageIcon size={16} />
            </button>
            <button className="p-1 sm:p-2 text-gray-600 hover:text-navy-blue">
              <Folder size={16} />
            </button>
          </div>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Message"
            className="flex-grow bg-transparent border-none focus:outline-none px-2 sm:px-4 py-1 sm:py-2 text-navy-blue text-sm sm:text-base"
          />
          <div className="flex items-center space-x-1 sm:space-x-2 px-1 sm:px-2">
            <button className="p-1 sm:p-2 text-gray-600 hover:text-navy-blue">
              <Mic size={16} />
            </button>
            <button className="p-1 sm:p-2 text-gray-600 hover:text-navy-blue">
              <Headphones size={16} />
            </button>
            <button className="p-1 sm:p-2 text-gray-600 hover:text-navy-blue">
              <Video size={16} />
            </button>
            <button
              onClick={handleSendMessage}
              className="p-1 sm:p-2 text-navy-blue hover:text-blue-600"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;