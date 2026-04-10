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

This guide outlines the steps to deploy the **NativeApp** for testing via **TestFlight** and for final **Production** on the App Store.

### 📋 Pre-requisites
Before starting the deployment process, ensure you have the following:
1.  **Apple Developer Program Enrollment** ($99/year).
2.  **Hardware**: A Mac with the latest version of macOS and Xcode.
3.  **Access**: App Store Connect access to manage the app record.

### 🛠️ Step 1: Preparing the Project
- Verify **Bundle Identifier** in Xcode.
- Ensure **App Icons** are correctly placed in `xcassets`.
- Check **Version Number** (e.g., `1.0.0`) and **Build Number**.

### ✈️ Step 2: TestFlight (Client Testing)
1.  Set target to **Any iOS Device**.
2.  **Product > Archive**.
3.  Distribute to **App Store Connect**.
4.  Add testers in the **TestFlight** tab of App Store Connect.

### 🚀 Step 3: Production Release
Once the client approves:
1.  Complete the app metadata in App Store Connect.
2.  Upload screenshots for all iPhone sizes.
3.  **Submit for Review**.

---

## 📢 For the Development Team
For a deep dive into the code logic, component structure, and business rules, please refer to the [Current Project Audit](CURRENT_PROJECT_AUDIT.md).

For the project's strategic direction and upcoming features, refer to the [Future Upgrades Roadmap](FUTURE_UPGRADES_ROADMAP.md).

---

> [!TIP]
> **Pro Tip**: To keep the app fresh without full App Store releases, consider implementing **Microsoft CodePush** for over-the-air updates to logic and styling.
