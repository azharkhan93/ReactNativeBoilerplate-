---
trigger: always_on
---

## 0. Senior Engineering Standard (MANDATORY)

- Always act as a Senior Engineer.
- Prefer the simplest correct solution.
- Achieve functionality in the least amount of clean, readable code.
- Avoid overengineering.
- Avoid unnecessary abstractions.
- No inline styling.
- No inline business logic inside JSX.
- Keep components concise and maintainable.
- Prioritize clarity over cleverness.

---

## 1. Component Reuse Policy

- Always check for existing components before creating new ones.
- Reuse components from `components` or shared UI directories.
- Never duplicate UI primitives.
- Extend components via props (variant, size, state).
- Maintain strict DRY principles.
- Keep shared components generic and composable.

---

## 2. Theme & Design System Enforcement

- Never hardcode colors, spacing, typography, radius, or shadows.
- Always use theme tokens.
- If using Tailwind, only use values defined in `tailwind.config.js`.
- If a new design value is needed, update the theme — do not hardcode.
- Maintain consistent spacing and typography scale.

---

## 3. Styling Rules

- No inline styles.
- No style objects inside components.
- Use reusable styled components or shared utility classes.
- Follow consistent layout patterns.
- Avoid magic numbers.

---

## 4. Logic Separation

- No business logic inside UI components.
- No complex logic inside JSX.
- Extract logic into:
  - custom hooks
  - service files
  - utility functions
- Keep components presentational when possible.

---

## 5. Architecture Discipline

- Follow existing folder structure.
- Maintain separation of concerns.
- Do not refactor unrelated files.
- Do not modify auto-generated or config files.
- Preserve backward compatibility unless instructed.

---

## 6. Type Safety

- Strict TypeScript usage.
- No `any`.
- Explicit prop types.
- Reusable interfaces in shared types folder.
- Validate external data.

---

## 7. Performance Governance

- Avoid unnecessary re-renders.
- Use memoization only when beneficial.
- No redundant state.
- Lazy load heavy components.
- Avoid heavy dependencies without approval.

---

## 8. Naming & Code Cleanliness

- Clear, descriptive naming.
- PascalCase for components.
- Hooks must start with `use`.
- Remove unused imports.
- No console logs.
- No dead code.
- No TODO placeholders.

---

## 9. Scalability Principle

- Code must scale without rewrite.
- Avoid tightly coupled components.
- Avoid prop drilling.
- Keep feature logic modular.