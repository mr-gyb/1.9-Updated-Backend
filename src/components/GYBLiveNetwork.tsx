import React, { useState } from 'react';
import { ChevronLeft, Search, Star, X, Bot, Code, Edit3, Video, Camera, Headphones, FileText, Briefcase, Users, Brain, BarChart2, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import NetworkFilter from './filters/NetworkFilter';
import { UserProfile } from '../types/user';
import { AI_USERS, PLACEHOLDER_USERS } from '../types/user';

const GYBLiveNetwork: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'list' | 'map' | 'news'>('list');
  const [selectedMapUser, setSelectedMapUser] = useState<UserProfile | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([
    ...Object.values(AI_USERS),
    ...Object.values(PLACEHOLDER_USERS)
  ]);

  const handleFilterChange = (filters: any) => {
    let filtered = [...Object.values(AI_USERS), ...Object.values(PLACEHOLDER_USERS)];

    if (filters.experience?.length > 0) {
      filtered = filtered.filter(user => filters.experience.includes(user.experience));
    }

    if (filters.rating) {
      filtered = filtered.filter(user => user.rating >= filters.rating);
    }

    if (filters.location?.length > 0) {
      filtered = filtered.filter(user => filters.location.includes(user.location));
    }

    setFilteredUsers(filtered);
  };

  const getExperienceColor = (experience: string) => {
    switch (experience) {
      case 'beginner': return 'border-red-500';
      case 'intermediate': return 'border-orange-500';
      case 'proficient': return 'border-blue-500';
      case 'advanced': return 'border-green-500';
      case 'expert': return 'border-yellow-400';
      default: return 'border-gray-300';
    }
  };

  const getExpertiseIcon = (industry: string) => {
    switch (industry) {
      case 'writer': return Edit3;
      case 'coder': return Code;
      case 'videographer': return Video;
      case 'photographer': return Camera;
      case 'audio': return Headphones;
      case 'content': return FileText;
      case 'business': return Briefcase;
      case 'leadership': return Users;
      case 'ai': return Brain;
      case 'analytics': return BarChart2;
      case 'community': return Heart;
      default: return FileText;
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= Math.round(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const renderExperienceLevel = (level: number) => {
    const colors = {
      1: 'bg-red-500',
      2: 'bg-orange-500',
      3: 'bg-blue-500',
      4: 'bg-green-500',
      5: 'bg-yellow-400'
    };

    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((dot) => (
          <div
            key={dot}
            className={`w-2 h-2 rounded-full ${dot <= level ? colors[dot as keyof typeof colors] : 'bg-gray-300'}`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">Level {level}</span>
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen text-navy-blue">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Link to="/dashboard" className="mr-4 text-navy-blue">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-navy-blue">GYB Live Network</h1>
        </div>

        {viewMode === 'list' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
                onClick={() => navigate(`/user-profile/${user.id}`)}
              >
                <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url(${user.cover_image_url})` }}></div>
                <div className="p-4 relative">
                  <div className="absolute -top-12 left-4">
                    <div className={`w-24 h-24 rounded-full border-4 ${getExperienceColor(user.experience)} overflow-hidden bg-white`}>
                      <img src={user.profile_image_url} alt={user.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="mt-14">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xl">{user.name}</h3>
                      {user.isAI && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center">
                          <Bot size={16} className="mr-1" />
                          AI
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-2">{user.username}</p>
                    
                    <div className="flex items-center mb-2">
                      {(() => {
                        const Icon = getExpertiseIcon(user.industry);
                        return (
                          <>
                            <Icon size={16} className="mr-2 text-navy-blue" />
                            <span className="text-sm font-medium capitalize">{user.industry}</span>
                          </>
                        );
                      })()}
                    </div>

                    {renderExperienceLevel(user.experienceLevel)}
                    <p className="text-gray-600 mb-2 line-clamp-2">{user.bio}</p>
                    {renderStars(user.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {viewMode === 'map' && (
          <div className="relative h-[calc(100vh-200px)]">
            <div className="w-full h-full rounded-lg overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
                alt="Map background"
                className="w-full h-full object-cover"
              />

              {filteredUsers.map((user, index) => {
                const left = 20 + (index * 50 % 60);
                const top = 20 + (Math.floor(index * 50 / 60) * 20);
                
                return (
                  <button
                    key={user.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110 focus:outline-none"
                    style={{ left: `${left}%`, top: `${top}%` }}
                    onClick={() => setSelectedMapUser(user)}
                  >
                    <div className={`w-12 h-12 rounded-full border-2 ${getExperienceColor(user.experience)} overflow-hidden`}>
                      <img
                        src={user.profile_image_url}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </button>
                );
              })}
            </div>
            
            {selectedMapUser && (
              <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg max-w-sm">
                <button 
                  onClick={() => setSelectedMapUser(null)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
                <div className="flex items-center mb-4">
                  <img
                    src={selectedMapUser.profile_image_url}
                    alt={selectedMapUser.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{selectedMapUser.name}</h3>
                    <p className="text-gray-600">{selectedMapUser.username}</p>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  {(() => {
                    const Icon = getExpertiseIcon(selectedMapUser.industry);
                    return (
                      <>
                        <Icon size={16} className="mr-2 text-navy-blue" />
                        <span className="text-sm font-medium capitalize">{selectedMapUser.industry}</span>
                      </>
                    );
                  })()}
                </div>
                {renderExperienceLevel(selectedMapUser.experienceLevel)}
                <p className="text-gray-700 mb-4 line-clamp-2">{selectedMapUser.bio}</p>
                {renderStars(selectedMapUser.rating)}
                <button
                  onClick={() => navigate(`/user-profile/${selectedMapUser.id}`)}
                  className="mt-4 bg-navy-blue text-white px-4 py-2 rounded-full text-sm hover:bg-opacity-90 w-full"
                >
                  View Profile
                </button>
              </div>
            )}
          </div>
        )}

        {viewMode === 'news' && (
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center mb-4">
                  <img
                    src={user.profile_image_url}
                    alt={user.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-bold">{user.name}</h3>
                    <p className="text-gray-600">{user.username}</p>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  {(() => {
                    const Icon = getExpertiseIcon(user.industry);
                    return (
                      <>
                        <Icon size={16} className="mr-2 text-navy-blue" />
                        <span className="text-sm font-medium capitalize">{user.industry}</span>
                      </>
                    );
                  })()}
                </div>
                {renderExperienceLevel(user.experienceLevel)}
                <p className="text-gray-700 mb-4">{user.bio}</p>
                <button
                  onClick={() => navigate(`/user-profile/${user.id}`)}
                  className="text-navy-blue hover:underline"
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <NetworkFilter onFilterChange={handleFilterChange} />
    </div>
  );
};

export default GYBLiveNetwork;