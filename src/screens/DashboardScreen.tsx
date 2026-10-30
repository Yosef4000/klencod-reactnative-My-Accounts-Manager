import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import db, { initDatabase } from '../database/database';

export default function DashboardScreen({ navigation }: { navigation: any }) {
  const [accountCount, setAccountCount] = useState(0);

  useEffect(() => {
    initDatabase().then(() => {
      db.transaction(tx => {
        tx.executeSql('SELECT COUNT(*) as count FROM accounts;', [], (_, { rows }) => {
          setAccountCount(rows.item(0).count);
        });
      });
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerCard}>
        <Text style={styles.appName}>My Accounts Manager</Text>
        <Text style={styles.appSubtitle}>مدير حساباتي الآمن</Text>
        <Text style={styles.statsText}>إجمالي الحسابات المحفوظة: {accountCount}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('AddAccount')}>
          <Text style={styles.buttonText}>+ إضافة حساب جديد</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('AccountsList')}>
          <Text style={styles.secondaryButtonText}>📋 عرض جميع الحسابات</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('PlatformLinks')}>
          <Text style={styles.secondaryButtonText}>🔗 ربط التطبيقات والمنصات (مثل Oya Live)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('SecuritySettings')}>
          <Text style={styles.secondaryButtonText}>🔒 إعدادات الأمان والخصوصية</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.securityStatusCard}>
        <Text style={styles.securityTitle}>حالة حماية البيانات</Text>
        <Text style={styles.securityDesc}>🔒 التشفير ومفاتيح Android Keystore مفعلة محليًا.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 16 },
  headerCard: { backgroundColor: '#1a73e8', borderRadius: 12, padding: 20, alignItems: 'center', marginBottom: 20 },
  appName: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  appSubtitle: { fontSize: 16, color: '#e0e0e0', marginTop: 4 },
  statsText: { fontSize: 14, color: '#fff', marginTop: 12 },
  buttonContainer: { gap: 12 },
  primaryButton: { backgroundColor: '#34a853', padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  secondaryButton: { backgroundColor: '#fff', padding: 16, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#dadce0' },
  secondaryButtonText: { color: '#1a73e8', fontSize: 16, fontWeight: 'bold' },
  securityStatusCard: { marginTop: 24, backgroundColor: '#e8f0fe', padding: 16, borderRadius: 8 },
  securityTitle: { fontSize: 16, fontWeight: 'bold', color: '#1a73e8' },
  securityDesc: { fontSize: 14, color: '#5f6368', marginTop: 4 }
});