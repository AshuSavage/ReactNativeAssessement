import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { HapticTab } from '@/components/HapticTab';
import { Colors } from '@/constants/Colors';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const getColor = (focused: boolean) => (focused ? '#FF69B4' : 'gray');

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarActiveTintColor: '#FF69B4',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: Platform.select({
          ios: { position: 'absolute' },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Feed',
          tabBarIcon: ({ focused }) => (
            <Ionicons name="flame" size={30} color={getColor(focused)} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 12, color: getColor(focused) }}>Feed</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: 'Friends',
          tabBarIcon: ({ focused }) => (
            <Ionicons name="people" size={30} color={getColor(focused)} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 12, color: getColor(focused) }}>Friends</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: 'Chats',
          tabBarIcon: ({ focused }) => (
            <Ionicons name="chatbubble" size={30} color={getColor(focused)} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 12, color: getColor(focused) }}>Chats</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => (
            <Ionicons name="settings" size={30} color={getColor(focused)} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 12, color: getColor(focused) }}>Settings</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Ionicons name="person" size={30} color={getColor(focused)} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 12, color: getColor(focused) }}>Profile</Text>
          ),
        }}
      />
    </Tabs>
  );
}
