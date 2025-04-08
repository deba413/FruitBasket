import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import OrdersScreen from '../screens/OrdersScreen';
import AccountScreen from '../screens/AccountScreen';
import ContactUsScreen from '../screens/ContactUsScreen';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator>
    <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="My Orders" component={OrdersScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
      <Tab.Screen name="Contact Us" component={ContactUsScreen} />
    </Tab.Navigator>
  );
}
// ihforwi?zzz