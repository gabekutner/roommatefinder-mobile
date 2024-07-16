import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import StartupScreen from "../screens/StartupScreen";
import AuthScreen from "../screens/Auth";


export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='startup' 
        component={StartupScreen} 
        options={{ headerShown:false }}
      />
      <Stack.Screen 
        name="signin"
        component={AuthScreen}
        options={{headerShown: false}}
        initialParams={{
          page: 'signin',
          title: 'Welcome back!'
        }}
      />
      <Stack.Screen 
        name="signup"
        component={AuthScreen}
        options={{headerShown: false}}
        initialParams={{
          page: 'signup',
          title: 'Sign up to find your future roommate!'
        }}
      />
    </Stack.Navigator>
  )
}