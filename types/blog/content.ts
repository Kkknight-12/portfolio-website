// Core content block

export interface ContentBlock {
  id?: string; // Optional ID field for existing blocks
  type: ContentBlockType;
  data:
    | ParagraphBlockData
    | CodeBlockData
    | ImageBlockData
    | ListBlockData
    | CalloutBlockData
    | BlockquoteBlockData
    | HorizontalLineBlockData
    | LinkBlockData
    | TableBlockData;
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
  | 'callout'
  | 'blockquote'
  | 'horizontalLine'
  | 'link'
  | 'table';

// -----------------------------------------------------------------------------
// Annotation
export interface Annotation {
  type: AnnotationType;
  color: ColorType;
  show: boolean;
  brackets: DirectionType[];
  regex: string;
  // Position-based fields for accurate highlighting
  text?: string; // The actual text that is annotated
  startOffset?: number; // Starting position in the paragraph/list item
  endOffset?: number; // Ending position in the paragraph/list item
  occurrenceNumber?: number; // Which occurrence of the text (for duplicates)
  itemIndex?: number; // For list annotations: which item (0-based) this annotation belongs to
}

export type DirectionType = 'top' | 'left' | 'right' | 'bottom';
export type AnnotationType = 'underline' | 'circle' | 'highlight' | 'brackets' | 'bold' | 'code';
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

export interface NestedListItem {
  text: string;
  children: string[]; // Grandchildren (deepest level - strings only)
}

export interface ListItem {
  text: string;
  annotations: Annotation[];
  children?: NestedListItem[] | string[]; // Two-level nesting: supports both old (string[]) and new (object[]) formats
  _id?: string;
}

export interface ListBlockData {
  items: ListItem[];
  annotations: Annotation[];
  text: string;
  style: 'unordered' | 'ordered';
}

export interface BlockquoteBlockData {
  text: string;
  citation?: string;
}

export interface HorizontalLineBlockData {
  style?: 'solid' | 'dashed' | 'dotted';
}

export interface LinkBlockData {
  url: string;
  name: string;
  openInNewTab?: boolean;
}

export interface TableCellContent {
  text: string;
  annotations: Annotation[];
}

export interface TableCell {
  type: 'header' | 'cell';
  colspan: number;
  rowspan: number;
  colwidth: number | null;
  background: string | null;
  content: TableCellContent;
}

export interface TableRow {
  isHeader: boolean;
  cells: TableCell[];
}

export interface TableMetadata {
  totalRows: number;
  totalColumns: number;
  hasHeaderRow: boolean;
}

export interface TableBlockData {
  rows: TableRow[];
  metadata: TableMetadata;
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

export interface BlockquoteBlock extends BaseBlock {
  data: BlockquoteBlockData;
}

export interface HorizontalLineBlock extends BaseBlock {
  data: HorizontalLineBlockData;
}

export interface LinkBlock extends BaseBlock {
  data: LinkBlockData;
}

export interface TableBlock extends BaseBlock {
  data: TableBlockData;
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

export const isBlockquoteBlock = (
  block: ContentBlock
): block is ContentBlock & { data: BlockquoteBlockData } => {
  return block.type === 'blockquote';
};

export const isHorizontalLineBlock = (
  block: ContentBlock
): block is ContentBlock & { data: HorizontalLineBlockData } => {
  return block.type === 'horizontalLine';
};

export const isLinkBlock = (
  block: ContentBlock
): block is ContentBlock & { data: LinkBlockData } => {
  return block.type === 'link';
};

export const isTableBlock = (
  block: ContentBlock
): block is ContentBlock & { data: TableBlockData } => {
  return block.type === 'table';
};
