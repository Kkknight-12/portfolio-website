// types/blog/index.ts
// export * from './content';
// export * from './form';
// export * from './model';
export * from './api';

import { BlogStatus, ContentBlock } from './content';

// export * from './api';
export interface BlogPost {
  _id: string;
  id: string;
  title: string;
  author: string;
  date: string;
  content: ContentBlock[];
  categories: Category[];
  primaryCategory: Category;
  status: BlogStatus;
  tags: string[];
  metadata: ContentMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  id: string;
  name: string;
  description?: string;
  slug: string;
  parentCategory?: string;
  isActive: boolean;
  metadata?: {
    seoTitle?: string;
    seoDescription?: string;
    keywords?: string[];
  };
  postsCount?: number;
  order: number;
}

export interface ContentMetadata {
  views: number;
  likes: number;
  publishedAt?: Date;
}
