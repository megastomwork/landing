import { useFadeOut } from '@/shared/hooks/use-fade-out';
import { Loader } from 'lucide-react';
import React from 'react';

type FadeLoadingContainerProps = {
  isLoading: boolean;
  children: React.ReactNode;
};

export const FadeLoadingContainer = ({
  isLoading,
  children,
}: FadeLoadingContainerProps) => {
  const [isShowLoader, animateFadeOut, shouldShowChildrenDirectly] = useFadeOut(
    isLoading,
    500,
  );

  if (shouldShowChildrenDirectly) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {isShowLoader ? (
        <div
          className={`flex items-center justify-center p-10 transition-opacity duration-500 ${animateFadeOut ? 'animate-fade-out' : ''}`}
        >
          <Loader className="size-10 animate-spin stroke-[1px]" />
        </div>
      ) : (
        <div className="animate-fade-in">{children}</div>
      )}
    </div>
  );
};
