export type ContentType = 'video' | 'photo' | 'audio' | 'written';
export type ContentStatus = 'draft' | 'pending' | 'approved' | 'rejected';
export type GenerationType = 'headline' | 'thumbnail' | 'photo' | 'video' | 'audio';

export interface Platform {
  id: string;
  name: string;
  icon: string;
}

export interface GeneratedAsset {
  id: string;
  type: GenerationType;
  url: string;
  status: ContentStatus;
  createdAt: string;
}

export interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  originalUrl?: string;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
  status: ContentStatus;
  platforms: string[];
  generatedAssets: GeneratedAsset[];
}

export interface ContentFilter {
  type?: ContentType[];
  status?: ContentStatus[];
  platform?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface AssetGenerationRequest {
  contentId: string;
  type: GenerationType;
  prompt?: string;
  settings?: Record<string, any>;
}

export interface AssetGenerationResponse {
  id: string;
  url: string;
  type: GenerationType;
  status: ContentStatus;
}