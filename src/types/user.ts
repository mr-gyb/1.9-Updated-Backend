export interface UserProfile {
  id: string;
  name: string;
  username: string;
  bio: string;
  location: string;
  website: string;
  email: string;
  experience: 'beginner' | 'intermediate' | 'proficient' | 'advanced' | 'expert';
  experienceLevel: number;
  industry: string;
  rating: number;
  following: number;
  followers: number;
  profile_image_url: string;
  cover_image_url: string;
  created_at: string;
  updated_at: string;
  isAI?: boolean;
  isPlaceholder?: boolean;
  lat?: number;
  lng?: number;
  content?: {
    posts: Array<{
      id: number;
      title: string;
      date: string;
      likes: number;
      comments: number;
    }>;
    media: Array<{
      id: number;
      type: 'video' | 'image';
      title: string;
      thumbnail?: string;
      url?: string;
    }>;
    highlights: Array<{
      id: string;
      title: string;
      description: string;
      image: string;
      date: string;
      category: 'achievement' | 'milestone' | 'award' | 'education';
    }>;
  };
}

export const getAIUser = (userId: string): UserProfile | null => {
  return AI_USERS[userId] || null;
};

export const getPlaceholderUser = (userId: string): UserProfile | null => {
  return PLACEHOLDER_USERS[userId] || null;
};

export const AI_USERS: Record<string, UserProfile> = {
  'mr-gyb-ai': {
    id: 'mr-gyb-ai',
    name: 'Mr.GYB AI',
    username: '@mr_gyb_ai',
    bio: 'Your all-in-one business growth assistant. Expert in digital marketing, content creation, and business strategy.',
    location: 'Global',
    website: 'https://ai.mrgyb.com',
    email: 'ai@mrgyb.com',
    experience: 'expert',
    experienceLevel: 5,
    industry: 'ai',
    rating: 5.0,
    following: 1000000,
    followers: 5000000,
    profile_image_url: 'https://drive.google.com/uc?export=view&id=1H1PYdJ4qNz8a2R6WaxaYw22awKagmEy9',
    cover_image_url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
    isAI: true,
    content: {
      posts: [
        { id: 1, title: 'The Future of AI in Business', date: '2024-01-15', likes: 1500, comments: 300 },
        { id: 2, title: 'Digital Marketing Trends 2024', date: '2024-01-14', likes: 2000, comments: 450 }
      ],
      media: [
        { id: 1, type: 'video', title: 'AI Business Strategy Guide', thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
      ],
      highlights: [
        {
          id: '1',
          title: 'AI Innovation Award',
          description: 'Recognized for breakthrough achievements in AI business solutions',
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          date: '2024-01-10',
          category: 'award'
        }
      ]
    }
  },
  'ceo-ai': {
    id: 'ceo-ai',
    name: 'CEO AI',
    username: '@ceo_ai',
    bio: 'Strategic planning and business development expert. Specializing in leadership, decision-making, and corporate governance.',
    location: 'Global',
    website: 'https://ai.mrgyb.com/ceo',
    email: 'ceo@mrgyb.com',
    experience: 'expert',
    experienceLevel: 5,
    industry: 'leadership',
    rating: 4.9,
    following: 800000,
    followers: 3000000,
    profile_image_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
    cover_image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
    isAI: true,
    content: {
      posts: [
        { id: 1, title: 'Strategic Leadership in 2024', date: '2024-01-15', likes: 1200, comments: 280 }
      ],
      media: [
        { id: 1, type: 'video', title: 'Leadership Masterclass', thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
      ],
      highlights: [
        {
          id: '1',
          title: 'Leadership Summit',
          description: 'Keynote speaker at Global Leadership Summit',
          image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          date: '2024-01-05',
          category: 'achievement'
        }
      ]
    }
  },
  'coo-ai': {
    id: 'coo-ai',
    name: 'COO AI',
    username: '@coo_ai',
    bio: 'Operations management and process optimization specialist. Expert in supply chain and resource allocation.',
    location: 'Global',
    website: 'https://ai.mrgyb.com/coo',
    email: 'coo@mrgyb.com',
    experience: 'expert',
    experienceLevel: 5,
    industry: 'operations',
    rating: 4.8,
    following: 600000,
    followers: 2500000,
    profile_image_url: 'https://images.unsplash.com/photo-1573497491765-dccce02b29df?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
    cover_image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
    isAI: true,
    content: {
      posts: [
        { id: 1, title: 'Optimizing Business Operations', date: '2024-01-15', likes: 980, comments: 245 }
      ],
      media: [
        { id: 1, type: 'video', title: 'Process Optimization Guide', thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
      ],
      highlights: [
        {
          id: '1',
          title: 'Operations Excellence Award',
          description: 'Recognized for outstanding achievements in operations management',
          image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          date: '2024-01-03',
          category: 'award'
        }
      ]
    }
  },
  'cto-ai': {
    id: 'cto-ai',
    name: 'CTO AI',
    username: '@cto_ai',
    bio: 'Technology strategy and innovation expert. Specializing in system architecture and digital transformation.',
    location: 'Global',
    website: 'https://ai.mrgyb.com/cto',
    email: 'cto@mrgyb.com',
    experience: 'expert',
    experienceLevel: 5,
    industry: 'technology',
    rating: 4.9,
    following: 700000,
    followers: 2800000,
    profile_image_url: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
    cover_image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
    isAI: true,
    content: {
      posts: [
        { id: 1, title: 'Future of Technology', date: '2024-01-15', likes: 1100, comments: 320 }
      ],
      media: [
        { id: 1, type: 'video', title: 'Tech Innovation Guide', thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
      ],
      highlights: [
        {
          id: '1',
          title: 'Innovation Award',
          description: 'Recognized for technological innovation leadership',
          image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          date: '2024-01-02',
          category: 'award'
        }
      ]
    }
  },
  'cmo-ai': {
    id: 'cmo-ai',
    name: 'CMO AI',
    username: '@cmo_ai',
    bio: 'Marketing strategy and brand development expert. Specializing in digital marketing and customer experience.',
    location: 'Global',
    website: 'https://ai.mrgyb.com/cmo',
    email: 'cmo@mrgyb.com',
    experience: 'expert',
    experienceLevel: 5,
    industry: 'marketing',
    rating: 4.8,
    following: 650000,
    followers: 2600000,
    profile_image_url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
    cover_image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
    isAI: true,
    content: {
      posts: [
        { id: 1, title: 'Marketing Trends 2024', date: '2024-01-15', likes: 950, comments: 280 }
      ],
      media: [
        { id: 1, type: 'video', title: 'Marketing Strategy Guide', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
      ],
      highlights: [
        {
          id: '1',
          title: 'Marketing Excellence',
          description: 'Award for innovative marketing strategies',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          date: '2024-01-04',
          category: 'award'
        }
      ]
    }
  }
};

export const PLACEHOLDER_USERS: Record<string, UserProfile> = {
  'user-1': {
    id: 'user-1',
    name: 'Alice Johnson',
    username: '@alice_j',
    bio: 'Professional videographer with a passion for storytelling through visual media.',
    location: 'San Francisco, CA',
    website: 'https://alicejohnson.com',
    email: 'alice@example.com',
    experience: 'expert',
    experienceLevel: 4,
    industry: 'videographer',
    rating: 4.8,
    following: 250,
    followers: 1000,
    profile_image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
    cover_image_url: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    created_at: '2023-06-01T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
    isPlaceholder: true,
    content: {
      posts: [
        { id: 1, title: 'Behind the Scenes', date: '2024-01-15', likes: 450, comments: 32 }
      ],
      media: [
        { id: 1, type: 'video', title: 'Event Highlights', thumbnail: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
      ],
      highlights: [
        {
          id: '1',
          title: 'Film Festival Award',
          description: 'Best Documentary Short Film',
          image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          date: '2023-12-01',
          category: 'award'
        }
      ]
    }
  },
  'user-2': {
    id: 'user-2',
    name: 'David Chen',
    username: '@david_codes',
    bio: 'Full-stack developer specializing in web applications and cloud architecture.',
    location: 'Seattle, WA',
    website: 'https://davidchen.dev',
    email: 'david@example.com',
    experience: 'advanced',
    experienceLevel: 4,
    industry: 'coder',
    rating: 4.7,
    following: 180,
    followers: 850,
    profile_image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
    cover_image_url: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    created_at: '2023-07-01T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
    isPlaceholder: true,
    content: {
      posts: [
        { id: 1, title: 'Modern Web Development', date: '2024-01-15', likes: 380, comments: 45 }
      ],
      media: [
        { id: 1, type: 'video', title: 'Coding Tutorial', thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
      ],
      highlights: [
        {
          id: '1',
          title: 'Tech Conference Speaker',
          description: 'Featured speaker at DevCon 2023',
          image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          date: '2023-11-15',
          category: 'achievement'
        }
      ]
    }
  },
  'user-3': {
    id: 'user-3',
    name: 'Sarah Williams',
    username: '@sarah_writes',
    bio: 'Content strategist and copywriter helping brands tell their stories.',
    location: 'New York, NY',
    website: 'https://sarahwrites.com',
    email: 'sarah@example.com',
    experience: 'intermediate',
    experienceLevel: 3,
    industry: 'writer',
    rating: 4.5,
    following: 120,
    followers: 600,
    profile_image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
    cover_image_url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    created_at: '2023-08-01T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
    isPlaceholder: true,
    content: {
      posts: [
        { id: 1, title: 'Content Strategy Guide', date: '2024-01-15', likes: 290, comments: 38 }
      ],
      media: [
        { id: 1, type: 'image', title: 'Writing Workshop', url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
      ],
      highlights: [
        {
          id: '1',
          title: 'Published Author',
          description: 'Released first book on content strategy',
          image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          date: '2023-10-20',
          category: 'milestone'
        }
      ]
    }
  }
};