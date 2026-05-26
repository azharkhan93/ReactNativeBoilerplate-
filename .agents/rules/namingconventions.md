---
trigger: always_on
---

# Code Naming Conventions

## Core Naming Standards
- **React Components**: Always use `PascalCase` for component names and their folders (e.g. `PrimaryButton/PrimaryButton.tsx`).
- **Hooks**: Always use `camelCase` prefixed with `use` (e.g. `useAuth`, `useCalendarAvailability`).
- **Constants**: Always use `UPPER_SNAKE_CASE` for global, static constants or configuration arrays (e.g. `DEFAULT_ACTIVE_OPACITY`, `SUPPORTED_LANGUAGES`).
- **Types and Interfaces**: Always use `PascalCase` (e.g. `PrimaryButtonProps`, `UserResponseData`). Do not prefix interfaces with `I`.
- **Files & Assets**:
  - Component folders and files: `PascalCase`
  - Utility/helper files: `camelCase` or `kebab-case`
  - Hooks files: `camelCase`

## Semantic Booleans
- Boolean variables, state values, and function parameters MUST read semantically. They must be prefixed with:
  - `is` (e.g. `isLoading`, `isCompleted`, `isActive`)
  - `has` (e.g. `hasError`, `hasPermission`)
  - `should` (e.g. `shouldAnimate`, `shouldRender`)
  - `can` (e.g. `canSubmit`, `canAuthorize`)
  - `did` (e.g. `didComplete`, `didCancel`)

### ❌ Bad Naming Patterns:
```typescript
const dataLoading = true;
const ErrorStatus = false;
const animate_flag = true;
interface iButtonProps { ... }
function get_data() { ... }
```

###  Good Naming Patterns:
```typescript
const isLoading = true;
const hasError = false;
const shouldAnimate = true;
interface ButtonProps { ... }
const getData = () => { ... }
```