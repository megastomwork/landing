import { LIVE_PREVIEW_FLAG } from "../constants/payload.constants";

/**
 * Перевіряє чи додаток знаходиться в режимі live preview Payload CMS
 *
 * Payload додає query параметр 'payload-live-preview' коли відкриває
 * сторінку в режимі попереднього перегляду з адмінки
 */
export function isLivePreviewMode(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.has(LIVE_PREVIEW_FLAG);
}
