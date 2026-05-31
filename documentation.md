# Project Documentation: NativeApp (Car Wash Marketplace)

Welcome to the central documentation hub for the **NativeApp** project. This document serves as the entry point for understanding the platform's architecture, current status, deployment procedures, and future roadmap.

---

## 📖 Table of Contents
1.  [Current Project Audit](CURRENT_PROJECT_AUDIT.md) - Technical breakdown of the current codebase.
2.  [Future Upgrades & Roadmap](FUTURE_UPGRADES_ROADMAP.md) - Plan for scaling and new features.
3.  [Deployment & Hosting Guide](#-deployment--hosting-guide) - Instructions for testing and production release.
4.  [Architecture Overview](#🏗️-project-architecture) - Core tech stack.

---

## 🏗️ Project Architecture
- **Core Framework**: React Native 0.83.0 (Bare Workflow)
- **Programming Language**: TypeScript
- **Styling Engine**: NativeWind (Tailwind CSS)
- **State Management**: Apollo Client (GraphQL)
- **Key Libraries**:
  - `react-native-reanimated` (Fluid animations)
  - `react-native-maps` (Provider discovery & tracking)
  - `lucide-react-native` (Consistent iconography)

---

## 🚀 Deployment & Hosting Guide

This guide outlines the steps to build and deploy the **NativeApp** for testing (iOS TestFlight & Android APK) and production release.

### 📋 Pre-requisites
Before starting the deployment process, ensure you have the following:
1.  **Apple Developer Program Enrollment** ($99/year) for iOS.
2.  **Android SDK & Build Tools** installed for Android.
3.  **Hardware**: A Mac with the latest version of macOS and Xcode (required for iOS archiving).
4.  **Access**: Developer console permissions for target app stores.

---

### 🤖 Android: Generating a Testing APK
For quick client and QA testing on Android devices, you can generate a direct installable `.apk` file.

#### 🔑 Signing Setup
Because we are building a **debug** APK for quick testing, it automatically signs itself with the default local `debug.keystore` out-of-the-box:
* No custom production keystore generation is required.
* The build is instantly installable on any Android testing device.

#### 🛠️ Build Commands
Run the following commands from the root of your project:

1. **Navigate to the Android folder & clean previous builds:**
   ```bash
   cd android && ./gradlew clean
   ```
2. **Build the debug/testing APK:**
   ```bash
   ./gradlew assembleDebug
   ```
3. **Locate the APK:**
   Once completed, your installable APK will be generated at:
   `android/app/build/outputs/apk/debug/app-debug.apk`

#### 📲 How to Install & Test (Over-The-Air via InstallOnAir)
The most convenient way for the client to install the pre-prod build is through **InstallOnAir** (an OTA distribution service):

1. **Upload the APK:**
   * Go to [InstallOnAir](https://www.installonair.com/).
   * Upload the compiled `app-debug.apk` file (`android/app/build/outputs/apk/debug/app-debug.apk`).
2. **Share the QR Code / Link:**
   * Once uploaded, the website will generate a private installation link and a QR code.
   * Share this link or the QR code with the client.
3. **Install on the Device:**
   * The client scans the QR code or opens the link on their Android device.
   * Tap the **Install** button to download and install the app instantly over the air!
   * *Note: If prompted by the device browser (e.g., Chrome) to allow installing apps from unknown sources, the user should enable it to complete the installation.*

---

### 🍎 iOS: TestFlight (Client Testing)
1. Set target to **Any iOS Device** in Xcode.
2. **Product > Archive**.
3. Distribute to **App Store Connect**.
4. Add testers in the **TestFlight** tab of App Store Connect.

---

### 🚀 Production Release
Once the client approves:
1. **For iOS**: Complete the metadata in App Store Connect, upload screenshots for all iPhone sizes, and **Submit for Review**.
2. **For Android**: Generate a secure production keystore, update the signing configuration in `build.gradle`, compile using `./gradlew bundleRelease` (generating an `.aab` file), and upload it to the Google Play Console for store review.

---

## 📢 For the Development Team
For a deep dive into the code logic, component structure, and business rules, please refer to the [Current Project Audit](CURRENT_PROJECT_AUDIT.md).

For the project's strategic direction and upcoming features, refer to the [Future Upgrades Roadmap](FUTURE_UPGRADES_ROADMAP.md).

---

> [!TIP]
> **Pro Tip**: To keep the app fresh without full App Store releases, consider implementing **Microsoft CodePush** for over-the-air updates to logic and styling.
