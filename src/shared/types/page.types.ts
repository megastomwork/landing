import { Page } from '@/shared/payload/payload-types';

export type PageSection = NonNullable<Page['sections']>[number];

export type ExtractSectionByType<T extends PageSection['blockType']> = Extract<
  PageSection,
  { blockType: T }
>;

export type SectionProps<T extends PageSection['blockType']> = Omit<
  ExtractSectionByType<T>,
  'id' | 'blockName' | 'blockType'
>;
