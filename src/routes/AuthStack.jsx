import React, { useEffect } from "react";
import { View } from "react-native";

import { useTheme } from "react-native-paper";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import { StartUpView } from "../views/Auth/StartUp";
import { LoginView } from "../views/Auth/Login";
import {IdentifierView} from "../views/Auth/Identifier";
import { VerificationCodeView } from "../views/Auth/VerificationCode";
import { PasswordView } from "../views/Auth/Password";
import { SetupView } from "../views/Auth/Setup";


const Base = ({ navigation }) => {
  const theme = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('auth');
    }, 100); // Delay to ensure component is fully mounted

    return () => clearTimeout(timer); // Clean up timer if component unmounts
  }, [navigation]);

  return (
    <View style={{flex:1, backgroundColor: theme.colors.background}} />
  );
};

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="base">
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
};