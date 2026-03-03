# App Deployment & Hosting Guide

This guide outlines the steps to deploy the **NativeApp** for testing via **TestFlight** and for final **Production** on the App Store.

## 🏗️ Project Architecture
- **Framework**: React Native 0.83.0 (Bare Workflow)
- **Platforms**: iOS (Primary), Android (Secondary)
- **Build System**: Xcode (Native) & CocoaPods

---

## 📋 PRE-REQUISITES

Before starting the deployment process, ensures you have the following:

1.  **Apple Developer Program Enrollment**:
    -   You must be enrolled in the [Apple Developer Program](https://developer.apple.com/programs/) ($99/year).
    -   A **Paid Individual** or **Organization** account is required for App Store and TestFlight distribution.
2.  **Hardware & Software**:
    -   A Mac with the latest version of **macOS**.
    -   **Xcode** (Installed from the App Store).
3.  **App Store Connect Access**:
    -   Access to [App Store Connect](https://appstoreconnect.apple.com/) to manage the app record.

---

## 🛠️ STEP 1: PREPARING THE PROJECT

Before building the production IPA, verify these settings in any Xcode:

1.  **Bundle Identifier**:
    -   Ensure the Bundle ID (e.g., `com.nativeapp.details`) is unique and registered in the developer portal.
2.  **App Icons**:
    -   Replace placeholder icons in `ios/NativeApp/Images.xcassets/AppIcon.appiconset`.
3.  **Versioning**:
    -   **Version Number**: (e.g., `1.0.0`) The public-facing version.
    -   **Build Number**: (e.g., `1`) An internal integer that must increment for every build uploaded to TestFlight.

---

## ✈️ STEP 2: TESTFLIGHT (TESTING PROGRESS)

TestFlight is the best way to share updates with the client before a public release.

### Method A: Manual Archive (Recommended for First Time)
1.  Open `ios/NativeApp.xcworkspace` in Xcode.
2.  Select **Any iOS Device (arm64)** as the target.
3.  Go to **Product > Archive**.
4.  Once the archive is complete, the **Organizer** window will appear.
5.  Click **Distribute App** > **App Store Connect** > **Upload**.
6.  Once uploaded, go to [App Store Connect](https://appstoreconnect.apple.com/) > **My Apps** > **TestFlight**.
7.  Add the client's email to **Internal Testers**.

---

## 🚀 STEP 3: PRODUCTION DEPLOYMENT

Once the client approves the TestFlight build:

1.  **App Information**: Provide the App Name, Description, and Keywords in App Store Connect.
2.  **Screenshots**: Upload high-quality screenshots for various iPhone sizes.
3.  **Submit for Review**: 
    -   Select the approved build from the TestFlight list.
    -   Click **Submit for App Review**.
    -   Apple typically reviews apps within 24–48 hours.

---

## 🔄 STEP 4: AUTO-UPDATES (OTA)

To push minor updates (logic/style changes) without waiting for Apple's review, you can implement **CodePush**.

### Why CodePush?
-   **No App Store Review**: Fix small bugs or change text instantly.
-   **Seamless Experience**: Users receive the update silently while using the app.

### Implementation Path (Recommended):
We recommend integrating **Microsoft CodePush**:
1.  Install the `react-native-code-push` library.
2.  Wrap your main component in `App.tsx` with the CodePush HOC.
3.  Use the `appcenter-cli` to push updates directly from your terminal.

---

## 📢 INFORMING THE CLIENT

To share updates with the client:
1.  Invite them as an **Internal Tester** in TestFlight.
2.  They will receive an email from Apple.
3.  They must install the **TestFlight** app from the App Store on their iPhone.
4.  They can then download and open your app via the TestFlight link.

---

> [!TIP]
> **Pro Tip**: Use **Fastlane** to automate the build and upload process. It can handle screenshots, certificates, and beta deployment with a single command: `fastlane beta`.
