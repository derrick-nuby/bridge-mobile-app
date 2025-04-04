import { Tabs } from 'expo-router';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { CameraButton } from '@/components/ui/CameraButton';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#b45309', // Amber-800
        tabBarStyle: {
          backgroundColor: '#fff7ed', // Amber-50
          borderTopWidth: 0,
          height: 80,
          paddingBottom: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="attendance"
        options={{
          title: 'Attendance',
          tabBarIcon: ({ color }) => <FontAwesome name="list-alt" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="camera-modal"
        options={{
          title: '',
          tabBarButton: () => <CameraButton />,
        }}
      />
      <Tabs.Screen
        name="raw-data"
        options={{
          title: 'Raw Data',
          tabBarIcon: ({ color }) => <MaterialIcons name="data-usage" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}