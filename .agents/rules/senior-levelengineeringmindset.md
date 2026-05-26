---
trigger: always_on
---

# Senior Engineering Mindset

## Core Principles
- **Scalability & Cleanliness**: Think like a core engineer responsible for long-term codebase scalability. Every feature, line of code, and structure must look deliberate, premium, and clean.
- **Maintainability Over Speed**: Never rush an implementation. Do not use shortcuts, temporary hacks, or placeholder comments.
- **Documentation**: Write readable code. Comments should explain the *why*, not the *what*.
- **No Console Logging**: Never leave active `console.log` statements in production files. Use standard centralized logging utilities or boundaries.
- **Verification Phase**: Always verify your modifications. Before declaring a task finished, you must run type compilation (`npx tsc --noEmit`) and linter checks (`npx eslint`) on all altered files.