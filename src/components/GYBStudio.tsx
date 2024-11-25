import React, { useState, useEffect } from 'react';
import { ChevronLeft, Settings, ChevronDown, Play, Bookmark, Star, DollarSign, TrendingUp, Users, ThumbsUp, Plus, X, RotateCw, Check, Share2, Pause, Upload, Link as LinkIcon, FileText, Clock, AlertCircle, Edit2, Trash2, BarChart2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getContentHistory, deleteContent } from '../services/contentService';

const GYBStudio: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [postType, setPostType] = useState('Posts');
  const [topicFilter, setTopicFilter] = useState('All topics');
  const [locationFilter, setLocationFilter] = useState('United States');
  const [contentHistory, setContentHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedContent, setSelectedContent] = useState(null);

  useEffect(() => {
    if (user) {
      fetchContentHistory();
    }
  }, [user]);

  const fetchContentHistory = async () => {
    setIsLoading(true);
    try {
      const history = await getContentHistory(user!.id);
      setContentHistory(history);
    } catch (err) {
      setError('Failed to load content history');
      console.error('Error fetching content history:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteContent = async (contentId: string) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      try {
        await deleteContent(contentId);
        await fetchContentHistory();
      } catch (err) {
        console.error('Error deleting content:', err);
        alert('Failed to delete content');
      }
    }
  };

  const trendingPosts = [
    {
      id: 1,
      title: "BREAKING: The Menendez brothers are one step closer to freedom after L...",
      views: "72.3M",
      likes: "5.9M",
      image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      title: "Wait 😂",
      views: "36.1M",
      likes: "6.3M",
      image: "https://images.unsplash.com/photo-1586374579358-9d19d632b6df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      title: "Former President Barack Obama raps Eminem's \"Lose Yourself,\" after bei...",
      views: "40.1M",
      likes: "2.9M",
      image: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen text-navy-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <div className="flex items-center mb-6">
          <Link to="/new-post" className="flex items-center text-navy-blue hover:text-navy-blue/80">
            <ChevronLeft size={24} className="mr-2" />
            <span>Back to GYB Content AI</span>
          </Link>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Analytics Section */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Analytics</h2>
              <button
                onClick={() => navigate('/analytics')}
                className="text-blue-500 hover:text-blue-600 transition-colors"
              >
                View all
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp size={20} className="text-green-500 mr-2" />
                  <span>Post views</span>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">72.3M</p>
                  <p className="text-sm text-gray-500">+15% 7d</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users size={20} className="text-blue-500 mr-2" />
                  <span>Net followers</span>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">2.1M</p>
                  <p className="text-sm text-gray-500">+8% 7d</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ThumbsUp size={20} className="text-red-500 mr-2" />
                  <span>Likes</span>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">5.9M</p>
                  <p className="text-sm text-gray-500">+12% 7d</p>
                </div>
              </div>
            </div>
          </section>

          {/* Monetization Section */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Monetization</h2>
              <button className="text-blue-500 hover:text-blue-600 transition-colors">
                View all
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <Star size={24} className="text-yellow-400 mb-2" />
                <h3 className="text-sm font-semibold">Subscription</h3>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <Star size={24} className="text-purple-500 mb-2" />
                <h3 className="text-sm font-semibold">Creator Rewards</h3>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <Star size={24} className="text-green-500 mb-2" />
                <h3 className="text-sm font-semibold">Marketplace</h3>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <DollarSign size={24} className="text-blue-500 mb-2" />
                <h3 className="text-sm font-semibold">Video Gifts</h3>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-semibold mb-1">Estimated earnings (last 7 days)</h3>
              <p className="text-2xl font-bold">$12,345.67</p>
            </div>
          </section>

          {/* Tools Section */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">More tools</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <Star size={24} className="text-red-500 mb-2" />
                <h3 className="text-sm font-semibold">Account check</h3>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <Star size={24} className="text-indigo-500 mb-2" />
                <h3 className="text-sm font-semibold">Creator Academy</h3>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <Star size={24} className="text-orange-500 mb-2" />
                <h3 className="text-sm font-semibold">Activities</h3>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <Star size={24} className="text-teal-500 mb-2" />
                <h3 className="text-sm font-semibold">Promote</h3>
              </div>
            </div>
          </section>
        </div>

        {/* Trending Content Section */}
        <section className="mt-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Creation inspirations</h2>
            <button className="text-blue-500 hover:text-blue-600 transition-colors">
              View all
            </button>
          </div>
          <div className="flex border-b mb-4">
            <button className="px-4 py-2 font-semibold border-b-2 border-navy-blue">Trending</button>
            <button className="px-4 py-2 text-gray-500 hover:text-navy-blue transition-colors">Recommended</button>
          </div>
          <div className="flex space-x-2 mb-4">
            <div className="relative">
              <select
                value={postType}
                onChange={(e) => setPostType(e.target.value)}
                className="appearance-none bg-gray-100 rounded-full py-2 pl-4 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-navy-blue"
              >
                <option>Posts</option>
                <option>Videos</option>
                <option>Images</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={topicFilter}
                onChange={(e) => setTopicFilter(e.target.value)}
                className="appearance-none bg-gray-100 rounded-full py-2 pl-4 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-navy-blue"
              >
                <option>All topics</option>
                <option>Technology</option>
                <option>Entertainment</option>
                <option>Sports</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="appearance-none bg-gray-100 rounded-full py-2 pl-4 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-navy-blue"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-4">
            {trendingPosts.map((post, index) => (
              <div key={post.id} className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-gray-300">{index + 1}</div>
                <div className="relative flex-shrink-0 w-24 h-32">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover rounded-lg" />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 rounded-full p-1">
                    <Play size={16} className="text-white" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold mb-2">{post.title}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Play size={16} className="mr-1" />
                    <span className="mr-4">{post.views}</span>
                    <span>{post.likes}</span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-navy-blue transition-colors">
                  <Bookmark size={20} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Content History Section */}
        <section className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Content History</h2>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-navy-blue"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-4">{error}</div>
          ) : contentHistory.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No content history available</p>
          ) : (
            <div className="space-y-4">
              {contentHistory.map((content: any) => (
                <div key={content.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{content.title}</h3>
                      <p className="text-gray-600 line-clamp-2">{content.generated_content}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <Clock size={16} className="mr-1" />
                        {new Date(content.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedContent(content)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                      >
                        <Edit2 size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteContent(content.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default GYBStudio;