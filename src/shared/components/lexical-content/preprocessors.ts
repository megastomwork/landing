import type { LexicalNode } from './types';

/**
 * Preprocessor function type
 * Takes an array of nodes and returns a transformed array
 */
export type NodePreprocessor = (nodes: LexicalNode[]) => LexicalNode[];

/**
 * Regex to match emoji at the start of text
 * Matches emoji presentations and emoji with variation selectors
 */
const LEADING_EMOJI_REGEX = /^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)\s*/u;

/**
 * Extract leading emoji from a paragraph node
 * Returns the emoji and the node with emoji removed, or null if no emoji
 */
function extractLeadingEmoji(
  node: LexicalNode,
): { emoji: string; node: LexicalNode } | null {
  if (node.type !== 'paragraph' || !node.children?.length) {
    return null;
  }

  // Find first text node (skip linebreaks at the beginning)
  let firstTextIndex = -1;
  for (let i = 0; i < node.children.length; i++) {
    if (node.children[i].type === 'text') {
      firstTextIndex = i;
      break;
    }
    // Only skip linebreaks, stop on any other node type
    if (node.children[i].type !== 'linebreak') {
      return null;
    }
  }

  if (firstTextIndex === -1) {
    return null;
  }

  const firstTextChild = node.children[firstTextIndex];
  if (!firstTextChild.text) {
    return null;
  }

  const match = firstTextChild.text.match(LEADING_EMOJI_REGEX);
  if (!match) {
    return null;
  }

  const emoji = match[1];
  const textWithoutEmoji = firstTextChild.text.slice(match[0].length);

  // Create new node with emoji removed from text
  // Also remove leading linebreaks
  const newChildren = node.children.slice(firstTextIndex);
  if (textWithoutEmoji) {
    newChildren[0] = { ...firstTextChild, text: textWithoutEmoji };
  } else {
    // Remove empty text node
    newChildren.shift();
  }

  return {
    emoji,
    node: { ...node, children: newChildren },
  };
}

/**
 * Preprocessor that groups consecutive paragraphs starting with emoji
 * into emoji-list nodes
 *
 * Input:
 *   [paragraph(❌ text1), paragraph(✅ text2), paragraph(normal)]
 *
 * Output:
 *   [emoji-list([{emoji: ❌, children: [text1]}, {emoji: ✅, children: [text2]}]), paragraph(normal)]
 */
export const emojiListPreprocessor: NodePreprocessor = (
  nodes: LexicalNode[],
): LexicalNode[] => {
  const result: LexicalNode[] = [];
  let currentEmojiGroup: { emoji: string; children: LexicalNode[] }[] | null =
    null;

  for (const node of nodes) {
    const extracted = extractLeadingEmoji(node);

    // Debug logging - remove after fixing
    if (node.type === 'paragraph') {
      const firstChild = node.children?.[0];
      console.log('[EmojiPreprocessor]', {
        firstChildType: firstChild?.type,
        firstChildText: firstChild?.text?.slice(0, 40),
        hasChildren: !!node.children?.length,
        extracted: !!extracted,
        emoji: extracted?.emoji,
      });
    }
    if (extracted) {
      // Start or continue emoji group
      if (!currentEmojiGroup) {
        currentEmojiGroup = [];
      }
      currentEmojiGroup.push({
        emoji: extracted.emoji,
        children: extracted.node.children || [],
      });
    } else {
      // End current group if exists
      if (currentEmojiGroup) {
        result.push({
          type: 'emoji-list',
          items: currentEmojiGroup,
        } as LexicalNode);
        currentEmojiGroup = null;
      }
      result.push(node);
    }
  }

  // Don't forget the last group
  if (currentEmojiGroup) {
    result.push({
      type: 'emoji-list',
      items: currentEmojiGroup,
    } as LexicalNode);
  }

  return result;
};

/**
 * Array of preprocessors to apply in order
 * Add new preprocessors here to extend functionality
 */
const preprocessors: NodePreprocessor[] = [emojiListPreprocessor];

/**
 * Apply all preprocessors to nodes sequentially
 */
export function preprocessNodes(nodes: LexicalNode[]): LexicalNode[] {
  return preprocessors.reduce((acc, preprocessor) => preprocessor(acc), nodes);
}
