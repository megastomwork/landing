'use client';

import type { Page } from '@/shared/payload/payload-types';
import { BLOCK_TYPES } from '@/shared/payload/constants/block-types';
import { ScrollAnimatedContainer } from '@/shared/components/animations/scroll-animated-container';
import { RefreshRouteOnSave } from '@/shared/components/ui-kit/refresh-route-on-save';
import {
  AboutSection,
  BlogGridSection,
  BlogGridWithFaqSection,
  BlogHeroSection,
  BlogRowSection,
  ContactInfoSection,
  DescriptionSection,
  DoctorsSection,
  FaqSection,
  Intro1Section,
  Intro2Section,
  PageContactSection,
  PageFeedbacksSection,
  ParagraphSection,
  PricesSection,
  ServicesSection,
} from '@/features/page/sections';

type PageSection = NonNullable<Page['sections']>[number];

type PageContentProps = {
  page: Page;
};

export function PageContent({ page }: PageContentProps) {
  const renderSection = (section: PageSection, index: number) => {
    const key = section.id || index;

    switch (section.blockType) {
      case BLOCK_TYPES.INTRO_1:
        return <Intro1Section key={key} {...section} />;
      case BLOCK_TYPES.INTRO_2:
        return <Intro2Section key={key} {...section} />;
      case BLOCK_TYPES.ABOUT:
        return <AboutSection key={key} {...section} />;
      case BLOCK_TYPES.SERVICES:
        return <ServicesSection key={key} {...section} />;
      case BLOCK_TYPES.BLOG_GRID:
        return <BlogGridSection key={key} {...section} />;
      case BLOCK_TYPES.BLOG_ROW:
        return <BlogRowSection key={key} {...section} />;
      case BLOCK_TYPES.FEEDBACKS:
        return <PageFeedbacksSection key={key} {...section} />;
      case BLOCK_TYPES.CONTACT:
        return <PageContactSection key={key} {...section} />;
      case BLOCK_TYPES.DESCRIPTION:
        return <DescriptionSection key={key} {...section} />;
      case BLOCK_TYPES.PARAGRAPH:
        return <ParagraphSection key={key} {...section} />;
      case BLOCK_TYPES.DOCTORS:
        return <DoctorsSection key={key} {...section} />;
      case BLOCK_TYPES.BLOG_HERO:
        return <BlogHeroSection key={key} {...section} />;
      case BLOCK_TYPES.FAQ:
        return <FaqSection key={key} {...section} />;
      case BLOCK_TYPES.PRICES:
        return <PricesSection key={key} {...section} />;
      case BLOCK_TYPES.CONTACT_INFO:
        return <ContactInfoSection key={key} {...section} />;
      case BLOCK_TYPES.BLOG_GRID_WITH_FAQ:
        return <BlogGridWithFaqSection key={key} {...section} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <RefreshRouteOnSave />
      {page.sections?.map((section, index) => (
        <ScrollAnimatedContainer key={index}>
          {renderSection(section, index)}
        </ScrollAnimatedContainer>
      ))}
    </div>
  );
}
