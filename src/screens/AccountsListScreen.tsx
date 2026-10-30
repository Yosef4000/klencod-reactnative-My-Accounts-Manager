import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
import db from '../database/database';

export default function AccountsListScreen({ navigation }: { navigation: any }) {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const loadAccounts = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM accounts WHERE email LIKE ? OR display_name LIKE ?;', [`%${searchQuery}%`, `%${searchQuery}%`], (_, { rows }) => {
        setAccounts(rows._array);
      });
    });
  };

  useEffect(() => {
    loadAccounts();
  }, [searchQuery]);

  const deleteAccount = (id: number) => {
    Alert.alert('تأكيد الحذف', 'هل أنت متأكد من حذف هذا الحساب من التخزين المحلي؟', [
      { text: 'إلغاء', style: 'cancel' },
      { text: 'حذف', style: 'destructive', onPress: () => {
        db.transaction(tx => {
          tx.executeSql('DELETE FROM accounts WHERE id = ?;', [id], () => loadAccounts());
        });
      }}
    ]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBox}
        placeholder="بحث بريد أو اسم..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={accounts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.name}>{item.display_name}</Text>
              <Text style={styles.email}>{item.email}</Text>
              <Text style={styles.category}>التصنيف: {item.category}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => navigation.navigate('AccountDetail', { account: item })}>
                <Text style={styles.actionText}>التفاصيل</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteAccount(item.id)}>
                <Text style={[styles.actionText, { color: 'red' }]}>حذف</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>لا توجد حسابات محفوظة. قم بإضافة حسابك الأول.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8f9fa' },
  searchBox: { borderWidth: 1, borderColor: '#dadce0', borderRadius: 8, padding: 12, marginBottom: 16, backgroundColor: '#fff', textAlign: 'right' },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#e0e0e0' },
  name: { fontSize: 16, fontWeight: 'bold', color: '#202124', textAlign: 'right' },
  email: { fontSize: 14, color: '#5f6368', textAlign: 'right' },
  category: { fontSize: 12, color: '#1a73e8', marginTop: 4, textAlign: 'right' },
  actions: { flexDirection: 'row', gap: 12 },
  actionText: { fontSize: 14, fontWeight: 'bold', color: '#1a73e8' },
  emptyText: { textAlign: 'center', color: '#5f6368', marginTop: 40 }
});