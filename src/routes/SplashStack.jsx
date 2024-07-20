import React from "react";

import {createNativeStackNavigator} from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import SplashScreen from "../screens/SplashScreen";
import {MockProfile} from "../../__mocks__/mock.profile";

export default function SplashStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="splash"
        component={MockProfile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
