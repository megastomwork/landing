'use client';

import { useTriggerModalOnScroll } from '@/features/contact-modal';
import { ScrollAnimatedContainer } from '@/shared/components/animations/scroll-animated-container';
import dynamic from 'next/dynamic';
import DescriptionSection from './intro/description-section';

const AboutSection = dynamic(() => import('./about/about-section'));
const BlogArticlesSection = dynamic(
  () => import('./blog/blog-articles-section'),
);
const ContactSection = dynamic(() => import('./contact/contact-section'));
const ContactInfoSection = dynamic(
  () => import('./contact-info/contact-info.section'),
);
const FeedbacksSection = dynamic(() => import('./feedbacks/feedbacks-section'));
const IntroSection = dynamic(() => import('./intro/intro-section'));
const ServicesSection = dynamic(() => import('./services/services-section'));

export function HomePage() {
  const { footerRef, servicesRef } = useTriggerModalOnScroll();
  return (
    <>
      <ScrollAnimatedContainer>
        <IntroSection />
      </ScrollAnimatedContainer>
      <ScrollAnimatedContainer delay={0.15}>
        <DescriptionSection />
      </ScrollAnimatedContainer>
      <ScrollAnimatedContainer delay={0.3}>
        <AboutSection />
      </ScrollAnimatedContainer>
      <ScrollAnimatedContainer>
        <div ref={servicesRef}></div>
        <ServicesSection />
      </ScrollAnimatedContainer>
      <ScrollAnimatedContainer>
        <ContactSection />
      </ScrollAnimatedContainer>
      <ScrollAnimatedContainer>
        <FeedbacksSection />
      </ScrollAnimatedContainer>
      <ScrollAnimatedContainer>
        <BlogArticlesSection />
      </ScrollAnimatedContainer>
      <ScrollAnimatedContainer>
        <ContactInfoSection />
      </ScrollAnimatedContainer>
      <div ref={footerRef}></div>
    </>
  );
}
