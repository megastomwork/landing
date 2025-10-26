import { CircleCheckBig } from 'lucide-react';
import MarkdownView from 'react-showdown';
import { Underline } from './underline';

type MarkdownProps = {
  markdown: string;
};

export function Markdown({ markdown }: MarkdownProps) {
  return (
    <MarkdownView
      markdown={markdown}
      options={{ emoji: true, tables: true, smartIndentationFix: true }}
      components={{
        CircleCheckBig: () => (
          <span>
            <br />
            <CircleCheckBig className="inline h-5 w-5 text-cyan-400" />
          </span>
        ),
        Underline,
      }}
    />
  );
}
