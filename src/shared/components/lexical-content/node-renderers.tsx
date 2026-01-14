import React from 'react';
import type { NodeRenderer } from './types';
import { getAlignmentStyle, hasTextFormat } from './style-helpers';
import { TextFormat } from './types';

/**
 * Renderer for text nodes
 */
export const TextRenderer: NodeRenderer = (node, index) => {
  const { text = '', format } = node;
  let content: React.ReactNode = text;

  if (typeof format === 'number' && format !== 0) {
    if (hasTextFormat(format, TextFormat.Bold)) {
      content = <strong key={`bold-${index}`}>{content}</strong>;
    }
    if (hasTextFormat(format, TextFormat.Italic)) {
      content = <em key={`italic-${index}`}>{content}</em>;
    }
    if (hasTextFormat(format, TextFormat.Underline)) {
      content = <u key={`underline-${index}`}>{content}</u>;
    }
    if (hasTextFormat(format, TextFormat.Code)) {
      content = <code key={`code-${index}`}>{content}</code>;
    }
    if (hasTextFormat(format, TextFormat.Strikethrough)) {
      content = <s key={`strikethrough-${index}`}>{content}</s>;
    }
  }

  return content;
};

/**
 * Renderer for paragraph nodes
 */
export const ParagraphRenderer: NodeRenderer = (
  node,
  index,
  renderChildren,
) => {
  const style = getAlignmentStyle(node.format);
  return (
    <p key={index} style={style}>
      {renderChildren(node.children)}
    </p>
  );
};

/**
 * Renderer for heading nodes
 */
export const HeadingRenderer: NodeRenderer = (node, index, renderChildren) => {
  const { tag = 'h2' } = node;
  const HeadingTag = tag as keyof React.JSX.IntrinsicElements;
  const style = getAlignmentStyle(node.format);

  return (
    <HeadingTag key={index} style={style}>
      {renderChildren(node.children)}
    </HeadingTag>
  );
};

/**
 * Renderer for list nodes
 */
export const ListRenderer: NodeRenderer = (node, index, renderChildren) => {
  const { tag = 'ul' } = node;
  const ListTag = (
    tag === 'ol' ? 'ol' : 'ul'
  ) as keyof React.JSX.IntrinsicElements;
  const style = getAlignmentStyle(node.format);

  return (
    <ListTag key={index} style={style}>
      {renderChildren(node.children)}
    </ListTag>
  );
};

/**
 * Renderer for list item nodes
 */
export const ListItemRenderer: NodeRenderer = (node, index, renderChildren) => {
  const style = getAlignmentStyle(node.format);
  return (
    <li key={index} style={style}>
      {renderChildren(node.children)}
    </li>
  );
};

/**
 * Renderer for blockquote nodes
 */
export const QuoteRenderer: NodeRenderer = (node, index, renderChildren) => {
  const style = getAlignmentStyle(node.format);
  return (
    <blockquote key={index} style={style}>
      {renderChildren(node.children)}
    </blockquote>
  );
};

/**
 * Renderer for link nodes
 */
export const LinkRenderer: NodeRenderer = (node, index, renderChildren) => {
  const { url, newTab } = node;
  return (
    <a
      key={index}
      href={url as string}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noopener noreferrer' : undefined}
    >
      {renderChildren(node.children)}
    </a>
  );
};

/**
 * Renderer for line break nodes
 */
export const LinebreakRenderer: NodeRenderer = (node, index) => {
  return <br key={index} />;
};

/**
 * Renderer for root node
 */
export const RootRenderer: NodeRenderer = (node, index, renderChildren) => {
  return (
    <React.Fragment key={index}>{renderChildren(node.children)}</React.Fragment>
  );
};

/**
 * Default renderer for unknown node types
 */
export const DefaultRenderer: NodeRenderer = (node, index, renderChildren) => {
  if (node.children) {
    return <div key={index}>{renderChildren(node.children)}</div>;
  }
  return null;
};
