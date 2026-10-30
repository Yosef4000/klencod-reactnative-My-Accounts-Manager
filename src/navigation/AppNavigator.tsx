import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import DashboardScreen from '../screens/DashboardScreen';
import AddAccountScreen from '../screens/AddAccountScreen';
import AccountsListScreen from '../screens/AccountsListScreen';
import AccountDetailScreen from '../screens/AccountDetailScreen';
import PlatformLinksScreen from '../screens/PlatformLinksScreen';
import SecuritySettingsScreen from '../screens/SecuritySettingsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Dashboard"
        screenOptions={{
          headerStyle: { backgroundColor: '#1a73e8' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'لوحة التحكم - مدير حساباتي' }} />
        <Stack.Screen name="AddAccount" component={AddAccountScreen} options={{ title: 'إضافة حساب جديد' }} />
        <Stack.Screen name="AccountsList" component={AccountsListScreen} options={{ title: 'قائمة الحسابات' }} />
        <Stack.Screen name="AccountDetail" component={AccountDetailScreen} options={{ title: 'تفاصيل الحساب' }} />
        <Stack.Screen name="PlatformLinks" component={PlatformLinksScreen} options={{ title: 'ربط المنصات والتطبيقات' }} />
        <Stack.Screen name="SecuritySettings" component={SecuritySettingsScreen} options={{ title: 'الأمان والخصوصية' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}