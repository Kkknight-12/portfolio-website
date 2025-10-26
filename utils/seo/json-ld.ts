import { ContentBlock } from '@/types';

/**
 * Calculate total word count from blog content blocks
 */
export function calculateWordCount(content: ContentBlock[]): number {
  let wordCount = 0;

  content.forEach((block) => {
    if (block.type === 'paragraph' && 'text' in block.data) {
      const text = block.data.text as string;
      wordCount += text.split(/\s+/).filter(Boolean).length;
    } else if (block.type === 'list' && 'items' in block.data) {
      const items = block.data.items as any[];
      items.forEach((item) => {
        const itemText = typeof item === 'string' ? item : item.text || '';
        wordCount += itemText.split(/\s+/).filter(Boolean).length;

        // Handle nested items
        if (typeof item === 'object' && item.children) {
          const children = item.children as any[];
          children.forEach((child: any) => {
            const childText = typeof child === 'string' ? child : child.text || '';
            wordCount += childText.split(/\s+/).filter(Boolean).length;

            // Handle grandchildren
            if (typeof child === 'object' && child.children) {
              const grandchildren = child.children as string[];
              grandchildren.forEach((grandchild) => {
                wordCount += grandchild.split(/\s+/).filter(Boolean).length;
              });
            }
          });
        }
      });
    } else if (block.type === 'callout' && 'text' in block.data) {
      const text = block.data.text as string;
      wordCount += text.split(/\s+/).filter(Boolean).length;
    } else if (block.type === 'code' && 'code' in block.data) {
      const code = (block.data as any).code as string;
      if (code) {
        wordCount += code.split(/\s+/).filter(Boolean).length;
      }
    }
  });

  return wordCount;
}

/**
 * Calculate reading time based on word count (200 words per minute)
 */
export function calculateReadingTime(wordCount: number): number {
  return Math.ceil(wordCount / 200);
}

/**
 * Extract first image from content blocks
 */
export function extractFirstImage(content: ContentBlock[]): string | null {
  for (const block of content) {
    if (block.type === 'image' && 'src' in block.data && block.data.src) {
      return block.data.src as string;
    }
  }
  return null;
}

/**
 * Extract first N words from content for description
 */
export function extractDescription(content: ContentBlock[], wordLimit: number = 30): string {
  let words: string[] = [];

  for (const block of content) {
    if (block.type === 'paragraph' && 'text' in block.data) {
      const text = block.data.text as string;
      words.push(...text.split(/\s+/).filter(Boolean));
    }

    if (words.length >= wordLimit) break;
  }

  return words.slice(0, wordLimit).join(' ') + '...';
}

/**
 * Sanitize text for JSON-LD (remove HTML, newlines, etc.)
 */
function sanitizeForJsonLd(str: string): string {
  return str
    .replace(/<[^>]*>/g, '')  // Remove HTML tags
    .replace(/\n/g, ' ')
    .replace(/\r/g, ' ')
    .replace(/\t/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Make JSON-LD safe for script injection (escape < characters)
 */
export function safeJsonLdScript(data: any): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/**
 * Generate BlogPosting schema for JSON-LD
 */
export interface BlogPostingSchemaParams {
  title: string;
  description: string;
  author: {
    name: string;
    email: string;
  };
  datePublished: string;
  dateModified?: string;
  image: string;
  keywords: string[];
  wordCount: number;
  readingTime: number;
  url: string;
}

export function generateBlogPostingSchema(params: BlogPostingSchemaParams) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: sanitizeForJsonLd(params.title),
    description: sanitizeForJsonLd(params.description),
    author: {
      '@type': 'Person',
      name: sanitizeForJsonLd(params.author.name),
      email: params.author.email,
    },
    datePublished: params.datePublished,
    dateModified: params.dateModified || params.datePublished,
    image: params.image,
    keywords: params.keywords.join(', '),
    wordCount: params.wordCount,
    url: params.url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': params.url,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mayank Portfolio',
      logo: {
        '@type': 'ImageObject',
        url: 'https://mayank-portfolio-seven.vercel.app/logo.png',
      },
    },
    articleBody: `${params.wordCount} words`,
    timeRequired: `PT${params.readingTime}M`,
  };

  return schema;
}

/**
 * Generate BreadcrumbList schema for JSON-LD
 */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: sanitizeForJsonLd(item.name),
      item: item.url,
    })),
  };

  return schema;
}

/**
 * Combine multiple schemas into a single JSON-LD @graph
 */
export function combineSchemas(...schemas: any[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': schemas.map((schema) => {
      const { '@context': _, ...schemaWithoutContext } = schema;
      return schemaWithoutContext;
    }),
  };
}
