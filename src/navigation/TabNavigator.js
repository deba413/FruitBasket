import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import OrdersScreen from '../screens/OrdersScreen';
import AccountScreen from '../screens/AccountScreen';
import ContactUsScreen from '../screens/ContactUsScreen';

const Tab = createBottomTabNavigator();

const AnimatedIcon = ({ children, focused }) => {
  const animation = focused ? 'bounceIn' : undefined;
  return (
    <Animatable.View animation={animation} duration={800} useNativeDriver>
      {children}
    </Animatable.View>
  );
};

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let IconComponent;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              IconComponent = <Ionicons name={iconName} size={size} color={color} />;
              break;
            case 'Categories':
              IconComponent = <MaterialIcons name="category" size={size} color={color} />;
              break;
            case 'My Orders':
              IconComponent = <FontAwesome name="shopping-bag" size={size} color={color} />;
              break;
            case 'Account':
              iconName = focused ? 'person' : 'person-outline';
              IconComponent = <Ionicons name={iconName} size={size} color={color} />;
              break;
            case 'Contact Us':
              iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
              IconComponent = <Ionicons name={iconName} size={size} color={color} />;
              break;
            default:
              IconComponent = null;
          }

          return (
            <AnimatedIcon focused={focused}>
              {IconComponent}
            </AnimatedIcon>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="My Orders" component={OrdersScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
      <Tab.Screen name="Contact Us" component={ContactUsScreen} />
    </Tab.Navigator>
  );
}
