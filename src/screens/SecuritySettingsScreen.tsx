import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SecurityService } from '../services/securityService';

export default function SecuritySettingsScreen() {
  const [pin, setPin] = useState('');

  const handleSavePin = async () => {
    if (pin.length < 4) {
      Alert.alert('خطأ', 'يجب أن يكون رمز PIN مكوناً من 4 خانات على الأقل.');
      return;
    }
    await SecurityService.savePin(pin);
    Alert.alert('نجاح', 'تم حفظ وتشفير رمز PIN بنجاح.');
    setPin('');
  };

  const handleBiometricTest = async () => {
    const success = await SecurityService.authenticateBiometric();
    if (success) {
      Alert.alert('نجاح', 'تمت المصادقة البيومترية بنجاح.');
    } else {
      Alert.alert('فشل', 'تعذرت المصادقة أو لم يتم إعداد بصمة الإصبع.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>تعيين رمز PIN آمن</Text>
      <TextInput
        style={styles.input}
        placeholder="أدخل رمز PIN الجديد"
        secureTextEntry
        keyboardType="numeric"
        value={pin}
        onChangeText={setPin}
      />
      <TouchableOpacity style={styles.button} onPress={handleSavePin}>
        <Text style={styles.buttonText}>حفظ وتشفير الرمز</Text>
      </TouchableOpacity>

      <Text style={[styles.sectionTitle, { marginTop: 30 }]}>المصادقة البيومترية (بصمة الإصبع)</Text>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#34a853' }]} onPress={handleBiometricTest}>
        <Text style={styles.buttonText}>اختبار المصادقة البيومترية</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#202124', textAlign: 'right' },
  input: { borderWidth: 1, borderColor: '#dadce0', borderRadius: 8, padding: 12, marginBottom: 12, textAlign: 'right', backgroundColor: '#f8f9fa' },
  button: { backgroundColor: '#1a73e8', padding: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});