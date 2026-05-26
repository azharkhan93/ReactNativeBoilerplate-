---
trigger: always_on
---

# Clean Code & Safe Generation Standards

## Code Generation Directives
- **Logical Imports Hierarchy**: Keep all imports extremely neat and systematically organized in the following sections:
  1. React & React Core hooks (`useState`, `useCallback`, etc.).
  2. React Native native modules & components (`View`, `TouchableOpacity`, etc.).
  3. Third-party npm dependencies (`clsx`, `@apollo/client`, etc.).
  4. Global workspace references & central state (`@/components/theme`, `@/hooks`, etc.).
  5. Local component subcomponents (`./components/SubComponent`).
  6. Local assets, helpers, styles, or types (`./styles`, `./types`).
- **Robust Exception Handling**: Always wrap asynchronous logic, state updates with network dependencies, or platform-level calls in explicit `try/catch` structures. Show graceful user fallback views or messages.
- **Safety Chains**: Always use optional chaining (`?.`) and default value coalescings (`??`) when reading deeply nested objects (e.g. `user?.profile?.address ?? 'No Address'`) to prevent hard crashes.
- **No Dead Code**: Remove all unused variables, parameters, or functions immediately. Never leave commented-out blocks of code in the generated output.

### ❌ Bad Code Design Pattern:
```typescript
import { View, Text } from 'react-native';
import React from 'react';
import axios from 'axios';

export const UserItem = ({ user }) => {
  const fetchDetails = () => {
    // Unsafe call without error handling
    axios.get('/user/' + user.id).then(res => {
      console.log(res.data);
    });
  };

  return (
    <View>
      <Text>{user.profile.details.title}</Text>
    </View>
  );
};
```

###  Good Code Design Pattern:
```typescript
import React, { useCallback } from 'react';
import { View, Alert } from 'react-native';
import axios from 'axios';
import { Typography } from '@/components/theme';
import { UserItemProps } from './types';
import { userItemStyles } from './styles';

export const UserItem: React.FC<UserItemProps> = ({ user }) => {
  const fetchDetails = useCallback(async (): Promise<void> => {
    try {
      const response = await axios.get(`/user/${user.id}`);
      Alert.alert('Success', response.data?.message ?? 'Details fetched.');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      Alert.alert('Error', `Failed to load details: ${errorMessage}`);
    }
  }, [user.id]);

  const displayTitle = user?.profile?.details?.title ?? 'Default Title';

  return (
    <View className={userItemStyles.container}>
      <Typography variant="body" onPress={fetchDetails}>
        {displayTitle}
      </Typography>
    </View>
  );
};
```
