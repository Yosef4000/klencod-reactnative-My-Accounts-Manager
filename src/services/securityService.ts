import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';
import * as Crypto from 'expo-crypto';

export const SecurityService = {
  async savePin(pin: string): Promise<void> {
    const hashedPin = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      pin
    );
    await SecureStore.setItemAsync('user_pin', hashedPin);
  },

  async verifyPin(pin: string): Promise<boolean> {
    const storedHash = await SecureStore.getItemAsync('user_pin');
    if (!storedHash) return false;
    const hashedInput = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      pin
    );
    return storedHash === hashedInput;
  },

  async authenticateBiometric(): Promise<boolean> {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) return false;
    
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) return false;

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'مصادقة مطلوبة للوصول إلى مدير الحسابات',
      fallbackLabel: 'استخدام رمز PIN',
    });

    return result.success;
  }
};