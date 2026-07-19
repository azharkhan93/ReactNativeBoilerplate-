# Disk Space & Cache Maintenance Guide

Android C++ builds (using Ninja/CMake for modules like SVG and Reanimated) require significant free disk space. If builds fail with `No space left on device`, run the following commands to free up space.

---

## 1. Check Space
To see how much space is available on your main drive:
```bash
df -h /System/Volumes/Data
```

---

## 2. Clean Simulator Data (Safe & High Impact)
iOS simulators store huge amounts of logs, caches, and application data:
```bash
# Erase simulator logs/settings (Safe, resets them to factory default)
xcrun simctl erase all

# Delete old/unsupported simulator runtimes
xcrun simctl delete unavailable
```

---

## 3. Clear Gradle Caches
Old wrappers and caches build up over time:
```bash
# Safe to delete completely; Gradle will re-download only what's needed
rm -rf ~/.gradle/caches
rm -rf ~/.gradle/wrapper/dists
```

---

## 4. Clear Package Manager Caches
```bash
# Clean NPM cache
npm cache clean --force

# Clean Yarn cache (if used)
yarn cache clean

# Clean CocoaPods cache
pod cache clean --all
```

---

## 5. Local Project Clean
```bash
# Clean project build folders
cd android && ./gradlew clean
```
