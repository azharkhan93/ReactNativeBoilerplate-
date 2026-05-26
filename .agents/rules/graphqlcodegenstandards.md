---
trigger: always_on
---

# GraphQL & Code Generation Standards

## Core Philosophy
- **Zero Manual GraphQL Typing**: Never manually construct response types or variables for GraphQL queries. Always run code generation (`yarn codegen`) and use the generated types and typed hooks.
- **Typed Hooks First**: Always prefer using the specific generated hooks (e.g., `useGetUserInfoQuery`, `useUpdateUserProfileMutation`) over the generic `useQuery` or `useMutation` hooks.
- **Query Location**: Place all GraphQL documents in the centralized `graphql/` structure or colocate them with the specific feature in a dedicated queries/mutations file.

## GraphQL Directory Structure
```
graphql/
  queries/      (Holds raw .graphql or gql-tagged query definitions)
  mutations/    (Holds raw .graphql or gql-tagged mutation definitions)
  fragments/    (Holds shared fragment documents)
  generated/    (Automatically generated types and React Apollo hooks)
```

## Apollo Hook Usage Patterns
- **Destructuring states**: Always destructure and handle `loading`, `error`, and `data` explicitly and robustly.
- **Clean Transformations**: Abstract API responses using memoized selector hooks or pure selectors before feeding data to the presentational layer.

### ❌ Bad GraphQL Pattern:
```tsx
import { useQuery } from '@apollo/client';
import { GET_USER_DATA } from './queries';

export const MyComponent = () => {
  // Unsafe manually-assigned query and no strong typing
  const { data, loading } = useQuery<any>(GET_USER_DATA);
  
  if (loading) return null;
  return <Text>{data?.user?.profile?.fullName}</Text>;
};
```

###  Good GraphQL Pattern:
```tsx
import React, { useMemo } from 'react';
import { useGetUserDataQuery } from '@/graphql/generated/operations';
import { Typography } from '@/components/theme';

export const MyComponent: React.FC = () => {
  const { data, loading, error } = useGetUserDataQuery();

  const formattedName = useMemo(() => {
    return data?.user?.profile?.fullName ?? 'Guest User';
  }, [data]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <Typography variant="body">
      {formattedName}
    </Typography>
  );
};
```