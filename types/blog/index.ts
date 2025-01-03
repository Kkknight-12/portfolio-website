// types/blog/index.ts
export * from './content';
// export * from './form';
// export * from './model';
export * from './api';

import { Category } from '../category';
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

export interface ContentMetadata {
  views: number;
  likes: number;
  publishedAt?: Date;
}
