# My Accounts Manager (مدير حساباتي)

تطبيق موبايل احترافي لإدارة حسابات Google المتعددة محليًا وبأعلى معايير الأمان والتشفير.

## 🚀 تثبيت الاعتماديات وتشغيل المشروع

1. قم بتثبيت الحزم المطلوبة:
   ```bash
   npm install
   ```
2. تشغيل المشروع عبر Expo:
   ```bash
   npx expo start
   ```

## ⚙️ إعداد OAuth
* يتطلب ربط تسجيل الدخول الحقيقي بـ Google Cloud Console وتفعيل Google Sign-In وتضمين Client ID في ملفات الإعداد الخاصة بـ Android.

## 📦 بناء ملف APK
لتوليد ملف APK قابل للتثبيت على الأجهزة الذكية عبر EAS Build:
```bash
eas build -p android --profile preview
```