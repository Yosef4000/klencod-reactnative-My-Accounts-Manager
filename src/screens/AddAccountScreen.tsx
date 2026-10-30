import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { AuthService } from '../services/authService';
import db from '../database/database';

export default function AddAccountScreen({ navigation }: { navigation: any }) {
  const [category, setCategory] = useState('شخصي');
  const [notes, setNotes] = useState('');

  const handleGoogleLogin = async () => {
    const result = await AuthService.signInWithGoogle();
    if (!result.success) {
      Alert.alert('تنبيه تكوين OAuth', result.error);
      return;
    }

    const { name, email } = result.data;
    const now = new Date().toISOString();

    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO accounts (provider, display_name, email, category, notes, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?);`,
        ['Google', name, email, category, notes, now, now],
        () => {
          Alert.alert('نجاح', 'تم حفظ الحساب بنجاح محليًا.', [
            { text: 'حسناً', onPress: () => navigation.goBack() }
          ]);
        },
        (_, error) => {
          Alert.alert('خطأ', 'فشل حفظ الحساب (ربما البريد موجود مسبقاً).');
          return false;
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>التصنيف:</Text>
      <TextInput style={styles.input} value={category} onChangeText={setCategory} placeholder="شخصي، عمل، ألعاب..." />

      <Text style={styles.label}>ملاحظات شخصية:</Text>
      <TextInput style={[styles.input, { height: 100 }]} multiline value={notes} onChangeText={setNotes} placeholder="ملاحظات حول هذا الحساب..." />

      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <Text style={styles.googleButtonText}>تسجيل الدخول باستخدام Google الرسمي</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#202124', textAlign: 'right' },
  input: { borderWidth: 1, borderColor: '#dadce0', borderRadius: 8, padding: 12, marginBottom: 16, textAlign: 'right', backgroundColor: '#f8f9fa' },
  googleButton: { backgroundColor: '#4285F4', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  googleButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});