import { CircleCheckBig } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'

type MarkdownProps = {
  markdown: string
}

export function Markdown({ markdown }: MarkdownProps) {
  const components: Components = {
    ul: ({ children }) => (
      <ul className="my-4 space-y-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="my-4 space-y-2">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="flex items-start gap-2 text-xl !mt-0">
        <CircleCheckBig className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-400" />
        <span className="flex-1">{children}</span>
      </li>
    ),
    p: ({ children }) => <p className="my-2">{children}</p>,
  }

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {markdown}
    </ReactMarkdown>
  )
}
