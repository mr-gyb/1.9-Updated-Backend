import React, { useState, useEffect, useRef } from 'react';
import { Send, PlusCircle, ChevronDown, Camera, Image as ImageIcon, Folder, Mic, Video, Headphones, Edit2, Check, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../contexts/ChatContext';
import { useNavigate } from 'react-router-dom';
import HomeFilter from './filters/HomeFilter';

const NewChat: React.FC = () => {
  const { user } = useAuth();
  const { createNewChat, addMessage, currentChatId, chats, updateChatTitle } = useChat();
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('Mr.GYB AI');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState('New Chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [filteredAgents, setFilteredAgents] = useState<string[]>([]);

  const agents = [
    { name: 'Mr.GYB AI', description: 'Your all-in-one business growth assistant' },
    { name: 'CEO', description: 'Strategic planning and business development expert' },
    { name: 'COO', description: 'Operations management and process optimization specialist' },
    { name: 'CHRO', description: 'Human resources expert for team building and culture' },
    { name: 'CTO', description: 'Technology strategy and innovation consultant' },
    { name: 'CMO', description: 'Marketing expert to scale your brand and reach' }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isEditingTitle]);

  const currentChat = currentChatId ? chats.find(chat => chat.id === currentChatId) : null;

  const handleSendMessage = async () => {
    if (input.trim() && currentChatId) {
      await addMessage(currentChatId, 'user', input);
      setInput('');

      setTimeout(async () => {
        await addMessage(
          currentChatId,
          'assistant',
          `This is a response from ${selectedAgent} to your message: "${input}"`,
          selectedAgent
        );
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
    if (currentChatId && editedTitle.trim()) {
      const success = await updateChatTitle(currentChatId, editedTitle.trim());
      if (success) {
        setIsEditing(false);
      }
    }
  };

  const handleTitleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleTitleUpdate();
    } else if (event.key === 'Escape') {
      setIsEditingTitle(false);
      setEditedTitle(currentChat?.title || 'New Chat');
    }
  };

  const handleFilterChange = (filters: { agentType: string[] }) => {
    if (!filters.agentType || filters.agentType.length === 0) {
      setFilteredAgents(agents.map(a => a.name));
    } else {
      setFilteredAgents(filters.agentType);
    }
  };

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
                  setEditedTitle(currentChat?.title || 'New Chat');
                }}
                className="ml-1 p-1 hover:bg-white/10 rounded"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <h1 className="text-lg font-semibold mr-2">{currentChat?.title || 'New Chat'}</h1>
              <button 
                onClick={() => {
                  setIsEditingTitle(true);
                  setEditedTitle(currentChat?.title || 'New Chat');
                }}
                className="p-1 hover:bg-white/10 rounded"
              >
                <Edit2 size={16} />
              </button>
            </div>
          )}

          <div className="flex items-center ml-4">
            <select
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
              className="appearance-none bg-transparent text-white pr-8 py-1 focus:outline-none text-center font-bold text-sm sm:text-base"
            >
              {(filteredAgents.length > 0 ? filteredAgents : agents.map(a => a.name)).map((agentName) => (
                <option key={agentName} value={agentName} className="text-navy-blue">
                  {agentName}
                </option>
              ))}
            </select>
            <ChevronDown className="ml-2" size={16} />
          </div>

          <button
            onClick={() => createNewChat()}
            className="bg-gold text-navy-blue px-2 py-1 sm:px-4 sm:py-2 rounded-full flex items-center text-xs sm:text-sm ml-4"
          >
            <PlusCircle size={16} className="mr-1 sm:mr-2" />
            New Chat
          </button>
        </div>
      </div>

      <main className="flex-grow overflow-y-auto p-4 space-y-4">
        {currentChat?.messages?.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs sm:max-w-md lg:max-w-lg rounded-lg p-2 sm:p-3 ${
              message.role === 'user' ? 'bg-gold text-navy-blue' : 'bg-navy-blue text-white'
            }`}>
              <p className="text-sm sm:text-base">{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

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
            value={input}
            onChange={(e) => setInput(e.target.value)}
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

      <HomeFilter onFilterChange={handleFilterChange} />
    </div>
  );
};

export default NewChat;