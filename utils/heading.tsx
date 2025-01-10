// utils/heading.ts

/**
 * Generates a URL-friendly ID from a heading text
 * Handles duplicates by adding incremental numbers
 */
export const generateHeadingId = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
};

/**
 * Creates unique heading IDs, handling duplicates
 */
export const createUniqueHeadingIds = (headings: Array<{ text: string }>) => {
  const ids = new Map<string, number>();

  return headings.map((heading) => {
    const baseId = generateHeadingId(heading.text);
    const count = ids.get(baseId) || 0;
    const id = count === 0 ? baseId : `${baseId}-${count}`;
    ids.set(baseId, count + 1);
    return id;
  });
};