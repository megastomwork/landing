# Lexical Content Renderer

Flexible, configuration-based renderer for Lexical content from Payload CMS.

## Architecture

```
lexical-content/
├── index.ts                  # Public API
├── lexical-content.tsx       # Main component
├── renderer.ts               # Core render logic
├── node-renderers.tsx        # Individual node renderers
├── config.ts                 # Configuration mapping
├── style-helpers.ts          # Style utility functions
├── types.ts                  # TypeScript definitions
└── README.md                 # This file
```

## Usage

### Basic Usage

```tsx
import { LexicalContent } from '@/shared/components/lexical-content';

function ArticlePage({ article }) {
  return (
    <div className="prose">
      <LexicalContent content={article.content} />
    </div>
  );
}
```

### With Custom Styling

```tsx
<LexicalContent content={content} className="prose prose-lg max-w-none" />
```

## Adding New Node Types

### Step 1: Create a Renderer Function

In `node-renderers.tsx`:

```tsx
export const CustomRenderer: NodeRenderer = (node, index, renderChildren) => {
  const { customProp } = node;

  return (
    <div key={index} className="custom-node">
      {customProp}
      {renderChildren(node.children)}
    </div>
  );
};
```

### Step 2: Add to Configuration

In `config.ts`:

```tsx
import { CustomRenderer } from './node-renderers';

export const nodeRenderersConfig: NodeRenderersConfig = {
  text: TextRenderer,
  paragraph: ParagraphRenderer,
  // ... other renderers
  custom: CustomRenderer, // Add your renderer here
};
```

### Step 3: Use in Payload

Configure your Payload CMS to include the custom node type in the Lexical editor.

## Patterns Used

### Visitor Pattern

The renderer visits each node in the tree and applies the appropriate rendering logic.

### Strategy Pattern

Different rendering strategies are applied based on node type.

### Factory Pattern

Node renderers are created through a factory function (`getRendererForNode`).

### Configuration Pattern

All node types are defined in a single configuration object, making it easy to extend.

## Style Helpers

### `getAlignmentStyle(format)`

Converts Lexical alignment format to CSS styles.

```tsx
getAlignmentStyle('center'); // { textAlign: 'center' }
```

### `hasTextFormat(format, flag)`

Checks if a text format flag is set in the bitmask.

```tsx
hasTextFormat(format, TextFormat.Bold); // true/false
```

### `mergeStyles(...styles)`

Merges multiple style objects into one.

```tsx
mergeStyles(getAlignmentStyle('center'), getIndentStyle(2)); // { textAlign: 'center', paddingLeft: '4rem' }
```

## Supported Node Types

- `text` - Text nodes with formatting (bold, italic, underline, etc.)
- `paragraph` - Paragraph blocks
- `heading` - Headings (h1-h6)
- `list` - Ordered and unordered lists
- `listitem` - List items
- `quote` - Blockquotes
- `link` - Hyperlinks
- `linebreak` - Line breaks
- `root` - Root container

## Text Formatting Flags

Text formatting uses a bitmask system:

```ts
enum TextFormat {
  Bold = 1, // 0001
  Italic = 2, // 0010
  Strikethrough = 4, // 0100
  Underline = 8, // 1000
  Code = 16, // ...
  Subscript = 32,
  Superscript = 64,
}
```

Multiple formats can be combined:

- `format = 3` = Bold + Italic (1 + 2)
- `format = 9` = Bold + Underline (1 + 8)

## Alignment

Block-level elements support alignment through the `format` field:

- `'left'` - Left aligned (default)
- `'center'` - Center aligned
- `'right'` - Right aligned
- `'justify'` - Justified

## Extending the Renderer

### Custom Style Helper

```tsx
// style-helpers.ts
export function getCustomStyle(node: LexicalNode): CSSProperties {
  return {
    backgroundColor: node.bgColor as string,
    padding: '1rem',
  };
}
```

### Custom Renderer with Style Helper

```tsx
// node-renderers.tsx
import {
  getCustomStyle,
  mergeStyles,
  getAlignmentStyle,
} from './style-helpers';

export const HighlightRenderer: NodeRenderer = (
  node,
  index,
  renderChildren,
) => {
  const style = mergeStyles(
    getAlignmentStyle(node.format),
    getCustomStyle(node),
  );

  return (
    <mark key={index} style={style}>
      {renderChildren(node.children)}
    </mark>
  );
};
```

## Error Handling

The component includes error boundaries:

```tsx
try {
  const rendered = renderLexicalContent(content);
  return <div>{rendered}</div>;
} catch (error) {
  console.error('Error rendering Lexical content:', error);
  return <div>Error rendering content</div>;
}
```

## Performance Considerations

- The renderer uses recursive rendering with memoization through React keys
- Each node type has a dedicated renderer to avoid conditional logic
- Style helpers are pure functions that can be memoized

## Testing

Example test structure:

```tsx
describe('LexicalContent', () => {
  it('renders paragraph nodes', () => {
    const content = {
      root: {
        type: 'root',
        children: [{ type: 'paragraph', children: [{ text: 'Hello' }] }],
      },
    };

    render(<LexicalContent content={content} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

## Migration from Old Version

The old monolithic component can be replaced with:

```tsx
// Old
import { LexicalContent } from '@/shared/components/ui-kit/lexical-content';

// New
import { LexicalContent } from '@/shared/components/lexical-content';
```

The API remains the same, so no changes needed in consuming components.
