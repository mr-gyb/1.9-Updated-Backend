import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getProfile, updateProfile } from '../lib/supabase/profile';
import { UserProfile } from '../types/user';
import { MapPin, Calendar, Link as LinkIcon, Mail, Edit2, Save, Image, MessageCircle, Star, Film, Plus, X, Camera, MoreVertical, ChevronUp, ChevronDown, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const defaultProfile: UserProfile = {
  id: '',
  name: '',
  username: '',
  bio: '',
  location: '',
  website: '',
  email: '',
  experience: 'beginner',
  rating: 0,
  following: 0,
  followers: 0,
  profile_image_url: '',
  cover_image_url: '',
  created_at: '',
  updated_at: ''
};

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<UserProfile>(defaultProfile);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (user) {
        setIsLoading(true);
        const profile = await getProfile(user.id);
        if (profile) {
          setProfileData({
            ...defaultProfile,
            ...profile
          });
        }
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      const success = await updateProfile(user.id, profileData);
      if (success) {
        setIsEditing(false);
      } else {
        setError('Failed to update profile');
      }
    } catch (err) {
      setError('An error occurred while updating profile');
      console.error('Profile update error:', err);
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy-blue"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Link to="/dashboard" className="mr-4 text-navy-blue">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-navy-blue">Profile</h1>
        </div>

        <div className="relative">
          <div 
            className="h-48 bg-cover bg-center"
            style={{ backgroundImage: `url(${profileData.cover_image_url || ''})` }}
          />
          <div className="absolute -bottom-16 left-8">
            <div className={`w-32 h-32 rounded-full border-4 ${getExperienceColor(profileData.experience)} overflow-hidden`}>
              <img
                src={profileData.profile_image_url || ''}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {renderStars(profileData.rating)}
          </div>
        </div>

        <div className="mt-20 px-4">
          <div className="flex justify-between items-start">
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="text-2xl font-bold mb-1 border-b border-navy-blue focus:outline-none"
                />
              ) : (
                <h1 className="text-2xl font-bold">{profileData.name || 'Unnamed User'}</h1>
              )}
              <p className="text-gray-600">{profileData.username || '@username'}</p>
            </div>
            <button
              onClick={isEditing ? handleSave : handleEditToggle}
              className="bg-navy-blue text-white px-4 py-2 rounded-full flex items-center"
            >
              {isEditing ? (
                <>
                  <Save size={20} className="mr-2" />
                  Save
                </>
              ) : (
                <>
                  <Edit2 size={20} className="mr-2" />
                  Edit Profile
                </>
              )}
            </button>
          </div>

          {isEditing ? (
            <textarea
              value={profileData.bio || ''}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              className="w-full mt-4 p-2 border rounded"
              rows={3}
            />
          ) : (
            <p className="mt-4">{profileData.bio || 'No bio available'}</p>
          )}

          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center text-gray-600">
              <MapPin size={16} className="mr-1" />
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.location || ''}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="border-b border-gray-300 focus:outline-none focus:border-navy-blue"
                />
              ) : (
                profileData.location || 'Location not set'
              )}
            </div>
            <div className="flex items-center text-gray-600">
              <LinkIcon size={16} className="mr-1" />
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.website || ''}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="border-b border-gray-300 focus:outline-none focus:border-navy-blue"
                />
              ) : (
                <a href={profileData.website || '#'} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {profileData.website || 'No website'}
                </a>
              )}
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar size={16} className="mr-1" />
              Joined {new Date(profileData.created_at || Date.now()).toLocaleDateString()}
            </div>
          </div>

          <div className="flex mt-4 space-x-4">
            <span><strong>{profileData.following}</strong> Following</span>
            <span><strong>{profileData.followers}</strong> Followers</span>
          </div>

          {error && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
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

const renderStars = (rating: number) => {
  return (
    <div className="flex items-center mt-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={star <= Math.round(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
        />
      ))}
      <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
};

export default Profile;