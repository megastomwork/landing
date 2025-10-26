export function clearAddressSyntax(address: string | undefined) {
  return address?.replaceAll('__', '')
}
