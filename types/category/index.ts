// types/category/index.ts

export * from './api';

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
