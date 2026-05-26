---
trigger: always_on
---

# Strict TypeScript Rules

## Absolute Directives
- **Zero-Any Policy**: Never use `any`. Never cast to `any` (e.g. `data as any`).
- **No Suppressed Errors**: Never use `@ts-ignore` or `@ts-nocheck` to hide type compilation errors.
- **Mandatory Typing**: All function parameters, callback arguments, props, hook return signatures, navigation configurations, animation structures, and API results must have explicit and specific type definitions.
- **Readonly Constants**: Use `as const` or `readonly` modifier on static configuration files and arrays to enforce immutability at compilation.

## React Element Typing
- **React Children**: Avoid implicit React children typing. Declare `children` explicitly inside your props interfaces if needed (e.g., `children: React.ReactNode`).
- **Exact Generic Inference**: Never allow implicit broad array types (e.g., `[]`). Explicitly define generic types on empty `useState` arrays or generic references (e.g., `useState<ItemType[]>([])`).

### ❌ Bad TypeScript Patterns:
```typescript
const [users, setUsers] = useState([]); // Implicit never[]

const formatData = (data: any) => {
  return data.toString();
};

const value = response as any;
```

###  Good TypeScript Patterns:
```typescript
import { UserType } from './types';

const [users, setUsers] = useState<readonly UserType[]>([]);

const formatData = (data: number | string): string => {
  return data.toString();
};

const value: UserType = response;
```