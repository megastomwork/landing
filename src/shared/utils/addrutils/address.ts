import { parseEscapedString } from '@/shared/lib/parse-escaped-string';

export function clearAddressSyntax(address: string | undefined) {
  if (!address) return '';
  return parseEscapedString(address.replaceAll('__', ''));
}
