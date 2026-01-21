import type { ReactNode } from 'react';

/**
 * Lexical node type from Payload CMS
 */
export type LexicalNode = {
  type?: string;
  children?: LexicalNode[];
  text?: string;
  format?: number | string; // number for text formatting, string for alignment
  tag?: string;
  url?: string;
  newTab?: boolean;
  root?: LexicalNode;
  direction?: string | null;
  indent?: number;
  version?: number;
  [key: string]: unknown;
};

/**
 * Content from Payload CMS
 */
export type LexicalContent =
  | LexicalNode
  | LexicalNode[]
  | string
  | { root: LexicalNode; [key: string]: unknown };

/**
 * Node renderer function type
 */
export type NodeRenderer = (
  node: LexicalNode,
  index: number,
  renderChildren: (children?: LexicalNode[]) => ReactNode[],
) => ReactNode;

/**
 * Configuration for node renderers
 */
export type NodeRenderersConfig = {
  [nodeType: string]: NodeRenderer;
};

/**
 * Text format flags (bitmask)
 */
export enum TextFormat {
  Bold = 1,
  Italic = 2,
  Strikethrough = 4,
  Underline = 8,
  Code = 16,
  Subscript = 32,
  Superscript = 64,
}

/**
 * Emoji list item (created by preprocessor)
 */
export type EmojiListItem = {
  emoji: string;
  children: LexicalNode[];
};
