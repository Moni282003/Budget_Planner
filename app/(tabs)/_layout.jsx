import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#8B42FC',
    headerShown:false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
       
       <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <AntDesign name="profile" size={28} color={color} />,
        }}
      />
      </Tabs>
  )
}