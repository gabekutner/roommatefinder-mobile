import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import SignIn from '../screens/Auth/SignIn';
import SignUp from '../screens/Auth/SignUp';
import StartupScreen from "../screens/StartupScreen";


export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='startup' 
        component={StartupScreen} 
        options={{ headerShown:false }}
      />
      <Stack.Screen 
        name='signin' 
        component={SignIn} 
        options={{ headerShown:false }}
      />
      <Stack.Screen 
        name='signup' 
        component={SignUp} 
        options={{ headerShown:false }}
      />
    </Stack.Navigator>
  )
}