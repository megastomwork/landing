import { Underline } from '@/shared/components/ui-kit/underline';
import React, { Fragment, ReactNode } from 'react';

type FormatedTextWithUnderlineProps = {
  children: string;
};

export function FormatedTextWithUnderline({
  children,
}: FormatedTextWithUnderlineProps): ReactNode[] {
  const regex = /(__[^_]+__)/g;
  const parts = children.split(regex).filter(Boolean);

  return parts.flatMap((part, partIndex) => {
    if (part.startsWith('__') && part.endsWith('__')) {
      const content = part.slice(2, -2);

      return (
        <Underline key={partIndex} underlineClassName="-bottom-1">
          {content}
        </Underline>
      );
    } else {
      const lines = part.split('\\n');
      return lines.flatMap((line, lineIndex) => {
        const elements: ReactNode[] = [
          <Fragment key={`${partIndex}-${lineIndex}`}>{line}</Fragment>,
        ];

        if (lineIndex < lines.length - 1) {
          elements.push(<br key={`${partIndex}-${lineIndex}-br`} />);
        }

        return elements;
      });
    }
  });
}
