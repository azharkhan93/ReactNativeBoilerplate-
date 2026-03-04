# 🚀 App Deployment & Client Demo Guide

This document provides step-by-step instructions on how to share your app with clients for testing and demos, ranging from high-speed one-off links to official App Store distribution.

---

## 🕹️ High-Speed Demo Alternatives (No App Store Required)

If you need to show the client progress quickly without waiting for TestFlight's internal review, use these options.

### 1. Appetize.io (Best for Browser-Based Demos)

**Goal**: Allow the client to use the app directly in their web browser (no installation needed).

1.  **Generate the Build**:
    - Run `npx react-native bundle --platform ios --dev false --entry-file index.js --bundle-output ios/main.jsbundle --assets-dest ios`.
    - In Xcode, build the app for a **Simulator** (e.g., iPhone 15).
    - Find the `.app` file in your `DerivedData` folder.
    - Zip the `.app` folder.
2.  **Upload**:
    - Go to [Appetize.io](https://appetize.io/upload).
    - Upload your ZIP file.
3.  **Share**:
    - Send the generated URL to the client. They can play with the app instantly in their browser.

### 2. Diawi / InstallOnAir (Best for Physical Device Testing)

**Goal**: Send a link that the client opens on their iPhone to install the app.

1.  **Generate the IPA**:
    - In Xcode, select **Any iOS Device (arm64)**.
    - Go to **Product > Archive**.
    - In the Organizer, click **Distribute App > Ad Hoc or Development**.
    - Export the `.ipa` file.
2.  **Upload**:
    - Go to [Diawi.com](https://www.diawi.com/) or [InstallOnAir.com](https://www.installonair.com/).
    - Drag and drop your `.ipa` file.
3.  **Share**:
    - Send the generated link or QR code to the client. They open it on their iPhone and tap "Install".

### 3. Firebase App Distribution

**Goal**: A professional, cross-platform testing hub.

1.  **Setup**:
    - Enable "App Distribution" in your [Firebase Console](https://console.firebase.google.com/).
2.  **Upload**:
    - Upload your `.ipa` (iOS) or `.apk` (Android) to the Firebase dashboard.
3.  **Share**:
    - Invite the client by email. They will receive instructions to install the app.

---

## ✈️ Official Testing (TestFlight)

1.  **Prepare**:
    - Ensure your **Bundle Identifier** and **Signing & Capabilities** are correctly set in Xcode.
    - Increment the **Build Number** in project settings.
2.  **Upload**:
    - Go to **Product > Archive**.
    - Click **Distribute App > App Store Connect > Upload**.
3.  **Distribute**:
    - Go to [App Store Connect](https://appstoreconnect.apple.com/).
    - Go to **My Apps > TestFlight**.
    - Add the client's email to **Internal Testers**.
    - They must install the **TestFlight** app from the App Store to download your app.

---

## 📺 Personal Demo (Screen Share)

If you just want to walk the client through a feature:

1.  Run the app on your local **iOS Simulator** or **Android Emulator**.
2.  Start a video call (Zoom, Microsoft Teams, Slack, or Google Meet).
3.  **Share your screen** and interact with the app while explaining the features.

---

## 🏗️ Summary Table

| Method           | Speed      | Experience   | Best For                       |
| :--------------- | :--------- | :----------- | :----------------------------- |
| **Appetize.io**  | ⚡ Fast    | Web Browser  | Quick demos, no install.       |
| **Diawi**        | ⚡ Fast    | Physical App | Real device feel, no overhead. |
| **Firebase**     | ✅ Steady  | Physical App | Organized beta testing.        |
| **TestFlight**   | 🐢 Slower  | Physical App | Final polish before launch.    |
| **Screen Share** | ⚡ Instant | Video Feed   | Walkthroughs and Q&A.          |
