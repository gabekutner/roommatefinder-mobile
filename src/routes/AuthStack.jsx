import React, { useEffect } from "react";
import { View } from "react-native";

import {createNativeStackNavigator} from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

// import SplashScreen from "../screens/SplashScreen";
// import {MockProfile} from "../../__mocks__/mock.profile";
// import { MockAuth } from "../../__mocks__/mock.auth";
import { StartUpView } from "../views/Auth/StartUp";
import { LoginView } from "../views/Auth/Login";
import { IdentifierView } from "../views/Auth/Identifier";
// import { MockIdentifier } from "../../__mocks__/mock.identifier";
// import { MockVerificationCode } from "../../__mocks__/mock.verificationCode";
// import { useTheme } from "react-native-paper";
// import { MockAccountSetup } from "../../__mocks__/mock.accountSetup";
// import { MockPassword } from "../../__mocks__/mock.password";
// import { MockLogin } from "../../__mocks__/mock.login";
import { useTheme } from "react-native-paper";
import { VerificationCodeView } from "../views/Auth/VerificationCode";
import { PasswordView } from "../views/Auth/Password";
import { SetupView } from "../views/Auth/Setup";


const Base = ({ navigation }) => {
  const theme = useTheme();
  useEffect(() => {
    navigation.navigate('auth')
  }), []
  return (
    <View style={{flex:1, backgroundColor: theme.colors.background}} />
  )
}

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="base"
        component={Base}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="auth"
        component={StartUpView}
        options={{
          headerShown: false, 
          presentation:"modal",
          gestureEnabled: false
        }}
      />
      <Stack.Screen
        name="login"
        component={LoginView}
        options={{
          headerShown: false, 
          presentation:"modal",
        }}
      />
      <Stack.Screen
        name="identifier"
        component={IdentifierView}
        options={{
          headerShown: false, 
          presentation:"modal",
          gestureEnabled: false
        }}
      />
      <Stack.Screen
        name="code"
        component={VerificationCodeView}
        options={{
          headerShown: false, 
          presentation:"modal",
          gestureEnabled: false
        }}
      />
      <Stack.Screen
        name="password"
        component={PasswordView}
        options={{
          headerShown: false, 
          presentation:"fullScreenModal",
          gestureEnabled: false
        }}
      />
      <Stack.Screen
        name="setup"
        component={SetupView}
        options={{
          headerShown: false, 
          presentation:"fullScreenModal",
          gestureEnabled: false
        }}
      />
    </Stack.Navigator>
  );
}
