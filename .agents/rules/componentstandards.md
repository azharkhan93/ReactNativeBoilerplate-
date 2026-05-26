---
trigger: always_on
---

# React Component Development Standards

## Core Conventions

- **Arrow Functions**: Use arrow functions explicitly for all React components.
- **Named Exports**: Always use named exports (`export const MyComponent: React.FC<Props> = ...`). Avoid default exports unless specifically demanded by routing or third-party frameworks.
- **Single Responsibility**: Every component must have exactly one reason to change. Decouple styling configs, state transformations, and UI layout.
- **Size Limit**: Keep components small and focused. Avoid components exceeding 200-250 lines of code. If it exceeds 250 lines, it MUST be refactored into subcomponents.

## Separating Concerns & Pure Rendering

- **Business Logic Extraction**: Move complex business/data fetching logic into custom hooks (`hooks.ts`) or services. Keep the render file (`Component.tsx`) highly visual.
- **Conditional Layouts**: Avoid conditional chaos inside JSX. Instead of giant inline ternaries, extract complex sub-layouts into small presentational subcomponents or helper render methods defined outside JSX.
- **Callbacks**: Avoid inline render callbacks inside JSX collections (`map`). Always extract list items into a memoized subcomponent.

### ❌ Bad JSX Rendering Pattern:

```tsx
export default function UserList({ items }) {
  return (
    <View>
      {items.map(item => (
        <TouchableOpacity
          onPress={() => {
            console.log(item.id);
            doSomethingElse();
          }}
        >
          <Text>{item.name}</Text>
          {item.isAdmin && (
            <View>
              <Text>Admin Label</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}
```

### Good JSX Rendering Pattern:

```tsx
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { UserItem } from './components/UserItem';
import { UserListProps } from './types';

export const UserList: React.FC<UserListProps> = ({ items, onUserPress }) => {
  const handlePress = useCallback(
    (id: string) => {
      onUserPress(id);
    },
    [onUserPress],
  );

  return (
    <View className="flex-1 p-4">
      {items.map(item => (
        <UserItem key={item.id} item={item} onPress={handlePress} />
      ))}
    </View>
  );
};
```
