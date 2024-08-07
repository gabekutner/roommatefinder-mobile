import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StartUpView } from "@views/Auth/StartUp";
import { LoginView } from "@views/Auth/Login";
import { IdentifierView } from "@views/Auth/Identifier";
import { VerificationCodeView } from "@views/Auth/VerificationCode";
import { PasswordView } from "@views/Auth/Password";
import { SetupView } from "@views/Auth/Setup";

import { AuthStackParamList } from "types/StackParamList";

// Create stack navigator
const Stack = createNativeStackNavigator<AuthStackParamList>();

// Main AuthNavigator component
const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator 
      initialRouteName="startup"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="startup"
        component={StartUpView}
        options={{
          presentation: 'fullScreenModal'
        }}
      />
      <Stack.Screen
        name="login"
        component={LoginView}
        options={{
          presentation: 'card'
        }}
      />
      <Stack.Screen
        name="identifier"
        component={IdentifierView}
        options={{
          presentation: 'card'
        }}
      />
      <Stack.Screen
        name="code"
        component={VerificationCodeView}
      />
      <Stack.Screen
        name="setup"
        component={SetupView}
      />
      <Stack.Screen
        name="password"
        component={PasswordView}
        options={{
          presentation: 'card'
        }}
      />
    </Stack.Navigator>
  );
};

export { AuthNavigator };