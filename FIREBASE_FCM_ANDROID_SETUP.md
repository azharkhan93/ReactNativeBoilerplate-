# Firebase Cloud Messaging (FCM) Integration Guide for Android

This guide details the complete step-by-step setup to integrate Firebase Cloud Messaging (FCM) for push notifications in the Android app.

---

## Step 1: Install NPM Dependencies

Run the following command in the root directory of your project to install the required React Native Firebase packages:

```bash
yarn add @react-native-firebase/app @react-native-firebase/messaging
```

---

## Step 2: Configure Firebase Console

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new Firebase project (or select an existing one).
3. Click on the **Android icon** to add a new Android application.
4. Enter the Android Package Name (must match your `applicationId` in `android/app/build.gradle`):
   ```
   com.nativeapp
   ```
5. (Optional) Provide the SHA-1 fingerprint of your signing certificate. You can generate this by running:
   ```bash
   cd android && ./gradlew signingReport
   ```
6. Download the `google-services.json` file.
7. Move `google-services.json` to the following directory in your project:
   ```
   android/app/google-services.json
   ```

---

## Step 3: Configure Android Native Files

### 1. Project-level Gradle (`android/build.gradle`)

Open `android/build.gradle` and add the Google Services dependency inside the `buildscript.dependencies` block:

```gradle
buildscript {
    ext {
        buildToolsVersion = "36.0.0"
        minSdkVersion = 24
        compileSdkVersion = 36
        targetSdkVersion = 36
        ndkVersion = "27.1.12297006"
        kotlinVersion = "2.1.20"
        googlePlayServicesVersion = "21.3.0"
        playServicesLocationVersion = "21.3.0"
    }

    repositories {
        google()
        mavenCentral()
    }

    dependencies {
        classpath("com.android.tools.build:gradle:8.3.2")
        classpath("com.facebook.react:react-native-gradle-plugin")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlinVersion")
        
        // Add this line for Google Services
        classpath("com.google.gms:google-services:4.4.2")
    }
}
```

### 2. App-level Gradle (`android/app/build.gradle`)

Open `android/app/build.gradle` and uncomment/apply the Google Services plugin:

```gradle
apply plugin: "com.android.application"
apply plugin: "org.jetbrains.kotlin.android"
apply plugin: "com.facebook.react"

// Uncomment/add this line at the top
apply plugin: "com.google.gms.google-services"
```

Also, scroll down to the bottom to the `dependencies` block and ensure Firebase native dependencies are uncommented (optional since React Native Firebase autolinks, but recommended for BOM/compatibility management):

```gradle
dependencies {
    implementation("com.facebook.react:react-android")

    if (hermesEnabled.toBoolean()) {
        implementation("com.facebook.react:hermes-android")
    } else {
        implementation jscFlavor
    }

    // Uncomment/add these lines to manage Firebase BoM and messaging natively:
    implementation(platform("com.google.firebase:firebase-bom:34.0.0"))
    implementation("com.google.firebase:firebase-messaging")
    implementation("com.google.firebase:firebase-analytics")
}
```

---

## Step 4: Add Post-Notifications Permission (`android/app/src/main/AndroidManifest.xml`)

For Android 13+ (API level 33), applications must explicitly request permission for sending notifications.

Add the `<uses-permission>` tag inside `android/app/src/main/AndroidManifest.xml`:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    
    <!-- Add this permission for Android 13+ push notifications -->
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />

    <application ...>
        ...
    </application>
</manifest>
```

---

## Step 5: Initialize FCM in Application Code (`App.tsx`)

Hook up the pre-configured [notificationService.ts](file:///Users/azhar/Desktop/NativeApp/utils/notificationService.ts) inside your main `App.tsx` file to handle FCM registration, token retrieval, and listening to foreground messages.

```tsx
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from '@/utils/apolloClient';
import { AppNavigator } from '@/navigation/AppNavigator';
import { KeyboardDismissView } from '@/components/theme';
import { AnimatedSplashScreen } from '@/components/shared/AnimatedSplashScreen';

// Import FCM helpers from your utility service
import { getFCMToken, listenToForegroundNotifications } from '@/utils/notificationService';

export default function App() {
  const [splashFinished, setSplashFinished] = useState(false);

  useEffect(() => {
    // 1. Get FCM device token on mount
    const setupFCM = async () => {
      const token = await getFCMToken();
      if (token) {
        // Send this token to your backend/GraphQL server to register the device
        console.log('[App] Successfully registered FCM Token:', token);
      }
    };
    setupFCM();

    // 2. Set up listener for foreground notifications
    const unsubscribe = listenToForegroundNotifications();

    return () => {
      // Clean up foreground listener on unmount
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" />
        <KeyboardDismissView>
          {!splashFinished ? (
            <AnimatedSplashScreen onFinish={() => setSplashFinished(true)} />
          ) : (
            <AppNavigator />
          )}
        </KeyboardDismissView>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}
```

---

## Step 6: Testing Push Notifications

Once setup is complete and the app compiles successfully:

1. **Rebuild the Android App**:
   Run the build command to compile the new native dependency and link configurations:
   ```bash
   yarn android
   ```
2. **Retrieve the FCM Device Token**:
   Start your Metro packager and check your terminal logs or Logcat for the FCM token:
   `[FCM] Device Token: dX...8A`
3. **Send a Test Notification**:
   - Go to the **Firebase Console** -> **Cloud Messaging** (under Engage).
   - Click **Create your first campaign** -> **Firebase Notification messages**.
   - Enter a title and body text.
   - Click **Send test message**, paste your FCM Device Token, and click **Test**.
   - If the app is in the background, you'll see a standard notification banner. If it's in the foreground, you'll see a foreground notification log.
