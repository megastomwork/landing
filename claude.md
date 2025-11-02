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
