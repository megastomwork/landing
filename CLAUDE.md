# Claude Code Guidelines

## Language
- All comments must be written in English
- All code, documentation, and text content should be in English

## Code Style
- Use **kebab-case** for files and folders naming
  - Example: `user-profile.tsx`, `auth-service/`

## Architecture
This project follows **Evolution Design (ED)** architecture, based on Feature-Sliced Design (FSD).

### Layers
The architecture consists of 3 main layers:

1. **app** - Application initialization and configuration
2. **features** - Feature-specific modules and business logic
3. **shared** - Reusable utilities, components, and resource

# Evolution Design (ED) Architecture

## Overview

Evolution Design - frontend architecture for Next.js projects, based on Feature-Sliced Design (FSD).

This document describes **project structure only**. For technical stack, GraphQL, React Query, and other tools, see [Frontend Architecture](./frontend-architecture.md).

**Key principles:**
- 3 layers: `app`, `features`, `shared`
- Unidirectional import flow: app → features → shared
- Modular structure
- Complexity evolution: ED-small → ED-medium

## ED-small (< 12 person-months codebase)

**Characteristics:**
- Cross-imports between feature modules allowed
- Fast start
- Simpler structure

**When to use:**
- Landing pages
- Small SaaS projects
- MVPs and prototypes
- Small dashboards
- E-commerce with basic functionality

**Import rules:**
```typescript
// ✅ Allowed
import { Button } from '@/shared/ui/button';
import { useAuth } from '@/features/auth';
import { ProductCard } from '@/features/products'; // cross-import OK in ED-small

// ✅ App layer can import from features
import { AuthProvider } from '@/features/auth';

// ❌ Never allowed
import { Header } from '@/app/components'; // shared/features can't import from app
```

## ED-medium (≥ 12 person-months codebase)

**Characteristics:**
- Cross-imports between feature modules forbidden
- Dependency Injection for inter-module communication
- Stricter architecture

**When to migrate:**
- Codebase grows > 12 person-months
- Many interconnected features
- Team > 3 developers
- Complex business logic

**Import rules:**
```typescript
// ✅ Allowed
import { Button } from '@/shared/ui/button';
import { useAuth } from '@/features/auth';

// ❌ Cross-imports forbidden
import { ProductCard } from '@/features/products'; // ❌ use DI instead

// ✅ Use DI for cross-feature communication
// (implementation details to be defined)
```

## Layer Structure

### 1. App Layer (`app/`)
Next.js App Router structure. Responsible for:
- Routing
- Layouts
- Root providers
- Global error handling

```
app/
├── (auth)/              # Route groups
│   ├── login/
│   │   └── page.tsx
│   └── register/
│       └── page.tsx
├── (dashboard)/
│   ├── layout.tsx
│   ├── page.tsx
│   └── settings/
│       └── page.tsx
├── api/                 # API routes (if not using separate backend)
│   └── webhooks/
├── layout.tsx           # Root layout
├── providers.tsx        # Root providers
└── globals.css
```

**Rules:**
- Minimal logic, mostly composition
- Import from features and shared only
- No business logic

### 2. Features Layer (`features/`)
Business logic modules. **IMPORTANT: Each module = specific feature, NOT domain!**

**Split by FEATURES, not by domains:**
```
# ❌ WRONG (by domains)
features/
├── products/      # too general
├── users/
└── orders/

# ✅ CORRECT (by features)
features/
├── product-list/           # feature: product list
├── product-feed/           # feature: product feed with filters
├── product-details/        # feature: product detail page
├── ai-recommendations/     # feature: AI product recommendations
├── update-product/         # feature: product editing
├── user-login/             # feature: user login
├── user-registration/      # feature: registration
└── user-profile/           # feature: user profile
```

**Feature structure example:**
```
features/
└── product-feed/
    ├── ui/                    # Components
    │   ├── feed-container.tsx
    │   ├── feed-item.tsx
    │   └── feed-skeleton.tsx
    ├── api/                   # API calls
    │   ├── product-feed.api.ts
    │   └── product-feed.types.ts
    ├── model/                 # State, stores, hooks
    │   ├── use-product-feed.ts
    │   ├── product-feed.store.ts
    │   └── product-feed.schema.ts
    ├── lib/                   # Utils specific to feature
    │   └── format-feed-item.ts
    └── index.ts               # Public API (REQUIRED!)
```

**Nested Features:**
Features can contain other features:

```
features/
└── product-feed/
    ├── ui/
    ├── api/
    ├── model/
    ├── feed-filters/          # nested feature
    │   ├── ui/
    │   │   ├── filter-panel.tsx
    │   │   └── filter-chip.tsx
    │   ├── model/
    │   │   └── use-filters.ts
    │   └── index.ts           # nested feature public API
    ├── feed-sorting/          # another nested feature
    │   ├── ui/
    │   ├── model/
    │   └── index.ts
    └── index.ts               # parent feature public API
```

**Feature segments (slices):**
- `ui/` - React components + local UI hooks (if needed only here)
- `api/` - API queries/mutations, feature-specific types
- `model/` - **Business logic**: state management, business logic hooks, stores, schemas (zod/yup)
- `lib/` - Feature-specific utilities
- `index.ts` - **Public API (REQUIRED!)**

**Important about hooks:**
- `model/` - Business logic hooks (useProductFeed, useFeedFilters - with business logic)
- `ui/` - Local UI hooks for this feature (useFeedAnimation, useFeedScroll)
- `shared/hooks/` - Generic UI hooks (useToggle, useMediaQuery, useLocalStorage)

**Note:** For API implementation details (GraphQL, React Query), see [Frontend Architecture](./frontend-architecture.md).

**CRITICAL Rules:**
- **EVERY feature MUST have index.ts** (public API)
- **Imports ONLY through public API** (index.ts)
- Direct access to feature internal files is FORBIDDEN
- Nested features can be accessed directly (not through parent)
- ED-small: cross-imports between features allowed
- ED-medium: cross-imports forbidden, use DI

### 3. Shared Layer (`shared/`)
Reusable resources without business logic.

```
shared/
├── ui/                        # UI kit
│   ├── button/
│   │   ├── button.tsx
│   │   └── index.ts
│   ├── input/
│   ├── modal/
│   └── index.ts
├── hooks/                     # Generic UI hooks (NOT business logic!)
│   ├── use-local-storage.ts
│   ├── use-media-query.ts
│   ├── use-toggle.ts
│   └── index.ts
├── api/                       # API infrastructure (ED EXCEPTION)
│   ├── graphql/
│   │   ├── client.ts         # GraphQL client setup
│   │   ├── request.ts        # Wrapper functions
│   │   ├── error-handler.ts
│   │   └── fragments/
│   ├── query-keys/           # React Query key factories
│   │   ├── product.keys.ts
│   │   ├── user.keys.ts
│   │   └── index.ts
│   └── types/
│       ├── generated.ts      # graphql-codegen types
│       └── common.types.ts
├── lib/                       # Utilities
│   ├── format/
│   │   ├── format-date.ts
│   │   ├── format-currency.ts
│   │   └── index.ts
│   ├── validation/
│   │   ├── validators.ts
│   │   └── index.ts
│   └── helpers/
│       └── array-helpers.ts
├── types/                     # Common types (NOT API!)
│   ├── common.types.ts
│   └── index.ts
├── config/                    # Configuration
│   ├── env.ts
│   ├── api.config.ts
│   ├── app.config.ts
│   └── constants.ts
└── integrations/              # Third-party integrations
    ├── supabase/
    ├── stripe/
    └── analytics/
```

**Rules:**
- No business logic
- No feature-specific code
- Highly reusable
- Can't import from features or app

**API Infrastructure Note:**
The `shared/api/` folder is an **ED exception** - it contains centralized GraphQL client, React Query keys, and generated types to avoid cross-imports. See [Frontend Architecture](./frontend-architecture.md) for details.

## Import Rules

### Public API Pattern
Each feature must export through index.ts:

```typescript
// features/auth/index.ts
export { LoginForm, RegisterForm } from './ui';
export { useAuth, useSession } from './model';
export { authApi } from './api';
export type { User, AuthState } from './api/auth.types';

// Don't export internal implementation
```

### Path Aliases
```typescript
// tsconfig.json paths
{
  "@/app/*": ["app/*"],
  "@/features/*": ["features/*"],
  "@/shared/*": ["shared/*"]
}
```

### Import Examples
```typescript
// ✅ Good - via public API
import { Button } from '@/shared/ui/button';
import { useAuth } from '@/features/user-login';
import { ProductFeed } from '@/features/product-feed';
import { formatDate } from '@/shared/lib/format';

// ✅ Good - nested feature directly via its public API
import { FeedFilters } from '@/features/product-feed/feed-filters';
import { FeedSorting } from '@/features/product-feed/feed-sorting';

// ❌ Bad - direct access to internal files
import { LoginForm } from '@/features/user-login/ui/login-form';
import { authStore } from '@/features/user-login/model/auth.store';
import { FeedItem } from '@/features/product-feed/ui/feed-item';

// ❌ Bad - wrong direction
// In features/product-list/ui/product-card.tsx
import { Header } from '@/app/components/header';
```

## Migration Path

### Starting new project
Start with ED-small:
```
1. Create basic structure (app, features, shared)
2. Allow cross-imports for speed
3. Focus on delivery
```

### When to migrate to ED-medium
Indicators:
- Codebase > 12 person-months
- Complex cross-feature dependencies
- Hard to track feature interactions
- Team growing > 3 developers

Migration steps:
```
1. Identify cross-imports between features
2. Design DI contracts
3. Refactor one feature at a time
4. Add linting rules to prevent cross-imports
```

## Best Practices

### Feature Design
- **One feature = one specific business feature** (NOT domain!)
- Split by features, not by domains (product-list, product-feed, not just "products")
- Features can be nested (feature inside feature)
- Keep features independent
- Minimize feature coupling
- Use shared layer for common logic
- Each feature size can vary (from small section to full page)

### Code Organization
- Group by feature, not by type
- Keep related files together
- Use index.ts for clean exports
- Follow naming conventions

### Testing
Tests should be colocated with code:
```
features/auth/
├── ui/
│   ├── login-form.tsx
│   └── login-form.test.tsx      # Test near component
├── model/
│   ├── use-auth.ts
│   └── use-auth.test.ts
└── lib/
    ├── validate-password.ts
    └── validate-password.test.ts
```

## Related Documentation

- [Frontend Architecture](./frontend-architecture.md) - Technical stack, GraphQL, React Query, state management, testing
- [NestJS Architecture](./nestjs-architecture.md) - Backend architecture (coming soon)
