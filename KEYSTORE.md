# Android Keystore & Recovery Guide

This document contains key details about the Android release keystore generated for the **Tab2Wash** project and how to restore it from backup.

---

## 🔑 Android Keystore Configuration

The release keystore is stored locally inside the project and is automatically configured via Gradle.

### Keystore Settings
* **Keystore Location**: `android/app/tab2wash-release-key.keystore` (Excluded from git via `.gitignore`)
* **Key Alias**: `tab2wash-key`
* **Store Password**: `tab2wash123`
* **Key Password**: `tab2wash123`
* **Algorithm**: RSA 2048-bit / SHA256withRSA
* **Validity**: ~27 years (Until December 4, 2053)

---

## 💾 Backups and Recovery

### Backup ZIP
A password-protected backup ZIP has been created containing the keystore file and `gradle.properties` configs:
* **Filename**: `tab2wash-keystore-BACKUP.zip`
* **Location**: Currently on your Desktop (`~/Desktop/tab2wash-keystore-BACKUP.zip`)

> [!CAUTION]
> Move this ZIP backup to a secure cloud folder (e.g., Google Drive, iCloud, or a Password Manager) immediately. Do not keep the only copy on this computer.

### How to Restore
If you migrate to a new machine or lose your keystore file:
1. Extract the backup ZIP file:
   ```bash
   unzip ~/Desktop/tab2wash-keystore-BACKUP.zip -d ~/Desktop/keystore-restore
   ```
2. Copy the keystore file back into your project directory:
   ```bash
   cp ~/Desktop/keystore-restore/Users/azhar/Desktop/tab2wash/android/app/tab2wash-release-key.keystore \
      /path/to/your/project/android/app/
   ```
3. Run a release build:
   ```bash
   cd android && ./gradlew assembleRelease
   ```
