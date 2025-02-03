// app/blog/[id]/layout.tsx
import { Metadata } from 'next';
import { blogService } from '@/services';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    // Get the blog post data
    const response = await blogService.getBlog(params.id);
    const blog = response.data;

    // Get the first paragraph of content for description if no explicit description exists
    const description =
      //@ts-ignore
      blog.content.find((block) => block.type === 'paragraph')?.data.text ||
      `Blog post by ${blog.author}`;

    // Base URL for your site
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://your-site.com';

    return {
      title: blog.title,
      description: description.slice(0, 200) + '...', // Truncate description

      // Open Graph / Facebook
      openGraph: {
        type: 'article',
        title: blog.title,
        description: description.slice(0, 200) + '...',
        url: `${baseUrl}/blog/${params.id}`,
        siteName: 'Your Blog Name',
        locale: 'en_US',
        authors: [blog.author],
        publishedTime: blog.createdAt,
        modifiedTime: blog.updatedAt,
        // images: [], // Add blog images if available
      },

      // Twitter
      twitter: {
        card: 'summary_large_image',
        title: blog.title,
        description: description.slice(0, 200) + '...',
        // images: [], // Add blog images if available
      },

      // Optional: Add structured data for Google
      other: {
        'article:published_time': blog.createdAt,
        'article:modified_time': blog.updatedAt,
        'article:author': blog.author,
      },
    };
  } catch (error) {
    // Fallback metadata if fetch fails
    return {
      title: 'Blog Post',
      description: 'Loading blog post...',
    };
  }
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
