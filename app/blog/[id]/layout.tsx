// app/blog/[id]/layout.tsx
import { Metadata } from 'next';
import { blogService } from '@/services';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // Get the blog post data
  const blog = await blogService.getBlog(params.id);


  return {
    title: blog.data.title,
    description: `Blog post by ${blog.data.author}`,
    openGraph: {
      title: blog.data.title,
      type: 'article',
      authors: [blog.data.author],
    },
  };
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
