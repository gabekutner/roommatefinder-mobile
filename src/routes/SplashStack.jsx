import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import SplashScreen from '../screens/SplashScreen';


export default function SplashStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='splash' 
        component={SplashScreen} 
        options={{ headerShown:false }} 
      />
    </Stack.Navigator>
  )
}