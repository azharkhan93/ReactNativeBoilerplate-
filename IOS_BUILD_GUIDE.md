# 📱 Tab2wash iOS Build & TestFlight Deployment Guide

This guide explains how to build, increment versions, generate Hermes dSYMs, and submit future iOS builds to **TestFlight** / **App Store Connect** using both **Terminal commands** and **Xcode UI**.

---

## ⚡ Method 1: The 1-Command Automated Build (Fastest & Easiest)

Run a single command in your terminal from the project root directory:

```bash
npm run build:ios
```

### What this single command automatically does for you:
1. 🔢 **Increments Build Number**: Automatically bumps the build version (e.g. Build 4 → Build 5).
2. 📦 **Bundles JS & Assets**: Compiles JavaScript and packs all images into `ios/assets`.
3. 🏗️ **Archives Release Build**: Runs `xcodebuild archive` in Release mode.
4. 🛠️ **Attaches Hermes dSYM**: Generates and attaches the exact matching Hermes debug symbols.
5. 📂 **Opens Xcode Organizer**: Directly opens the new archive in Xcode Organizer on your screen ready for 1-click upload!

---

## 🎨 Method 2: How to Build & Archive Manually directly in Xcode UI (GUI Step-by-Step)

If you prefer using Xcode visually instead of terminal commands:

### Step 1: Open the Project Workspace
Open **`ios/Tab2wash.xcworkspace`** in Xcode (or run `open ios/Tab2wash.xcworkspace` in terminal).

### Step 2: Manually Increment Build Number in Xcode
1. In the left Xcode sidebar, click the top blue project root item **`Tab2wash`**.
2. Under **TARGETS**, select **`Tab2wash`**.
3. Select the **General** tab at the top.
4. Under the **Identity** section:
   - **Version**: `1.0` (or your marketing version)
   - **Build**: Change to the next number (e.g. `5`, `6`, `7`).

### Step 3: Bundle JavaScript Code & Image Assets
Before archiving in Xcode UI, run this command in terminal to update the JS bundle and image assets:
```bash
npx react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios/assets
```

### Step 4: Select Destination Target in Xcode
At the top-left Xcode bar (next to the Play ▶️ / Stop ⏹️ buttons):
1. Click the destination device dropdown next to **Tab2wash >**.
2. Select **`Any iOS Device (arm64)`** as the destination.

### Step 5: Verify Signing Settings in Xcode
1. Click **Signing & Capabilities** tab.
2. Under **Signing (Release)**:
   - **Automatically manage signing**: Unchecked (Manual).
   - **Provisioning Profile**: Select **`Tab2wash AppStore`**.
   - **Team**: **`FARMHEALTH TECH PRIVATE LIMITED`**.

### Step 6: Create Archive
1. Click the top macOS menu: **Product → Archive**.
2. Xcode will compile all 104 native CocoaPods dependencies and display a progress bar.
3. When complete, the **Xcode Organizer** window will pop up automatically with your new archive!

---

## 🛠️ Method 3: Step-by-Step Manual Terminal Commands

If you prefer running individual commands in terminal:

### Step 1: Increment Build Number
```bash
cd ios
xcrun agvtool next-version -all
cd ..
```

### Step 2: Bundle JavaScript & Image Assets
```bash
npx react-native bundle \
  --entry-file index.js \
  --platform ios \
  --dev false \
  --bundle-output ios/main.jsbundle \
  --assets-dest ios/assets
```

### Step 3: Compile Xcode Release Archive
```bash
xcodebuild \
  -workspace ios/Tab2wash.xcworkspace \
  -scheme Tab2wash \
  -configuration Release \
  -destination 'generic/platform=iOS' \
  archive \
  -archivePath build/Tab2wash.xcarchive \
  SKIP_BUNDLING=1
```

### Step 4: Inject Hermes dSYM
```bash
dsymutil $(find ~/Library/Developer/Xcode/DerivedData -name "hermesvm.framework" 2>/dev/null | grep Release-iphoneos | head -n 1)/hermesvm -o build/Tab2wash.xcarchive/dSYMs/hermesvm.framework.dSYM
```

### Step 5: Open Archive in Xcode Organizer
```bash
open build/Tab2wash.xcarchive
```

---

## 🚀 Step 7: Upload to TestFlight (Xcode Organizer UI)

Once the archive opens in Xcode Organizer:

1. Select your newest **Tab2wash** archive build.
2. Click the blue **Distribute App** button on the right panel.
3. Select **App Store Connect** (or **TestFlight Internal Only**).
4. Click **Distribute** / **Upload**.
5. Xcode will sign and upload the build directly to Apple.

---

## 👥 Step 8: Invite Testers in App Store Connect

Once uploaded (takes 5-10 minutes for Apple to process):

1. Go to **[appstoreconnect.apple.com](https://appstoreconnect.apple.com)** → **My Apps** → **Tab2wash** → **TestFlight** tab.
2. In the left sidebar under **Builds**, click **iOS**.
3. Click on your new build version (e.g. `1.0 (5)`).
4. Under **Groups**, click **`+`** → Select **`Tab2wash Testers`** → Click **Save**.
5. All your registered testers will instantly receive the TestFlight notification & email to install on their iPhones!

---

## 🔒 Configuration Summary Reference

| Setting | Value / Location |
| :--- | :--- |
| **Bundle Identifier** | `com.tab2wash.app` |
| **Team ID** | `B8KX25672R` (*FARMHEALTH TECH PRIVATE LIMITED*) |
| **Signing Certificate** | `Apple Distribution` |
| **Provisioning Profile** | `Tab2wash AppStore` |
| **Encryption Compliance** | `<key>ITSAppUsesNonExemptEncryption</key><false/>` in `Info.plist` |
| **User Script Sandboxing** | `ENABLE_USER_SCRIPT_SANDBOXING = NO` in `project.pbxproj` |
