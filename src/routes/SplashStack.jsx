import React, { useEffect } from "react";
import { View } from "react-native";

import {createNativeStackNavigator} from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import SplashScreen from "../screens/SplashScreen";
// import {MockProfile} from "../../__mocks__/mock.profile";
import { MockAuth } from "../../__mocks__/mock.auth";
import { MockIdentifier } from "../../__mocks__/mock.identifier";
import { useTheme } from "react-native-paper";

const Base = ({ navigation }) => {
  const theme = useTheme()
  useEffect(() => {
    navigation.navigate('splash')
  }), []
  return (
    <View style={{flex:1, backgroundColor: theme.colors.background}} />
  )
}

export default function SplashStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="base"
        component={Base}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="splash"
        component={MockAuth}
        options={{
          headerShown: false, 
          presentation:"modal",
        }}
      />
      <Stack.Screen
        name="identifier"
        component={MockIdentifier}
        options={{
          headerShown: false, 
          presentation:"modal",
        }}
      />
    </Stack.Navigator>
  );
}
