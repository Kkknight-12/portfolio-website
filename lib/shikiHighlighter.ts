// lib/shikiHighlighter.ts
import {
  getHighlighter,
  Highlighter,
  type BundledLanguage,
  type BundledTheme,
  bundledLanguages,
  bundledThemes,
} from 'shiki';

/**
 * ShikiService class - Singleton service for code highlighting
 */
class ShikiService {
  private static instance: ShikiService;
  private highlighter: Highlighter | null = null;
  private isInitializing = false;
  private initPromise: Promise<void> = Promise.resolve();

  private constructor() {}

  public static getInstance(): ShikiService {
    if (!ShikiService.instance) {
      ShikiService.instance = new ShikiService();
    }
    return ShikiService.instance;
  }

  /**
   * Initialize the highlighter with specified themes and languages
   */
  public async initialize(options?: {
    themes?: BundledTheme[];
    langs?: BundledLanguage[];
  }): Promise<void> {
    if (this.highlighter) return;
    if (this.isInitializing) return this.initPromise;

    this.isInitializing = true;

    this.initPromise = getHighlighter({
      themes: options?.themes || ['github-dark'],
      langs: options?.langs || [
        'javascript',
        'typescript',
        'jsx',
        'tsx',
        'python',
        'css',
        'json',
        'markdown',
        'html',
      ],
    }).then((highlighter) => {
      this.highlighter = highlighter;
      this.isInitializing = false;
    });

    return this.initPromise;
  }

  /**
   * Highlight code with specified language and theme
   */
  public async highlightCode(
    code: string,
    options?: {
      lang?: BundledLanguage;
      theme?: BundledTheme;
      lineNumbers?: boolean;
    }
  ): Promise<string> {
    if (!this.highlighter) {
      await this.initialize();
    }

    if (!this.highlighter) {
      throw new Error('Highlighter not initialized');
    }

    const theme = options?.theme || 'github-dark';
    const lang = options?.lang || 'typescript';

    try {
      return this.highlighter.codeToHtml(code, {
        lang,
        theme,
      });
    } catch (error) {
      console.error('Error highlighting code:', error);
      // Fallback to plain text if language not supported
      return this.highlighter.codeToHtml(code, {
        lang: 'text',
        theme,
      });
    }
  }

  /**
   * Get list of supported languages
   */
  public getSupportedLanguages(): string[] {
    return Object.keys(bundledLanguages);
  }

  /**
   * Get list of supported themes
   */
  public getSupportedThemes(): string[] {
    return Object.keys(bundledThemes);
  }
}

export const shikiService = ShikiService.getInstance();
