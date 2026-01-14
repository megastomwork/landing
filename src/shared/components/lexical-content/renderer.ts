import type { ReactNode } from 'react';
import type { LexicalNode, LexicalContent } from './types';
import { getRendererForNode } from './config';

/**
 * Recursively render children nodes
 */
function renderChildren(children?: LexicalNode[]): ReactNode[] {
  if (!children || children.length === 0) {
    return [];
  }

  return children.map((child, index) => renderNode(child, index));
}

/**
 * Render a single Lexical node
 */
export function renderNode(node: LexicalNode, index: number): ReactNode {
  if (!node) {
    return null;
  }

  // Determine node type
  const nodeType = node.type || (node.text !== undefined ? 'text' : undefined);

  // Get appropriate renderer
  const renderer = getRendererForNode(nodeType);

  // Render the node
  return renderer(node, index, renderChildren);
}

/**
 * Main render function for Lexical content
 *
 * Handles different content formats:
 * - String (legacy HTML)
 * - Single node
 * - Array of nodes
 * - Object with root node
 */
export function renderLexicalContent(
  content: LexicalContent,
): ReactNode | { __html: string } {
  // Handle empty content
  if (!content) {
    return null;
  }

  // Handle legacy HTML string
  if (typeof content === 'string') {
    return { __html: content };
  }

  // Handle array of nodes
  if (Array.isArray(content)) {
    return content.map((node, index) => renderNode(node, index));
  }

  // Handle object with root node
  if ('root' in content && content.root) {
    return renderNode(content.root, 0);
  }

  // Handle single node
  return renderNode(content as LexicalNode, 0);
}
