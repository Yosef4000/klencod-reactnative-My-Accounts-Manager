import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import db from '../database/database';

export default function AccountDetailScreen({ route, navigation }: { route: any, navigation: any }) {
  const { account } = route.params;
  const [notes, setNotes] = useState(account.notes || '');
  const [category, setCategory] = useState(account.category || '');

  const handleUpdate = () => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE accounts SET notes = ?, category = ?, updated_at = ? WHERE id = ?;',
        [notes, category, new Date().toISOString(), account.id],
        () => {
          Alert.alert('نجاح', 'تم تحديث بيانات الحساب محليًا.');
          navigation.goBack();
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>الاسم المعروض:</Text>
      <Text style={styles.value}>{account.display_name}</Text>

      <Text style={styles.label}>البريد الإلكتروني:</Text>
      <Text style={styles.value}>{account.email}</Text>

      <Text style={styles.label}>تاريخ الإضافة:</Text>
      <Text style={styles.value}>{new Date(account.created_at).toLocaleString()}</Text>

      <Text style={styles.label}>التصنيف:</Text>
      <TextInput style={styles.input} value={category} onChangeText={setCategory} />

      <Text style={styles.label}>الملاحظات:</Text>
      <TextInput style={[styles.input, { height: 100 }]} multiline value={notes} onChangeText={setNotes} />

      <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
        <Text style={styles.saveButtonText}>حفظ التعديلات</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  label: { fontSize: 14, fontWeight: 'bold', color: '#5f6368', marginTop: 12, textAlign: 'right' },
  value: { fontSize: 16, color: '#202124', marginTop: 4, textAlign: 'right', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#dadce0', borderRadius: 8, padding: 12, marginTop: 4, textAlign: 'right', backgroundColor: '#f8f9fa' },
  saveButton: { backgroundColor: '#1a73e8', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 24 },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});