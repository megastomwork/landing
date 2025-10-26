export function getFirstPartOfAddress(address: string): string {
  if (!address) return '';

  const words = address.trim().split(/\s+/);
  return words.slice(0, 2).join(' ');
}

export function getSecondPartOfAddress(address: string): string {
  if (!address) return '';

  const words = address.trim().split(/\s+/);
  return words.slice(2).join(' ');
}
