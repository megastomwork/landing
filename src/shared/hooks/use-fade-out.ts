import { useState, useEffect, useRef } from 'react';

/**
 * useFadeOut - Hook to handle fade-out animation and unmounting after animation.
 * @param isNotLoading Boolean - when set to true, starts the fade-out process
 * @param duration Duration of fade-out animation in ms (default: 500)
 * @param isLoading Boolean - the original loading state, used to track if loading was ever true
 * @returns [show, fadeOut, shouldShowChildrenDirectly]
 *   show: boolean - whether to show the content
 *   fadeOut: boolean - whether to apply the fade-out class
 *   shouldShowChildrenDirectly: boolean - true if loading was never true
 */
export function useFadeOut(
  isLoading: boolean,
  duration = 500,
): [boolean, boolean, boolean] {
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const prevTrigger = useRef(!isLoading);
  const wasLoading = useRef(false);

  if (isLoading) {
    wasLoading.current = true;
  }

  useEffect(() => {
    if (!prevTrigger.current && !isLoading) {
      setFadeOut(true);
      const timeout = setTimeout(() => {
        setShow(false);
      }, duration);
      return () => clearTimeout(timeout);
    }
    prevTrigger.current = !isLoading;
  }, [isLoading, duration]);

  const shouldShowChildrenDirectly = !wasLoading.current;
  return [show, fadeOut, shouldShowChildrenDirectly];
}
