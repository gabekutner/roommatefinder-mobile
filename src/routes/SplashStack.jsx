import React, { useEffect } from "react";
import { View } from "react-native";

import {createNativeStackNavigator} from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import SplashScreen from "../screens/SplashScreen";
// import {MockProfile} from "../../__mocks__/mock.profile";
import { MockAuth } from "../../__mocks__/mock.auth";
import { MockIdentifier } from "../../__mocks__/mock.identifier";
import { MockVerificationCode } from "../../__mocks__/mock.verificationCode";
import { useTheme } from "react-native-paper";
import { MockAccountSetup } from "../../__mocks__/mock.accountSetup";
import { MockPassword } from "../../__mocks__/mock.password";

const Base = ({ navigation }) => {
  const theme = useTheme()
  useEffect(() => {
    navigation.navigate('auth')
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
        name="auth"
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
      <Stack.Screen
        name="code"
        component={MockVerificationCode}
        options={{
          headerShown: false, 
          presentation:"modal",
        }}
      />
      <Stack.Screen
        name="password"
        component={MockPassword}
        options={{
          headerShown: false, 
          presentation:"fullScreenModal",
        }}
      />
      <Stack.Screen
        name="setup"
        component={MockAccountSetup}
        options={{
          headerShown: false, 
          presentation:"fullScreenModal",
        }}
      />
    </Stack.Navigator>
  );
}
