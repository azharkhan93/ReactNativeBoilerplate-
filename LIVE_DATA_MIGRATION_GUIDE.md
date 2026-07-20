# Live Data Migration & Component Architecture Guide

This document outlines recent architecture refactorings and provides a step-by-step implementation guide to transition all remaining mock-based features to live GraphQL backend endpoints.

---

## 1. Summary of Component Architecture Refactorings

All components and screens follow the strict **Advanced Folder Architecture**:

Every component lives in its own dedicated folder containing:
- `index.ts` — Barrel entrypoint exporting component & types.
- `Component.tsx` — Visual rendering layer (concise, under 200 lines).
- `styles.ts` — Centralized NativeWind utility classes & `StyleSheet.create` handles (zero inline style objects).
- `types.ts` — Strict TypeScript interfaces (`as const`, zero `any`).
- `constants.ts` — Immutably typed static configurations.
- `hooks.ts` — Custom state/lifecycle hooks (optimized without unnecessary `useEffect` / `useState` sync anti-patterns).
- `utils.ts` — Pure helper & validation functions (e.g. `validateBankForm`).

---

## 2. Current Backend Coverage Audit

### 🟢 Live Data (GraphQL API Connected)
- **Authentication & User Profile**: `screens/ProfileScreen/hooks/useProfile.ts`, `navigation/AppNavigator.tsx`, `hooks/useRegisterDeviceToken.ts`
- **Role Assignment**: `components/Onboarding/RoleSelectionStep/hooks/useRoles.ts`
- **Customer Profiles & Addresses**: `components/Customer/CustomerProfileForm/hooks/useCustomerProfile.ts`, `components/Customer/CustomerAddressDetails/hooks/useCustomerAddresses.ts`
- **Customer Payments**: `components/Customer/PaymentModal/hooks.ts` (Razorpay SDK + GraphQL queries/mutations)
- **Vendor Profiles & Services**: `components/Vendor/BusinessProfile/hooks/useBusinessProfile.ts`, `components/Vendor/ManageServices/hooks/useManageServices.ts`
- **Vendor Availability & Calendar**: `components/Vendor/Availability/hooks/useVendorAvailability.ts`, `components/Vendor/Calendar/hooks/useCalendarAvailability.ts`
- **Vendor Payout Bank Accounts**: `components/Vendor/BankAccountDetails/hooks/useBankAccountDetails.ts`
- **Vendor Details**: `screens/VendorDetailScreen/hooks/useVendorDetail.ts`, `components/Vendor/RecentlyAdded/hooks/useRecentlyAdded.ts`
- **Live Driver GPS Tracking**: `screens/LiveTrackingScreen/useLiveTracking.ts` (`GET_DRIVER_LOCATION` Query + WebSocket Subscription), `hooks/useDriverLocationPublisher.ts`

### 🟡 Mock Data Only (Requires Migration)
1. **Customer Bookings History** (`screens/CustomerBookingsScreen/CustomerBookingsScreen.tsx`)
2. **Nearby Providers Search & Map** (`screens/NearbyProvidersScreen/NearbyProvidersScreen.tsx`, `components/theme/ProviderMap/ProviderMap.tsx`)
3. **In-App Help & Support Chat** (`hooks/useSupportChat.ts`, `components/theme/Support/SupportChatView.tsx`)
4. **Vendor Analytics Dashboard** (`components/Vendor/VendorAnalyticsScreen/VendorAnalyticsScreen.tsx`)
5. **Vendor Earnings History** (`components/Vendor/VendorDashboard/components/EarningsCard/components/HistoryList/HistoryList.tsx`)

---

## 3. Step-by-Step Migration Guide to Live Data

Below are the exact GraphQL operation documents and hook modifications required to connect all remaining mock features to live backend API endpoints.

---

### Step 3.1: Connect Customer Bookings History to Live Data

#### 1. Define GraphQL Query in `graphql/queries/bookings.graphql`:
```graphql
query GetCustomerBookings($status: BookingStatus) {
  customerBookings(status: $status) {
    id
    bookingNumber
    status
    createdAt
    scheduledTime
    totalPrice
    service {
      id
      title
      price
    }
    vendor {
      id
      businessName
      avatarUrl
    }
  }
}
```

#### 2. Update `screens/CustomerBookingsScreen/hooks/useCustomerBookings.ts`:
```typescript
import { useQuery } from '@apollo/client/react';
import { GET_CUSTOMER_BOOKINGS } from '@/graphql/queries/bookings';

export const useCustomerBookings = (statusFilter?: string) => {
  const { data, loading, error, refetch } = useQuery(GET_CUSTOMER_BOOKINGS, {
    variables: { status: statusFilter },
    fetchPolicy: 'cache-and-network',
  });

  return {
    bookings: data?.customerBookings ?? [],
    loading,
    error,
    refetch,
  };
};
```

#### 3. Update `screens/CustomerBookingsScreen/CustomerBookingsScreen.tsx`:
Replace `import { MOCK_BOOKINGS } from '@/data/mockBookings'` with `useCustomerBookings()` hook.

---

### Step 3.2: Connect Nearby Providers Search & Map to Live Data

#### 1. Define Geo-Spatial Query in `graphql/queries/vendors.graphql`:
```graphql
query SearchNearbyVendors($latitude: Float!, $longitude: Float!, $radiusKm: Float, $categoryId: String) {
  nearbyVendors(latitude: $latitude, longitude: $longitude, radiusKm: $radiusKm, categoryId: $categoryId) {
    id
    businessName
    rating
    reviewCount
    distanceKm
    latitude
    longitude
    avatarUrl
    startingPrice
  }
}
```

#### 2. Create `screens/NearbyProvidersScreen/hooks/useNearbyVendors.ts`:
```typescript
import { useQuery } from '@apollo/client/react';
import { SEARCH_NEARBY_VENDORS } from '@/graphql/queries/vendors';

export const useNearbyVendors = (lat: number, lng: number, categoryId?: string | null) => {
  const { data, loading, refetch } = useQuery(SEARCH_NEARBY_VENDORS, {
    variables: { latitude: lat, longitude: lng, radiusKm: 10, categoryId },
    skip: !lat || !lng,
  });

  return {
    vendors: data?.nearbyVendors ?? [],
    loading,
    refetch,
  };
};
```

#### 3. Update `screens/NearbyProvidersScreen/NearbyProvidersScreen.tsx`:
Replace `MOCK_PROVIDERS` with `vendors` returned from `useNearbyVendors()`.

---

### Step 3.3: Connect Support Chat to Live Real-Time Data

#### 1. Define GraphQL Subscription in `graphql/subscriptions/support.graphql`:
```graphql
subscription OnSupportMessageReceived($ticketId: ID!) {
  supportMessageReceived(ticketId: $ticketId) {
    id
    sender
    text
    timestamp
  }
}
```

#### 2. Update `hooks/useSupportChat.ts`:
```typescript
import { useQuery, useMutation, useSubscription } from '@apollo/client/react';
import { GET_SUPPORT_MESSAGES, SEND_SUPPORT_MESSAGE } from '@/graphql/queries/support';
import { ON_SUPPORT_MESSAGE_RECEIVED } from '@/graphql/subscriptions/support';

export const useSupportChat = (ticketId: string) => {
  const { data, loading } = useQuery(GET_SUPPORT_MESSAGES, { variables: { ticketId } });
  const [sendMessage] = useMutation(SEND_SUPPORT_MESSAGE);

  useSubscription(ON_SUPPORT_MESSAGE_RECEIVED, {
    variables: { ticketId },
    onData: ({ client, data: subData }) => {
      // Append new incoming real-time message to Apollo Cache
    },
  });

  return { messages: data?.supportMessages ?? [], sendMessage, loading };
};
```

---

### Step 3.4: Connect Vendor Analytics & Earnings History to Live Data

#### 1. Define GraphQL Queries in `graphql/queries/vendorAnalytics.graphql`:
```graphql
query GetVendorAnalytics($period: String!) {
  vendorAnalytics(period: $period) {
    totalRevenue
    totalBookings
    completionRate
    chartBars {
      label
      value
    }
  }
}

query GetVendorEarningsHistory {
  vendorEarningsHistory {
    id
    bookingId
    amount
    status
    createdAt
  }
}
```

#### 2. Update `components/Vendor/VendorAnalyticsScreen/hooks/useVendorAnalytics.ts`:
Replace static import `analytics.data.ts` with `useQuery(GET_VENDOR_ANALYTICS)`.

#### 3. Update `components/Vendor/VendorDashboard/components/EarningsCard/hooks/useEarningsCard.ts`:
Replace `MOCK_PAYMENT_HISTORY` with `useQuery(GET_VENDOR_EARNINGS_HISTORY)`.

---

## 4. Verification Checklist

Run full type compilation check:
```bash
npx tsc --noEmit
```

Run linter check:
```bash
npx eslint .
```
