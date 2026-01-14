import type { NodeRenderersConfig, NodeRenderer } from './types';
import {
  TextRenderer,
  ParagraphRenderer,
  HeadingRenderer,
  ListRenderer,
  ListItemRenderer,
  QuoteRenderer,
  LinkRenderer,
  LinebreakRenderer,
  RootRenderer,
  DefaultRenderer,
} from './node-renderers';

/**
 * Configuration object mapping node types to their renderers
 *
 * To add a new node type:
 * 1. Create a new renderer function in `node-renderers.tsx` following the NodeRenderer type
 * 2. Import it here
 * 3. Add it to this config object with the node type as key
 *
 * Example:
 * ```tsx
 * // In node-renderers.tsx
 * export const CustomRenderer: NodeRenderer = (node, index, renderChildren) => {
 *   return <div key={index} className="custom">{renderChildren(node.children)}</div>;
 * };
 *
 * // In this file (config.ts)
 * import { CustomRenderer } from './node-renderers';
 *
 * export const nodeRenderersConfig: NodeRenderersConfig = {
 *   ...
 *   custom: CustomRenderer,
 * };
 * ```
 */
export const nodeRenderersConfig: NodeRenderersConfig = {
  text: TextRenderer,
  paragraph: ParagraphRenderer,
  heading: HeadingRenderer,
  list: ListRenderer,
  listitem: ListItemRenderer,
  quote: QuoteRenderer,
  link: LinkRenderer,
  linebreak: LinebreakRenderer,
  root: RootRenderer,
};

/**
 * Get renderer for a node type
 */
export function getRendererForNode(nodeType?: string): NodeRenderer {
  if (!nodeType) {
    return DefaultRenderer;
  }
  return nodeRenderersConfig[nodeType] || DefaultRenderer;
}
