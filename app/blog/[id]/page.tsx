import { Metadata } from 'next';
import { blogService } from '@/services';
import { BlogPost } from '@/types';
import BlogDetailClient from './BlogDetailClient';
import {
  calculateWordCount,
  calculateReadingTime,
  extractDescription,
  extractFirstImage,
  generateBlogPostingSchema,
  generateBreadcrumbSchema,
  combineSchemas,
  safeJsonLdScript,
} from '@/utils/seo/json-ld';

interface BlogDetailProps {
  params: {
    id: string;
  };
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({
  params,
}: BlogDetailProps): Promise<Metadata> {
  try {
    // Fetch blog data
    const response = await blogService.getBlog(params.id);
    const blog = response.data as BlogPost;

    // Calculate SEO metrics
    const wordCount = calculateWordCount(blog.content || []);
    const readingTime = calculateReadingTime(wordCount);
    const description =
      extractDescription(blog.content || []) || 'Read this blog post';
    const firstImage =
      extractFirstImage(blog.content || []) ||
      'https://mayank-portfolio-seven.vercel.app/og-image.png';

    // Get author name and primary category
    const authorName = blog.author || 'Anonymous';
    const primaryCategoryName =
      blog.primaryCategory?.name || blog.categories?.[0]?.name || 'Blog';

    // Generate keywords
    const allKeywords = [
      ...(blog.tags || []),
      primaryCategoryName,
      ...(blog.categories?.map((c) => c.name) || []),
    ];

    const blogUrl = `https://mayank-portfolio-seven.vercel.app/blog/${blog.id}`;

    return {
      title: `${blog.title} | Mayank Portfolio`,
      description,
      authors: [{ name: authorName }],
      keywords: allKeywords.join(', '),
      openGraph: {
        title: blog.title,
        description,
        type: 'article',
        url: blogUrl,
        siteName: 'Mayank Portfolio',
        publishedTime: blog.createdAt || blog.date,
        modifiedTime: blog.updatedAt || blog.date,
        authors: [authorName],
        tags: allKeywords,
        locale: 'en_US',
        images: [
          {
            url: firstImage,
            width: 1200,
            height: 630,
            alt: blog.title,
          },
        ],
        section: primaryCategoryName,
      },
      twitter: {
        card: 'summary_large_image',
        title: blog.title,
        description,
        images: [firstImage],
      },
      alternates: {
        canonical: blogUrl,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      other: {
        'article:author': authorName,
        'article:section': primaryCategoryName,
        'article:published_time': blog.createdAt || blog.date,
        'article:modified_time': blog.updatedAt || blog.date,
        'article:tag': allKeywords.join(', '),
        'twitter:label1': 'Reading time',
        'twitter:data1': `${readingTime} min read`,
        'twitter:label2': 'Category',
        'twitter:data2': primaryCategoryName,
      },
    };
  } catch (error) {
    // Fallback metadata if blog fetch fails
    return {
      title: 'Blog Post | Mayank Portfolio',
      description: 'Read this blog post on Mayank Portfolio',
    };
  }
}

/**
 * Server component - handles data fetching and SEO
 */
export default async function BlogDetail({ params }: BlogDetailProps) {
  try {
    // Fetch blog data server-side
    const response = await blogService.getBlog(params.id);
    const blog = response.data as BlogPost;

    // Calculate metrics for JSON-LD
    const wordCount = calculateWordCount(blog.content || []);
    const readingTime = calculateReadingTime(wordCount);
    const description =
      extractDescription(blog.content || []) || 'Read this blog post';
    const firstImage =
      extractFirstImage(blog.content || []) ||
      'https://mayank-portfolio-seven.vercel.app/og-image.png';

    const blogUrl = `https://mayank-portfolio-seven.vercel.app/blog/${blog.id}`;
    const authorName = blog.author || 'Anonymous';
    const primaryCategoryName =
      blog.primaryCategory?.name || blog.categories?.[0]?.name || 'Blog';

    // Generate keywords
    const allKeywords = [
      ...(blog.tags || []),
      primaryCategoryName,
      ...(blog.categories?.map((c) => c.name) || []),
    ];

    // Generate JSON-LD schemas
    const blogPostingSchema = generateBlogPostingSchema({
      title: blog.title,
      description,
      author: {
        name: authorName,
        email: 'mayanks365@gmail.com',
      },
      datePublished: blog.createdAt || blog.date,
      dateModified: blog.updatedAt || blog.date,
      image: firstImage,
      keywords: allKeywords,
      wordCount,
      readingTime,
      url: blogUrl,
    });

    const breadcrumbSchema = generateBreadcrumbSchema([
      {
        name: 'Home',
        url: 'https://mayank-portfolio-seven.vercel.app',
      },
      {
        name: 'Blog',
        url: 'https://mayank-portfolio-seven.vercel.app/blog',
      },
      {
        name: blog.title,
        url: blogUrl,
      },
    ]);

    const combinedSchema = combineSchemas(blogPostingSchema, breadcrumbSchema);

    return (
      <>
        {/* JSON-LD Structured Data */}
        <script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLdScript(combinedSchema),
          }}
        />

        {/* Client component for interactive features */}
        <BlogDetailClient blog={blog} readingTime={readingTime} />
      </>
    );
  } catch (error) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold mb-4'>Blog not found</h1>
          <p className='text-gray-400'>
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }
}
