# Live Vehicle Tracking & Push Notification Documentation

This document explains the architecture, mechanics, and workflows of the **Live Tracking Screen** and the **FCM-aligned Push Notification** integration in the mobile app.

---

## 📂 Architecture Overview

The codebase strictly enforces the **Advanced Folder Architecture** guidelines, isolating concern boundaries for both the live tracking and notification modules.

```
/Users/azhar/Desktop/NativeApp/
├── components/
│   └── NotificationBanner/              # In-App slide-down notification banner
│       ├── index.ts                      # Entrypoint exporting component & types
│       ├── NotificationBanner.tsx        # UI Rendering & Reanimated animation logic
│       ├── styles.ts                     # NativeWind class definitions
│       └── types.ts                      # TypeScript payload interfaces
│
├── screens/
│   └── LiveTrackingScreen/               # Live tracking map module
│       ├── index.ts                      # Entrypoint exporting component & types
│       ├── LiveTrackingScreen.tsx        # Map rendering & screen UI
│       ├── hooks.ts                      # useTrackingNotifications journey monitor
│       ├── useLiveTracking.ts            # Query & Subscription GraphQL hook
│       ├── useTrackingSimulation.ts      # GraphQL mutation simulation driver
│       ├── styles.ts                     # NativeWind class definitions
│       └── types.ts                      # Screen interfaces
│
└── utils/
    ├── distanceHelper.ts                 # Haversine distance calculator
    └── notificationService.ts            # RxJS & FCM notification publisher
```

---

## ⚙️ Core Mechanics

### 1. Dynamic User Location & TopBar Truncation
- During onboarding, the customer sets their current position or manually enters an address. 
- The `LocationStep` geocodes and updates the root `userLocation` state (`{ address, coords }`) in `AppNavigator.tsx`.
- The address string is bound to the `TopBar` location display. The layout container assigns `flex-1`, and the Typography enforces `numberOfLines={1}` and `ellipsizeMode="tail"`. This guarantees that very long address text truncates cleanly with an ellipsis and never clips or pushes adjacent UI elements (like the user avatar).

### 2. Journey Start & Halfway Alert Logic
The journey monitoring hook `useTrackingNotifications` in [LiveTrackingScreen/hooks.ts](file:///Users/azhar/Desktop/NativeApp/screens/LiveTrackingScreen/hooks.ts) manages the alerts:
- **Baseline Calibration**: On initialization, the hook calculates the initial distance between the driver's starting location and the customer's coordinates ($D_{initial}$) using the **Haversine formula**.
- **Journey Start Notification**: Triggers an immediate in-app push notification:  
  `"[Vendor Name] is on the way to your location (within 5 minutes)"`
- **Midway Calculation**: Every 4 seconds, as coordinates update from the backend, the hook calculates the current distance ($D_{current}$). If $D_{current} \le 0.5 \times D_{initial}$, it triggers:  
  `"[Vendor Name] is halfway to your location"`

### 3. Haversine Distance Calculation
Implemented in [utils/distanceHelper.ts](file:///Users/azhar/Desktop/NativeApp/utils/distanceHelper.ts), this computes the great-circle distance between two points on a sphere:
```typescript
const R = 6371; // Earth's radius in km
const dLat = (lat2 - lat1) * (Math.PI / 180);
const dLon = (lon2 - lon1) * (Math.PI / 180);
const a =
  Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
const distance = R * c; // in kilometers
```

### 4. Push Notification Messaging Pipeline
Push notifications are handled through two layers, enabling foreground, background, and quit states:
- **RxJS Broadcast**: To decouple trigger conditions from the banner UI, we define a shared RxJS `Subject` (`notificationSubject`) in [utils/notificationService.ts](file:///Users/azhar/Desktop/NativeApp/utils/notificationService.ts). Invoking `showLocalNotification(title, body)` publishes a payload to the subject.
- **FCM Foreground Receiver**: `@react-native-firebase/messaging` listens for incoming push messages. When a foreground message arrives via `onMessage`, it forwards it directly to `showLocalNotification`.
- **FCM Background Receiver**: Registered in [index.js](file:///Users/azhar/Desktop/NativeApp/index.js) via `setBackgroundMessageHandler`, ensuring notifications log and display in system trays when the app is minimized or closed.
- **Animated Notification Banner**: Rendered in [App.tsx](file:///Users/azhar/Desktop/NativeApp/App.tsx), the banner subscribes to `notificationSubject`. On message delivery, it translates down from the top margin using a spring animation (`translateY.value = withSpring(insets.top + 10)`) and automatically retreats after 4 seconds.

---

## 🛜 GraphQL Backend Schema Integration

The tracking screen uses standard GraphQL endpoints configured on your NestJS backend:

### Queries
`GET_DRIVER_LOCATION` fetches the initial state:
```graphql
query GetDriverLocation($bookingId: ID!) {
  driverLocation(bookingId: $bookingId) {
    bookingId
    latitude
    longitude
    status
    eta
    updatedAt
  }
}
```

### Mutations
`UPDATE_DRIVER_LOCATION` is executed by the simulation loop (`useTrackingSimulation.ts`) to simulate movement:
```graphql
mutation UpdateDriverLocation($bookingId: ID!, $latitude: Float!, $longitude: Float!, $status: String!, $eta: Int!) {
  updateDriverLocation(bookingId: $bookingId, latitude: $latitude, longitude: $longitude, status: $status, eta: $eta) {
    bookingId
    latitude
    longitude
    status
    eta
  }
}
```

### Subscriptions
`DRIVER_LOCATION_UPDATED` listens over WebSockets to live broadcasts published by the backend server:
```graphql
subscription OnDriverLocationUpdated($bookingId: ID!) {
  driverLocationUpdated(bookingId: $bookingId) {
    bookingId
    latitude
    longitude
    status
    eta
    updatedAt
  }
}
```

---

## 📳 Push Notification Backend & Persistence

The backend stores device tokens and notification history in PostgreSQL and exposes GraphQL endpoints to manage user notifications.

### 1. Database Schema Models
- **`UserDeviceToken`**: Stores associations between `User` IDs, registered FCM tokens, and device types (`ios` | `android`). Enforces unique token records.
- **`Notification`**: Houses notification history for in-app feeds/inbox. Tracks fields like `title`, `body`, `isRead` status, and timestamps.

### 2. GraphQL Endpoints
- **`registerDeviceToken(input: RegisterDeviceTokenInput!)`**: Saves or updates the current device's FCM token, binding it to the authenticated user.
- **`getUserNotifications`**: Queries history of sent notifications for the logged-in user.
- **`markNotificationAsRead(id: ID!)`**: Marks a specific inbox notification as read.
- **`sendBookingNotification(bookingId: ID!, type: String!)`**: Triggers a push notification to the customer associated with the booking. `type` accepts `JOURNEY_START` and `JOURNEY_HALFWAY`.

### 3. Firebase Admin Integration & Mock Fallback
- The backend uses `firebase-admin` to communicate with FCM.
- **Local Dev Mock**: If `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY` are not set in the backend `.env` file, the server defaults to logging the notification payload to stdout. It still creates `Notification` DB history records for the user.

---

## 🧪 Testing Steps in the Emulator

1. **Start Backend**: Verify your local NestJS backend is running on `http://localhost:4000/graphql`.
2. **Reload App**: Hot-reload the React Native Metro bundler (press `R`).
3. **Set Onboarding Location**: Slide to the final Onboarding step, select **Customer**, and click **Use Current Location** (or type a test address). Complete onboarding.
4. **FCM Token Registration**: Verify in backend logs that the device registers its token: `[FCM] Token registered to backend successfully` (emulated client retrieves a mock FCM token in dev mode).
5. **Place a Booking**: Select a service provider, configure vehicle details, and press **Book Now**.
6. **Verify Start Journey**: The live tracking screen will mount. The client invokes the `sendBookingNotification` mutation. The banner slides down immediately with:  
   `"[Vendor Name] is on the way to your location (within 5 minutes)"`
7. **Verify Midway Alert**: Observe the vehicle marker move on the map. At exactly $50\%$ distance, the client invokes `sendBookingNotification` for `JOURNEY_HALFWAY`. The banner slides down again with:  
   `"[Vendor Name] is halfway to your location"`
8. **Verify Logs**: Confirm that the backend terminal displays:
   `[MOCK FCM PUSH] Token: "[Mock Token]" | Title: "[Vendor Name]" | Body: "[Message text]"`

