'use client';

import React from 'react';
import type { LexicalContent as LexicalContentType } from './types';
import { renderLexicalContent } from './renderer';

type LexicalContentProps = {
  content: LexicalContentType;
  className?: string;
};

/**
 * Component for rendering Lexical content from Payload CMS
 *
 * This component uses a flexible, configuration-based architecture:
 * - Node renderers are defined in `node-renderers.tsx`
 * - Style helpers are in `style-helpers.ts`
 * - Main render logic is in `renderer.ts`
 *
 * To add a new node type:
 * 1. Add the node type to `node-renderers.tsx`
 * 2. Implement a NodeRenderer function
 * 3. Add it to the `nodeRenderersConfig` object
 *
 * @example
 * ```tsx
 * <LexicalContent
 *   content={article.content}
 *   className="prose prose-lg"
 * />
 * ```
 */
export function LexicalContent({ content, className }: LexicalContentProps) {
  if (!content) {
    return null;
  }

  try {
    const rendered = renderLexicalContent(content);

    // Handle legacy HTML string
    if (rendered && typeof rendered === 'object' && '__html' in rendered) {
      return (
        <div
          className={className}
          dangerouslySetInnerHTML={rendered as { __html: string }}
        />
      );
    }

    // Handle rendered nodes
    return <div className={className}>{rendered}</div>;
  } catch (error) {
    console.error('Error rendering Lexical content:', error);
    return <div className={className}>Error rendering content</div>;
  }
}
