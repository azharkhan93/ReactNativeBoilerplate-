---
trigger: always_on
---

# React Native Performance Standards

## Core Tenets
- **Re-render Prevention**: Minimize component re-renders. Always keep state local where possible, and lift state up ONLY when shared.
- **Memoization Rules**:
  - Use `useCallback` for all functions passed down as props to child components.
  - Use `useMemo` for heavy operations, derived arrays, filters, or formatting data.
  - Use `React.memo` for leaf components that receive stable props.

## FlatList Optimizations
- **Extracted Render Item**: Never write anonymous functions inside `renderItem`. Extract it to a separate, memoized component or top-level function.
- **Stable Key Extractor**: Always provide a stable, unique ID for `keyExtractor`. Never use array indices as keys.
- **Fixed Dimensions**: Use `getItemLayout` for lists with fixed-height rows to bypass dynamic layout calculations.

### ❌ Bad Performance Patterns:
```tsx
const MyList = ({ items }) => {
  return (
    <FlatList 
      data={items}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => console.log(item.id)}>
          <Text style={{ fontSize: 16 }}>{item.title}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};
```

###  Good Performance Patterns:
```tsx
import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from './components/ListItem';
import { ItemType } from './types';

export const MyList: React.FC<{ items: readonly ItemType[] }> = ({ items }) => {
  const handleItemPress = useCallback((id: string) => {
    console.log(id);
  }, []);

  const renderItem = useCallback(({ item }: { item: ItemType }) => (
    <ListItem item={item} onPress={handleItemPress} />
  ), [handleItemPress]);

  const keyExtractor = useCallback((item: ItemType) => item.id, []);

  return (
    <FlatList 
      data={items}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      maxToRenderPerBatch={10}
      windowSize={5}
    />
  );
};
```