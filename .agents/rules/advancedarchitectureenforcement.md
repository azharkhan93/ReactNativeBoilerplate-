---
trigger: always_on
---

# Advanced Folder Architecture Enforcement

## Folder Architecture

- Every React Native component must live in its own dedicated folder.
- Never place large components or deep sub-component JSX directly inside screen files.
- Every component folder MUST contain:
  - `index.ts` (Entrypoint exporting the component and its types)
  - `Component.tsx` (Component UI rendering)
  - `styles.ts` (NativeWind helper class names and style specifications)
  - `types.ts` (Strict TypeScript interfaces and type declarations)
  - `constants.ts` (For localized static data/configs, if needed)
  - `hooks.ts` (For component-specific state or lifecycle logic, if needed)
  - `utils.ts` (For component-specific helper functions, if needed)

### ❌ Bad Folder Structure:

```
components/
  MyCard.tsx (Single massive file with styles, interfaces, and subcomponents mixed)
```

### Good Folder Structure:

```
components/
  MyCard/
    index.ts
    MyCard.tsx
    styles.ts
    types.ts
```

## Subcomponents

- Subcomponents must always live inside a dedicated `components` directory inside the parent component folder.
- Never place subcomponents in the same file as the parent component unless it is extremely small (< 15 lines) and purely presentational.
- Prefer composition over deeply nested inline JSX structures.

### 📂 Directory Structure with Subcomponents:

```
FeatureCard/
  index.ts
  FeatureCard.tsx
  styles.ts
  types.ts
  components/
    FeatureIcon/
      index.ts
      FeatureIcon.tsx
      styles.ts
      types.ts
    FeatureTitle/
      index.ts
      FeatureTitle.tsx
      styles.ts
      types.ts
```
