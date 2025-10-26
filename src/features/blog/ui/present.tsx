import { Underline } from '@/shared/components/ui-kit/underline';
import { CONFIG } from '@/shared/constants/config.constants';
import { useContent } from '@/shared/hooks/use-content';
import { cn } from '@/shared/lib/css';
import { ContentTextBlogPage } from '@/shared/types/content.types';

export function BlogPresent() {
  const content = useContent<ContentTextBlogPage>({
    context: 'BlogPage',
  });

  return (
    <div className="w-full max-lg:px-7">
      <div
        className={cn(
          'mb-6 flex min-h-[410px] w-full max-w-[1040px] flex-col items-center justify-center overflow-hidden rounded-[20px] bg-cover bg-center lg:mb-12 lg:min-h-[512px]',
        )}
        style={{
          backgroundImage: `url(${CONFIG.BACKEND_URL}/assets/${content.data?.backgroundImage})`,
        }}
      >
        <h1 className="mb-2 text-[24px] font-semibold leading-[120%] sm:text-[64px] lg:mb-6">
          <Underline underlineClassName="w-[40%]">
            {content?.data?.pageTitle}
          </Underline>
        </h1>
        <p className="max-w-[237px] text-center text-sm leading-6 sm:max-w-[500px] sm:text-xl lg:max-w-[713px]">
          {content?.data?.pageDescription}
        </p>
      </div>
    </div>
  );
}
