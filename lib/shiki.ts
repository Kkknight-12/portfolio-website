// lib/shiki.ts
import { getHighlighter, Highlighter } from 'shiki';

let highlighter: Highlighter;

export async function initShiki() {
  highlighter = await getHighlighter({
    themes: ['github-dark'],
    langs: ['javascript', 'typescript', 'jsx', 'tsx', 'html', 'css', 'json'],
  });
}

export async function highlightCode(code: string, language: string) {
  if (!highlighter) {
    await initShiki();
  }

  return highlighter.codeToHtml(code, {
    lang: language,
    theme: 'github-dark',
  });
}
