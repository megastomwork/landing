import { ScrollAnimatedContainer } from '@/shared/components/animations/scroll-animated-container';
import dynamic from 'next/dynamic';

const BlogPresent = dynamic(() =>
  import('./ui/present').then(mod => mod.BlogPresent),
);
const BlogArticles = dynamic(() =>
  import('./ui/articles').then(mod => mod.BlogArticles),
);
const BlogQuestions = dynamic(() =>
  import('./ui/questions').then(mod => mod.BlogQuestions),
);

export function BlogPage() {
  return (
    <div className="mx-auto mt-[1.25rem] max-w-[1040px]">
      <ScrollAnimatedContainer delay={0}>
        <BlogPresent />
      </ScrollAnimatedContainer>
      <ScrollAnimatedContainer
        delay={0.2}
        className="flex w-full gap-4 max-lg:flex-col"
      >
        <>
          <div className="mx-auto lg:w-2/3">
            <BlogArticles />
          </div>
          <div className="max-lg:mx-7 max-lg:mb-6 lg:w-1/3">
            <BlogQuestions />
          </div>
        </>
      </ScrollAnimatedContainer>
    </div>
  );
}
