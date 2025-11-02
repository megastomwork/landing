'use client'

import React from 'react'

type LexicalNode = {
  type?: string
  children?: LexicalNode[]
  text?: string
  format?: number
  tag?: string
  url?: string
  newTab?: boolean
  root?: LexicalNode
  [k: string]: unknown
}

type LexicalContentProps = {
  content: LexicalNode | LexicalNode[] | string | { root: LexicalNode; [k: string]: unknown }
  className?: string
}

/**
 * Компонент для рендерингу Lexical контенту з Payload CMS
 */
export function LexicalContent({ content, className }: LexicalContentProps) {
  if (!content) {
    return null
  }

  // Якщо це вже HTML string (для backward compatibility)
  if (typeof content === 'string') {
    return <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
  }

  // Рендеримо Lexical JSON
  const renderNode = (node: LexicalNode, index: number): React.ReactNode => {
    if (!node) return null

    const { type, children, text, format, tag } = node

    // Text node
    if (type === 'text' || text !== undefined) {
      let textContent: React.ReactNode = text || ''

      // Apply text formatting
      if (format) {
        if (format & 1) textContent = <strong key={index}>{textContent}</strong> // Bold
        if (format & 2) textContent = <em key={index}>{textContent}</em> // Italic
        if (format & 8) textContent = <u key={index}>{textContent}</u> // Underline
        if (format & 16) textContent = <code key={index}>{textContent}</code> // Code
      }

      return textContent
    }

    // Element nodes
    switch (type) {
      case 'root':
        return <div key={index} className={className}>{children?.map(renderNode)}</div>

      case 'paragraph':
        return <p key={index}>{children?.map(renderNode)}</p>

      case 'heading':
        const HeadingTag = (tag || 'h2') as keyof React.JSX.IntrinsicElements
        return <HeadingTag key={index}>{children?.map(renderNode)}</HeadingTag>

      case 'list':
        const ListTag = tag === 'ol' ? 'ol' : 'ul'
        return <ListTag key={index}>{children?.map(renderNode)}</ListTag>

      case 'listitem':
        return <li key={index}>{children?.map(renderNode)}</li>

      case 'quote':
        return <blockquote key={index}>{children?.map(renderNode)}</blockquote>

      case 'link':
        return (
          <a key={index} href={node.url} target={node.newTab ? '_blank' : undefined} rel={node.newTab ? 'noopener noreferrer' : undefined}>
            {children?.map(renderNode)}
          </a>
        )

      case 'linebreak':
        return <br key={index} />

      default:
        // Для невідомих типів просто рендеримо children
        return children ? <div key={index}>{children.map(renderNode)}</div> : null
    }
  }

  try {
    // Якщо це масив nodes
    if (Array.isArray(content)) {
      return <div className={className}>{content.map(renderNode)}</div>
    }

    // Якщо content має root node
    if ('root' in content && content.root) {
      return <>{renderNode(content.root, 0)}</>
    }

    // Інакше рендеримо як один node
    return <>{renderNode(content as LexicalNode, 0)}</>
  } catch (error) {
    console.error('Error rendering Lexical content:', error)
    return <div className={className}>Error rendering content</div>
  }
}
