import React, { useState } from 'react';
import { ChevronLeft, Share2, Camera, Video, Headphones, FileText, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import FloatingAnalyticsButton from './FloatingAnalyticsButton';

interface SocialPlatform {
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
}

const NewPost: React.FC = () => {
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [socialPlatforms, setSocialPlatforms] = useState<SocialPlatform[]>([
    { id: 'youtube', name: 'Grow your Business', icon: '/icons/youtube.png', enabled: false },
    { id: 'facebook', name: 'Grow your Business', icon: '/icons/facebook.png', enabled: false },
    { id: 'linkedin', name: 'Grow your Business', icon: '/icons/linkedin.png', enabled: false },
    { id: 'instagram-feed', name: 'Grow your Business', icon: '/icons/instagram.png', enabled: false },
    { id: 'instagram-story', name: 'Grow your Business', icon: '/icons/instagram-story.png', enabled: false },
    { id: 'instagram-reels', name: 'Grow your Business', icon: '/icons/instagram-reels.png', enabled: false },
    { id: 'pinterest', name: 'Grow your Business', icon: '/icons/pinterest.png', enabled: false },
    { id: 'google', name: 'Grow your Business', icon: '/icons/google.png', enabled: false },
    { id: 'podcast', name: 'Grow your Business', icon: '/icons/podcast.png', enabled: false },
    { id: 'spotify', name: 'Grow your Business', icon: '/icons/spotify.png', enabled: false },
    { id: 'apple-music', name: 'Grow your Business', icon: '/icons/apple-music.png', enabled: false },
    { id: 'apple-podcast', name: 'Grow your Business', icon: '/icons/apple-podcast.png', enabled: false },
    { id: 'iheart', name: 'Grow your Business', icon: '/icons/iheart.png', enabled: false },
    { id: 'blogger', name: 'Grow your Business', icon: '/icons/blogger.png', enabled: false },
    { id: 'medium', name: 'Grow your Business', icon: '/icons/medium.png', enabled: false },
    { id: 'wordpress', name: 'Grow your Business', icon: '/icons/wordpress.png', enabled: false },
    { id: 'substack', name: 'Grow your Business', icon: '/icons/substack.png', enabled: false },
    { id: 'x', name: 'Grow your Business', icon: '/icons/x.png', enabled: false }
  ]);

  const locations = [
    { id: 'atl', name: 'ATL' },
    { id: 'nyc', name: 'NYC' },
    { id: 'tx', name: 'TX' }
  ];

  const tagPeople = [
    { id: 'mr-gyb', name: 'Mr. GYB' },
    { id: 'grow-business', name: 'Grow your Business' }
  ];

  const togglePlatform = (platformId: string) => {
    setSocialPlatforms(platforms =>
      platforms.map(platform =>
        platform.id === platformId
          ? { ...platform, enabled: !platform.enabled }
          : platform
      )
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-navy-blue text-white py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/dashboard" className="mr-4">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-2xl">New Post</h1>
        </div>
        <button className="bg-gold text-navy-blue px-6 py-2 rounded-full font-semibold">
          Share
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Profile Section */}
        <div className="flex items-center mb-8">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img
              src="https://drive.google.com/uc?export=view&id=1H1PYdJ4qNz8a2R6WaxaYw22awKagmEy9"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-6">
            <h2 className="text-2xl font-bold text-navy-blue">
              Let's Grow Your Business Today with Our Proven 4C's Formula!
            </h2>
          </div>
        </div>

        {/* Tag People */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Tag People</h3>
          <div className="flex gap-2">
            {tagPeople.map(person => (
              <button
                key={person.id}
                onClick={() => setSelectedPeople(prev =>
                  prev.includes(person.id)
                    ? prev.filter(id => id !== person.id)
                    : [...prev, person.id]
                )}
                className={`px-4 py-2 rounded-full ${
                  selectedPeople.includes(person.id)
                    ? 'bg-navy-blue text-white'
                    : 'bg-gray-100 text-navy-blue'
                }`}
              >
                {person.name}
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Add Location</h3>
          <div className="flex gap-2">
            {locations.map(location => (
              <button
                key={location.id}
                onClick={() => setSelectedLocation(location.id)}
                className={`px-4 py-2 rounded-full ${
                  selectedLocation === location.id
                    ? 'bg-navy-blue text-white'
                    : 'bg-gray-100 text-navy-blue'
                }`}
              >
                {location.name}
              </button>
            ))}
          </div>
        </div>

        {/* Social Platforms */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Post To Other Accounts</h3>
          <div className="space-y-4">
            {[
              { type: 'video', platforms: socialPlatforms.slice(0, 5) },
              { type: 'photo', platforms: socialPlatforms.slice(5, 8) },
              { type: 'audio', platforms: socialPlatforms.slice(8, 13) },
              { type: 'written', platforms: socialPlatforms.slice(13) }
            ].map((section, index) => (
              <div key={index} className="flex items-center">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mr-4">
                  {section.type === 'video' && <Video className="w-8 h-8 text-navy-blue" />}
                  {section.type === 'photo' && <Camera className="w-8 h-8 text-navy-blue" />}
                  {section.type === 'audio' && <Headphones className="w-8 h-8 text-navy-blue" />}
                  {section.type === 'written' && <FileText className="w-8 h-8 text-navy-blue" />}
                </div>
                <div className="flex-grow space-y-2">
                  {section.platforms.map(platform => (
                    <div key={platform.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img src={platform.icon} alt={platform.name} className="w-6 h-6 mr-2" />
                        <span>{platform.name}</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={platform.enabled}
                          onChange={() => togglePlatform(platform.id)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="mt-8">
          <button className="text-navy-blue font-semibold flex items-center">
            Advanced Settings
            <ChevronRight size={20} className="ml-1" />
          </button>
        </div>
      </div>

      {/* Floating Analytics Button */}
      <FloatingAnalyticsButton />
    </div>
  );
};

export default NewPost;