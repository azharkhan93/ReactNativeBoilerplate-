# Android Production Deployment Plan

This document outlines the step-by-step execution plan for making the Android app production-ready, covering everything from managing the build versions to releasing the app on the Google Play Store.

## 1. Versioning & Auto-Increment Setup

Currently, the app's `android/app/build.gradle` has hardcoded values:
- `versionCode 1`
- `versionName "1.0"`

**Goal**: Start the version name at `0.01` and automatically increment the `versionCode` for each build.

### Implementation Steps (Pure Gradle Approach)
1. Create a `version.properties` file in the `android/app` directory to store the current version data:
   ```properties
   VERSION_CODE=1
   VERSION_NAME=0.01
   ```
2. Update `android/app/build.gradle` to read and automatically increment the `VERSION_CODE` during every release build. We will define a custom Gradle logic to increment the version code, write it back to the `version.properties` file, and assign the updated values to `defaultConfig`.

## 2. Generating the Release Keystore

The current `release` configuration uses the `debug` keystore, which Google Play Store will reject. We need to generate a secure production keystore.

### Execution
1. Run the `keytool` command in the terminal to generate the release key:
   ```bash
   keytool -genkey -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```
   > [!IMPORTANT]
   > **Why are these flags strictly required?**
   > - **`-validity 10000`**: By default, `keytool` creates certificates valid for only 90 days. Google Play explicitly requires that your signing certificate be valid for at least **25 years**. Omitting this means your certificate will expire, permanently revoking your ability to update the app on the Play Store. 10000 days is roughly 27 years.
   > - **`-keyalg RSA` and `-keysize 2048`**: These are the minimum cryptographic security requirements mandated by the Google Play Store for App Signing.
2. Move the `my-release-key.keystore` file to `android/app/`.
3. **Important**: Store the Keystore password securely (e.g., inside `~/.gradle/gradle.properties` on your local machine, NOT committed to the git repo). Keep a backup of the `.keystore` file. If you lose it, you cannot update the app on the Play Store.

## 3. Updating the Build Configuration

Update `android/app/build.gradle` to use the release keystore.

1. Modify `signingConfigs` to read properties from your local `~/.gradle/gradle.properties`:
   ```groovy
   signingConfigs {
       release {
           if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
               storeFile file(MYAPP_UPLOAD_STORE_FILE)
               storePassword MYAPP_UPLOAD_STORE_PASSWORD
               keyAlias MYAPP_UPLOAD_KEY_ALIAS
               keyPassword MYAPP_UPLOAD_KEY_PASSWORD
           }
       }
   }
   ```
2. Link the `release` build type to this configuration:
   ```groovy
   buildTypes {
       release {
           signingConfig signingConfigs.release
           minifyEnabled enableProguardInReleaseBuilds
           proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
       }
   }
   ```
3. Update `android/gradle.properties` prior to building to ensure the correct architectures are compiled (e.g., adjust `reactNativeArchitectures` to include `arm64-v8a,armeabi-v7a`).

## 4. Building the Production App Bundle (AAB)

Google Play Store requires Android App Bundles (.aab) instead of APKs for new submissions.

1. Navigate to the `android/` directory: `cd android`
2. Run the build command:
   ```bash
   ./gradlew bundleRelease
   ```
3. The generated file will be located at `android/app/build/outputs/bundle/release/app-release.aab`.

## 5. Google Play Console Setup & Testing Tracks

Once the AAB is built, the Play Store rollout process begins.

### Step 5.1: App Creation & Setup
1. Create a developer account on Google Play Console.
2. Create the application and fill out all mandatory store listing details (title, description, icons, screenshots, privacy policy link).
3. Complete the app content questionnaires (target audience, ads, data safety, news app status, etc.).

### Step 5.2: Internal Testing (First Milestone)
1. Go to **Testing > Internal Testing**.
2. Create a new release and upload your `app-release.aab`.
3. Add testers' email addresses (they must be the emails associated with their Google Play accounts).
4. Testers will receive an opt-in link. They can download the app via the Play Store immediately.

### Step 5.3: Closed Testing (Beta)
1. Once internal testing is stable, move to **Closed Testing**.
2. Similar to internal testing, upload your AAB (or promote the Internal release).
3. You can invite a larger group of testers via email lists or Google Groups.
4. *Note for New Personal Developers*: Google Play requires new personal developer accounts to run a closed test with 20 testers for 14 continuous days before allowing production access.

### Step 5.4: Production Rollout
1. Promote the Closed Testing release to **Production**.
2. Submit the release for review.
3. Once approved by Google (can take 1-7 days depending on the app), the app will be live and searchable on the Play Store.

## 6. Automating the Auto-Increment via Gradle

Since we are using a pure Gradle approach, we will implement the auto-increment logic directly inside `android/app/build.gradle`.

1. **Read `version.properties`**:
   Add a block at the top of `build.gradle` to load the properties file.

2. **Create the Increment Task**:
   Add a Gradle task that increments `VERSION_CODE` by 1 and rewrites the `version.properties` file.

3. **Hook into the Build Process**:
   Ensure the increment logic runs automatically when generating a release build.

4. **Example Gradle Script snippet**:
   ```groovy
   def versionPropsFile = file('version.properties')
   def versionProps = new Properties()

   if (versionPropsFile.canRead()) {
       versionProps.load(new FileInputStream(versionPropsFile))
   } else {
       versionProps['VERSION_CODE'] = '1'
       versionProps['VERSION_NAME'] = '0.01'
   }

   task incrementVersion {
       doLast {
           def code = versionProps['VERSION_CODE'].toInteger() + 1
           versionProps['VERSION_CODE'] = code.toString()
           versionProps.store(versionPropsFile.newWriter(), null)
       }
   }

   // Hook the task into the release build
   tasks.whenTaskAdded { task ->
       if (task.name == 'bundleRelease' || task.name == 'assembleRelease') {
           task.dependsOn incrementVersion
       }
   }
   ```
   *Note: This ensures your build pipeline manages the version code dynamically without relying on external CI/CD tools like Fastlane.*
