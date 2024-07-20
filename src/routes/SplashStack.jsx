import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import SplashScreen from "../screens/SplashScreen";
import { MockCard } from "../../__mocks__/mock.card";


export default function SplashStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='splash' 
        component={MockCard} 
        options={{ headerShown:false }} 
      />
    </Stack.Navigator>
  )
}