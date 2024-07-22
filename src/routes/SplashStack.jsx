import React from "react";

import {createNativeStackNavigator} from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import SplashScreen from "../screens/SplashScreen";
// import {MockProfile} from "../../__mocks__/mock.profile";
import { MockAuth } from "../../__mocks__/mock.auth";

export default function SplashStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="splash"
        component={MockAuth}
        options={{
          headerShown: false, 
          presentation:"modal"
        }}
      />
    </Stack.Navigator>
  );
}
