import { Underline } from '@/shared/components/ui-kit/underline';
import React, { Fragment, ReactNode } from 'react';

type FormatedTextWithUnderlineProps = {
  children: string;
}

export function FormatedTextWithUnderline({ children }: FormatedTextWithUnderlineProps): ReactNode[] {
  const regex = /(__[^_]+__)/g;
  const parts = children.split(regex).filter(Boolean);
  return parts.map((part, index) => {
    if (part.startsWith('__') && part.endsWith('__')) {
      const content = part.slice(2, -2);
      
      return (
        <Underline key={index} underlineClassName='-bottom-1'>
          {content}
        </Underline>
      );
    } else {
      return <Fragment key={index}>{part}</Fragment>;
    }
  });
}
