# Current Project Audit: Car Wash Service Marketplace

This document provides a comprehensive audit of the React Native codebase, detailing the architecture, feature set, and technical implementation as of April 2026.

## 1. Project Overview
The application is a dual-role marketplace (Customer & Service Provider) designed for booking car wash and detailing services. It uses a modern mobile stack focused on performance, styling flexibility, and type safety.

---

## 2. Architecture & Tech Stack
- **Framework**: React Native 0.83.0 (New Architecture ready).
- **Language**: TypeScript (Strict mode).
- **Styling**: NativeWind (Tailwind CSS for React Native) with custom theme tokens.
- **State Management**: 
  - **Apollo Client**: Configured for GraphQL integration.
  - **React Hooks**: Local state and business logic encapsulation.
- **Navigation**: Custom role-based navigation system in `AppNavigator.tsx`.
- **Infrastructure**: GraphQL Code Generator for type-safe API interactions.

---

## 3. Directory Structure & Logic Separation

### Core Modules
- `App.tsx`: Root entry point setting up Apollo, SafeArea, and Navigation.
- `navigation/`: Handles screen transitions and role-based access control (RBAC).
- `screens/`: High-level feature containers (Home, Profile, Tracking, Analytics).
- `components/`: Modular UI units categorized by feature or role.
- `theme/`: Design system primitives (Typography, Buttons, Cards).

### Logic & Data
- `hooks/`: Custom hooks for complex interactions (e.g., `useSupportChat`).
- `utils/`: Constants, API configurations, and helper functions.
- `data/`: Mock data layer used for feature demonstration and testing.

---

## 4. Feature Deep Dive

### A. Customer Flow
1. **Onboarding**: Multi-step process for role selection and location permissions.
2. **Discovery**: Home screen with categories (SUV, Sedan, etc.) and "Nearby Providers".
3. **Booking**: Service selection flow (partially integrated with mocks).
4. **Live Tracking**: Real-time map-based view for tracking service progress (Mocked in `TrackingMap.tsx`).
5. **Support System**: Intelligent chat interface with intent detection for cancellations, refunds, and tracking.
6. **Reviews & Disputes**: Feedback system for service quality.

### B. Provider (Vendor) Flow
1. **Dashboard**: High-level overview of earnings, active bookings, and quick actions.
2. **Booking Management**: Tabs for viewing Pending, Accepted, and Completed bookings.
3. **Availability Management**: Advanced calendar system for setting working hours and breaks.
4. **Analytics**: Vendor-specific performance metrics and earnings graphs.

---

## 5. UI Design System (`components/theme`)
The project follows a strict design system to ensure visual consistency:
- **Typography**: Responsive font scales with custom weights (Oxanium, Varta).
- **Components**: Reusable primitives like `Button`, `IconButton`, `FormInput`, and `Modal`.
- **Cards**: specialized cards for `ProviderCard`, `DriverCard`, and `BookingCard`.

---

## 6. Business Logic Details

### Support Chat (`hooks/useSupportChat.ts`)
Uses a local intent engine to handle user queries.
- **Keywords**: Matches strings like `cancel`, `track`, `refund`.
- **Actions**: Dynamic button generation within the chat (e.g., "Track Now" leads to the tracking screen).

### Navigation Logic (`navigation/AppNavigator.tsx`)
Implements role switching. When a user finishes onboarding as a `Provider`, the app context shifts to show the `VendorDashboard` and specific navigation tabs.

### Availability Logic (`components/Vendor/Availability`)
A complex module that handles time-slot generation and overlap prevention for service providers.

---

## 7. Current Implementation Status

| Feature | Status | Notes |
| :--- | :--- | :--- |
| **User Roles** | ✅ Complete | Dynamic UI based on Customer/Provider role. |
| **Authentication** | 🟡 Partial | UI for Phone Verification exists; Firebase/Auth provider placeholder. |
| **Maps/Tracking** | ✅ Complete | Integrated with `react-native-maps` using mock coordinates. |
| **Payments** | ❌ Pending | UI exists in Vendor stats; external gateway not integrated. |
| **Booking Flow** | ✅ Complete | End-to-end UI for customer selection to vendor acceptance. |

---

## 8. Audit Conclusion
The project is in a highly mature "Beta" state. The UI/UX is premium and fully functional with mock data. The architecture is ready for full API integration by swapping mock data in `utils/constants.ts` and `hooks` with Apollo Query/Mutation calls.
