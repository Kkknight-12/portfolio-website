// Core content block

export interface ContentBlock {
  type: ContentBlockType;
  data:
    | ParagraphBlockData
    | CodeBlockData
    | ImageBlockData
    | ListBlockData
    | CalloutBlockData;
  order: number;
}

export interface BaseBlock {
  type: ContentBlockType;
  order: number;
}

export enum BlogStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export type ContentBlockType =
  | 'paragraph'
  | 'code'
  | 'image'
  | 'list'
  | 'callout';

// -----------------------------------------------------------------------------
// Annotation
export interface Annotation {
  type: AnnotationType;
  color: ColorType;
  show: boolean;
  brackets: DirectionType[];
  regex: string;
}

export type DirectionType = 'top' | 'left' | 'right' | 'bottom';
export type AnnotationType = 'underline' | 'circle' | 'highlight' | 'brackets';
export type ColorType = 'red' | 'black' | 'green' | 'yellow' | 'blue';

// -----------------------------------------------------------------------------

// Block Data Types

export interface ParagraphBlockData {
  htmlTag: HtmlTagType;
  brackets: DirectionType[];
  annotations: Annotation[];
  text: string;
  id: string;
}

export interface ImageBlockData {
  src: string;
  alt: string;
}

export interface CalloutBlockData {
  heading?: string;
  style: Styles;
  text: string;
}

export interface ListBlockData {
  items: string[];
  annotations: Annotation[];
  text: string;
  style: 'unordered' | 'ordered';
}

// -----------------------------------------------------------------------------

// HTML / Styling;
export enum HtmlTagType {
  P = 'p',
  DIV = 'div',
  SPAN = 'span',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
}
export type Styles =
  | 'error'
  | 'warning'
  | 'white'
  | 'gray'
  | 'success'
  | 'info';

export enum SandboxTemplate {
  VANILLA = 'vanilla',
  REACT = 'react',
  REACT_TS = 'react-ts',
  VUE = 'vue',
  ANGULAR = 'angular',
}

export enum ProgrammingLanguageEnum {
  JAVASCRIPT = 'javascript',
  PYTHON = 'python',
  HTML = 'html',
  CSS = 'css',
  TYPESCRIPT = 'typescript',
}

// -----------------------------------------------------------------------------

export type ProgrammingLanguage =
  | 'javascript'
  | 'python'
  | 'html'
  | 'css'
  | 'typescript';

// -----------------------------------------------------------------------------

// Add sandbox configuration interface
export interface CodeSandboxConfig {
  template: SandboxTemplate;
  dependencies?: Record<string, string>;
  settings?: {
    theme?: 'light' | 'dark';
    view?: 'preview' | 'editor' | 'split';
    hideNavigation?: boolean;
    hideDevTools?: boolean;
  };
}

// Add code block metadata interface
export interface CodeBlockMetadata {
  isInteractive: boolean;
  hasPreview: boolean;
  dependencies?: string[];
  description?: string;
  lastUpdated?: Date;
}

export interface SimpleCodeData {
  code: string;
  language: ProgrammingLanguage;
  displayType: 'simple';
}

export interface SandboxCodeData {
  displayType: 'sandbox';
  sandbox: {
    url: string;
    config: CodeSandboxConfig;
  };
  metadata?: CodeBlockMetadata;
  title?: string;
  description?: string;
}
// -----------------------------------------------------------------------------

export type CodeBlockData = SimpleCodeData | SandboxCodeData;

// -----------------------------------------------------------------------------

// Content Block

// Block Implementation Types
export interface ParagraphBlock extends BaseBlock {
  data: ParagraphBlockData;
}

export interface CodeBlock extends BaseBlock {
  data: CodeBlockData;
}

export interface ImageBlock extends BaseBlock {
  data: ImageBlockData;
}
export interface ListBlock extends BaseBlock {
  data: ListBlockData;
}

export interface CalloutBlock extends BaseBlock {
  data: CalloutBlockData;
}

// -----------------------------------------------------------------------------
// Type Guards
export const isParagraphBlock = (
  block: ContentBlock
): block is ContentBlock & { data: ParagraphBlockData } => {
  return block.type === 'paragraph';
};

export const isCodeBlock = (
  block: ContentBlock
): block is ContentBlock & { data: CodeBlockData } => {
  return block.type === 'code';
};

export const isImageBlock = (
  block: ContentBlock
): block is ContentBlock & { data: ImageBlockData } => {
  return block.type === 'image';
};

export const isListBlock = (
  block: ContentBlock
): block is ContentBlock & { data: ListBlockData } => {
  return block.type === 'list';
};

export const isCalloutBlock = (
  block: ContentBlock
): block is ContentBlock & { data: CalloutBlockData } => {
  return block.type === 'callout';
};

export function isParagraphData(
  content: ContentBlock
): content is { type: 'paragraph'; data: ParagraphBlockData; order: number } {
  return content.type === 'paragraph';
}

export function isCodeData(
  content: ContentBlock
): content is { type: 'code'; data: CodeBlockData; order: number } {
  return content.type === 'code';
}

export function isImageData(
  content: ContentBlock
): content is { type: 'image'; data: ImageBlockData; order: number } {
  return content.type === 'image';
}

export function isListData(
  content: ContentBlock
): content is { type: 'list'; data: ListBlockData; order: number } {
  return content.type === 'list';
}

export function isCalloutData(
  content: ContentBlock
): content is { type: 'callout'; data: CalloutBlockData; order: number } {
  return content.type === 'callout';
}
