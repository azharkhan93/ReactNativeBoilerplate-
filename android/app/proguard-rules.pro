# Add project specific ProGuard rules here.

# Google Maps SDK
-keep class com.google.android.gms.maps.** { *; }
-keep interface com.google.android.gms.maps.** { *; }
-dontwarn com.google.android.gms.maps.**

# Google Play Services
-keep class com.google.android.gms.common.** { *; }
-keep interface com.google.android.gms.common.** { *; }
-dontwarn com.google.android.gms.common.**

# react-native-maps
-keep class com.rnmaps.maps.** { *; }
-keep interface com.rnmaps.maps.** { *; }
-dontwarn com.rnmaps.maps.**

# Preserve annotations and signatures
-keepattributes *Annotation*,Signature,InnerClasses,EnclosingMethod
