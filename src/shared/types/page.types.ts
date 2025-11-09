import { Page } from '@/shared/payload/payload-types';
import { BlockType } from '@/shared/payload/constants/block-types';

export type PageSection = NonNullable<Page['sections']>[number];

export type ExtractSectionByType<T extends BlockType> = Extract<
  PageSection,
  { blockType: T }
>;

export type SectionProps<T extends BlockType> = Omit<
  ExtractSectionByType<T>,
  'id' | 'blockName' | 'blockType'
>;
