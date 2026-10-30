import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import db from '../database/database';

export default function PlatformLinksScreen() {
  const [platformName, setPlatformName] = useState('Oya Live');
  const [platformUrl, setPlatformUrl] = useState('');
  const [links, setLinks] = useState<any[]>([]);

  const loadLinks = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM platform_links;', [], (_, { rows }) => {
        setLinks(rows._array);
      });
    });
  };

  useEffect(() => {
    loadLinks();
  }, []);

  const addLink = () => {
    if (!platformName) return;
    const now = new Date().toISOString();
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO platform_links (platform_name, platform_url, local_status, linked_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?);',
        [platformName, platformUrl, 'مربوط يدويًا', now, now, now],
        () => {
          setPlatformName('');
          setPlatformUrl('');
          loadLinks();
          Alert.alert('نجاح', 'تمت إضافة سجل الربط بالمنصة محليًا.');
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>تنظيم ارتباطات الحسابات بالمنصات (مثل Oya Live)</Text>
      <TextInput style={styles.input} placeholder="اسم المنصة (مثال: Oya Live)" value={platformName} onChangeText={setPlatformName} />
      <TextInput style={styles.input} placeholder="رابط المنصة أو التطبيق (اختياري)" value={platformUrl} onChangeText={setPlatformUrl} />

      <TouchableOpacity style={styles.button} onPress={addLink}>
        <Text style={styles.buttonText}>إضافة ربط المنصة محليًا</Text>
      </TouchableOpacity>

      <FlatList
        data={links}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.platform_name}</Text>
            <Text style={styles.cardSubtitle}>الحالة: {item.local_status} (تنظيم محلي فقط)</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8f9fa' },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 12, color: '#202124', textAlign: 'right' },
  input: { borderWidth: 1, borderColor: '#dadce0', borderRadius: 8, padding: 12, marginBottom: 12, backgroundColor: '#fff', textAlign: 'right' },
  button: { backgroundColor: '#34a853', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  card: { backgroundColor: '#fff', padding: 14, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#e0e0e0' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#1a73e8', textAlign: 'right' },
  cardSubtitle: { fontSize: 14, color: '#5f6368', marginTop: 4, textAlign: 'right' }
});