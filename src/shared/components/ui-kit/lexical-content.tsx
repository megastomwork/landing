'use client';

import React from 'react';

type LexicalNode = {
  type?: string;
  children?: LexicalNode[];
  text?: string;
  format?: number | string; // Can be number (text formatting) or string (alignment)
  tag?: string;
  url?: string;
  newTab?: boolean;
  root?: LexicalNode;
  direction?: string | null;
  indent?: number;
  [k: string]: unknown;
};

type LexicalContentProps = {
  content:
    | LexicalNode
    | LexicalNode[]
    | string
    | { root: LexicalNode; [k: string]: unknown };
  className?: string;
};

/**
 * Helper function to get text alignment style
 */
const getAlignmentStyle = (
  textAlign?: 'left' | 'center' | 'right' | 'justify',
): React.CSSProperties => {
  if (!textAlign || textAlign === 'left') {
    return {};
  }
  return { textAlign };
};

/**
 * Component for rendering Lexical content from Payload CMS
 */
export function LexicalContent({ content, className }: LexicalContentProps) {
  if (!content) {
    return null;
  }

  // If content is already an HTML string (for backward compatibility)
  if (typeof content === 'string') {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  // Render Lexical JSON
  const renderNode = (node: LexicalNode, index: number): React.ReactNode => {
    if (!node) return null;

    const { type, children, text, format, tag } = node;

    // Debug: show full node structure for block elements
    if (type === 'paragraph' || type === 'heading') {
      console.log('Full node:', node);
      console.log('All node keys:', Object.keys(node));
    }

    // Get alignment style from format field (for block elements)
    const alignmentStyle =
      typeof format === 'string'
        ? getAlignmentStyle(format as 'left' | 'center' | 'right' | 'justify')
        : {};

    // Text node
    if (type === 'text' || text !== undefined) {
      let textContent: React.ReactNode = text || '';

      // Apply text formatting (only if format is a number)
      if (typeof format === 'number' && format) {
        if (format & 1)
          textContent = <strong key={index}>{textContent}</strong>; // Bold
        if (format & 2) textContent = <em key={index}>{textContent}</em>; // Italic
        if (format & 8) textContent = <u key={index}>{textContent}</u>; // Underline
        if (format & 16) textContent = <code key={index}>{textContent}</code>; // Code
      }

      return textContent;
    }

    // Element nodes
    switch (type) {
      case 'root':
        return (
          <div key={index} className={className}>
            {children?.map(renderNode)}
          </div>
        );

      case 'paragraph':
        return (
          <p key={index} style={alignmentStyle}>
            {children?.map(renderNode)}
          </p>
        );

      case 'heading':
        const HeadingTag = (tag || 'h2') as keyof React.JSX.IntrinsicElements;
        return (
          <HeadingTag key={index} style={alignmentStyle}>
            {children?.map(renderNode)}
          </HeadingTag>
        );

      case 'list':
        const ListTag = tag === 'ol' ? 'ol' : 'ul';
        return (
          <ListTag key={index} style={alignmentStyle}>
            {children?.map(renderNode)}
          </ListTag>
        );

      case 'listitem':
        return (
          <li key={index} style={alignmentStyle}>
            {children?.map(renderNode)}
          </li>
        );

      case 'quote':
        return (
          <blockquote key={index} style={alignmentStyle}>
            {children?.map(renderNode)}
          </blockquote>
        );

      case 'link':
        return (
          <a
            key={index}
            href={node.url}
            target={node.newTab ? '_blank' : undefined}
            rel={node.newTab ? 'noopener noreferrer' : undefined}
          >
            {children?.map(renderNode)}
          </a>
        );

      case 'linebreak':
        return <br key={index} />;

      default:
        // For unknown types, just render children
        return children ? (
          <div key={index}>{children.map(renderNode)}</div>
        ) : null;
    }
  };

  try {
    // If content is an array of nodes
    if (Array.isArray(content)) {
      return <div className={className}>{content.map(renderNode)}</div>;
    }

    // If content has a root node
    if ('root' in content && content.root) {
      return <>{renderNode(content.root, 0)}</>;
    }

    // Otherwise render as a single node
    return <>{renderNode(content as LexicalNode, 0)}</>;
  } catch (error) {
    console.error('Error rendering Lexical content:', error);
    return <div className={className}>Error rendering content</div>;
  }
}
