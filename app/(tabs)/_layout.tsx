import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{
        tabBarActiveTintColor: '#007aff',
      }}>
      <Tabs.Screen name="index" options={{ 
        title: 'Home',
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'home-sharp' : 'home-outline'} size={24} color={color} />
        ) 
      }}  />
      <Tabs.Screen name="about" options={{ 
        title: 'About', 
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={ focused ? 'information-circle' : 'information-circle-outline' } size={24} color={color} />
        )
        }} />
    </Tabs>
  );
}