import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import SplashScreen from "../screens/SplashScreen";
import {MessagingMock} from "../mockups/messaging.mock";
import { OnboardingMock } from "../mockups/onboarding.mock";


export default function SplashStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='splash' 
        component={MessagingMock} 
        options={{ headerShown:false }} 
      />
    </Stack.Navigator>
  )
}