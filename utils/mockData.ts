// Mock data utilities for local development
import { BlogPost, ContentBlock, HtmlTagType, BlogStatus } from '@/types';

// Check if we're in development mode
export const isDevelopment = process.env.NODE_ENV === 'development';
export const useMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true' || !process.env.NEXT_PUBLIC_API_URL;

// Mock blog content blocks
const mockContentBlocks: ContentBlock[] = [
  {
    type: 'paragraph',
    data: {
      htmlTag: HtmlTagType.H2,
      text: 'Introduction to Modern Web Development',
      annotations: [],
      brackets: [],
      id: 'para-1',
    },
    order: 1,
  },
  {
    type: 'paragraph',
    data: {
      htmlTag: HtmlTagType.P,
      text: 'Welcome to this comprehensive guide on modern web development. In this blog post, we will explore the latest trends and technologies that are shaping the future of web development.',
      annotations: [],
      brackets: [],
      id: 'para-2',
    },
    order: 2,
  },
  {
    type: 'callout',
    data: {
      heading: 'Important Note',
      text: 'This is a mock blog post used for local development. The actual content will be loaded from the API in production.',
      style: 'info' as const,
    },
    order: 3,
  },
  {
    type: 'paragraph',
    data: {
      htmlTag: HtmlTagType.H3,
      text: 'Key Technologies',
      annotations: [],
      brackets: [],
      id: 'para-3',
    },
    order: 4,
  },
  {
    type: 'list',
    data: {
      items: [
        'React and Next.js for frontend development',
        'TypeScript for type safety',
        'Tailwind CSS for styling',
        'Node.js for backend services',
      ],
      annotations: [],
      text: '',
      style: 'unordered' as const,
    },
    order: 5,
  },
  {
    type: 'code',
    data: {
      code: `// Example React component
const HelloWorld = () => {
  return (
    <div className="text-center">
      <h1>Hello, World!</h1>
    </div>
  );
};

export default HelloWorld;`,
      language: 'javascript' as const,
      displayType: 'simple' as const,
    },
    order: 6,
  },
  {
    type: 'paragraph',
    data: {
      htmlTag: HtmlTagType.P,
      text: 'This example demonstrates a simple React functional component using modern syntax and Tailwind CSS for styling.',
      annotations: [],
      brackets: [],
      id: 'para-4',
    },
    order: 7,
  },
];

// Mock blog posts data
export const mockBlogPosts: BlogPost[] = [
  {
    _id: '67625080b9f443d260e2c73f',
    id: '67625080b9f443d260e2c73f',
    title: 'Getting Started with Next.js 14',
    author: 'Mayank Sarasiya',
    date: '2024-12-18',
    content: mockContentBlocks,
    categories: [
      {
        _id: '67387c575e787a952ddf1bae',
        id: '67387c575e787a952ddf1bae',
        name: 'Programming',
        slug: 'programming',
        isActive: true,
        order: 1,
      },
    ],
    primaryCategory: {
      _id: '67387c575e787a952ddf1bae',
      id: '67387c575e787a952ddf1bae',
      name: 'Programming',
      slug: 'programming',
      isActive: true,
      order: 1,
    },
    status: BlogStatus.PUBLISHED,
    tags: ['nextjs', 'react', 'typescript'],
    metadata: {
      views: 127,
      likes: 23,
    },
    createdAt: '2024-12-18T04:33:04.357Z',
    updatedAt: '2024-12-21T03:33:36.810Z',
  },
  {
    _id: '676152cd0f0b59985afb38cc',
    id: '676152cd0f0b59985afb38cc',
    title: 'Understanding TypeScript Generics',
    author: 'Mayank Sarasiya',
    date: '2024-12-17',
    content: mockContentBlocks,
    categories: [
      {
        _id: '67387c575e787a952ddf1bae',
        id: '67387c575e787a952ddf1bae',
        name: 'Programming',
        slug: 'programming',
        isActive: true,
        order: 1,
      },
      {
        _id: '67387f445e787a952ddf1bb9',
        id: '67387f445e787a952ddf1bb9',
        name: 'TypeScript',
        slug: 'typescript',
        isActive: true,
        order: 2,
      },
    ],
    primaryCategory: {
      _id: '67387f445e787a952ddf1bb9',
      id: '67387f445e787a952ddf1bb9',
      name: 'TypeScript',
      slug: 'typescript',
      isActive: true,
      order: 2,
    },
    status: BlogStatus.PUBLISHED,
    tags: ['typescript', 'generics', 'advanced'],
    metadata: {
      views: 89,
      likes: 15,
    },
    createdAt: '2024-12-17T10:30:37.949Z',
    updatedAt: '2024-12-20T15:45:12.123Z',
  },
];

// Import the mock data from mock.js and add content blocks
import { blogsData } from '@/mock';

// Get mock blog by ID
export const getMockBlogById = (id: string): BlogPost | null => {
  // First check our detailed mock posts
  const detailedPost = mockBlogPosts.find(blog => blog._id === id || blog.id === id);
  if (detailedPost) return detailedPost;
  
  // Then check the imported mock data and add content blocks
  const basicPost = blogsData.data.find((blog: any) => blog._id === id);
  if (basicPost) {
    // Transform categories to match Category type
    const categories = basicPost.categories.map((cat: any, index: number) => ({
      ...cat,
      id: cat._id,
      isActive: true,
      order: index + 1,
    }));
    
    return {
      ...basicPost,
      id: basicPost._id,
      date: basicPost.createdAt,
      content: mockContentBlocks, // Add the content blocks
      categories,
      primaryCategory: categories[0] || {
        _id: 'default',
        id: 'default',
        name: 'General',
        slug: 'general',
        isActive: true,
        order: 1,
      },
      status: BlogStatus.PUBLISHED,
      tags: ['mock', 'development'],
    } as BlogPost;
  }
  
  return null;
};

// Mock analytics data
export const getMockAnalytics = (blogId: string) => {
  return {
    totalViews: Math.floor(Math.random() * 1000) + 100,
    uniqueViews: Math.floor(Math.random() * 500) + 50,
    deviceBreakdown: {
      desktop: 60,
      mobile: 35,
      tablet: 5,
    },
    trends: {
      viewsTrend: 15.5,
      uniqueViewsTrend: 12.3,
    },
  };
};