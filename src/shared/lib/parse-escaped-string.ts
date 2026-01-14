/**
 * Parses a string with escape sequences (like \n, \t) into actual characters
 *
 * @param text - String that may contain escape sequences
 * @returns String with escape sequences converted to actual characters
 *
 * @example
 * parseEscapedString("Line 1\\nLine 2") // returns "Line 1\nLine 2"
 */
export function parseEscapedString(text: string): string {
  return text
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t')
    .replace(/\\r/g, '\r')
    .replace(/\\\\/g, '\\');
}
