---
trigger: always_on
---

# Styling & Layout System Standards (NativeWind)

## Styling Directives
- **NativeWind First**: Always prefer NativeWind/Tailwind utility classes. className-based styling is your default mechanism.
- **No Direct Inline Style Objects**: Avoid writing `style={{ ... }}` objects inside JSX, unless you are performing active, frame-by-frame Reanimated values or dynamic math layouts.
- **StyleSheet Usage**: Use React Native's `StyleSheet.create` ONLY for:
  - Complex absolute tracking systems.
  - Native properties not mapped by Tailwind (e.g. shadow layers, elevation configurations).
  - Component animation configurations.

## Styling in `styles.ts`
- To maintain extremely clean, professional JSX, never write incredibly long class chains in your `Component.tsx`.
- Instead, define and organize style configurations inside `styles.ts` as clear objects.
- Order utility classes in this consistent sequence:
  `[Layout (flex, absolute, items-center)] -> [Dimensions (w, h)] -> [Spacing (p, m)] -> [Appearance (bg, border, rounded)] -> [Visuals (shadow, opacity)]`

### ❌ Bad Styling Pattern (Cluttered JSX):
```tsx
export const Card = () => {
  return (
    <View className="flex-1 w-full bg-white rounded-3xl p-6 border border-slate-100 flex-col items-center justify-center shadow-md">
      <Text className="text-2xl font-bold text-slate-800 text-center mb-2">Title</Text>
    </View>
  );
};
```

###  Good Styling Pattern (Structured `styles.ts`):
```typescript
// styles.ts
export const cardStyles = {
  container: 'flex-1 w-full flex-col items-center justify-center p-6 bg-white border border-slate-100 rounded-3xl shadow-md',
  title: 'text-2xl font-bold text-slate-800 text-center mb-2',
};
```
```tsx
// Card.tsx
import React from 'react';
import { View } from 'react-native';
import { Typography } from '../Typography';
import { cardStyles } from './styles';

export const Card: React.FC = () => {
  return (
    <View className={cardStyles.container}>
      <Typography variant="h2" className={cardStyles.title}>
        Title
      </Typography>
    </View>
  );
};
```