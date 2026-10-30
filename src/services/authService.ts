export const AuthService = {
  async signInWithGoogle(): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const clientId = ""; 
      if (!clientId) {
        return {
          success: false,
          error: "لم يتم تكوين بيانات Google Cloud OAuth في المشروع. يرجى إعداد بيانات الاعتماد الرسمية."
        };
      }
      return { success: true, data: { name: "مستخدم تجريبي", email: "user@gmail.com" } };
    } catch (error: any) {
      return { success: false, error: error.message || "فشل تسجيل الدخول" };
    }
  }
};