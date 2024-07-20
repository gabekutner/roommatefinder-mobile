import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import SplashScreen from "../screens/SplashScreen";
import { MockFriend } from "../../__mocks__/mock.friends";

export default function SplashStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='splash' 
        component={MockFriend} 
        options={{ headerShown:false }} 
      />
    </Stack.Navigator>
  )
}