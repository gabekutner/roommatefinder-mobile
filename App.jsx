import 'react-native-gesture-handler';
import React, { useEffect } from 'react';

import './src/core/fontawesome';
import { NavigationContainer } from '@react-navigation/native';

import SplashStack from './src/routes/SplashStack';
import AuthStack from './src/routes/AuthStack';
import AppStack from './src/routes/AppStack';
import AccountSetupStack from './src/routes/AccountSetupStack';

import useGlobal from './src/core/global';


export default function App() {

  const initialized = useGlobal(state => state.initialized)
  const authenticated = useGlobal(state => state.authenticated)
  const profileCreated = useGlobal(state => state.profileCreated)
  const init = useGlobal(state => state.init)

  useEffect(() => {
    init()
  }, [])

  if (!initialized) {
    return (
      <NavigationContainer>
        <SplashStack />
      </NavigationContainer>
    )
  } else if (!authenticated) {
    return (
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    )
  } else if (!profileCreated) {
    return (
      <NavigationContainer>
        <AccountSetupStack />
      </NavigationContainer>
    )
  } else {
    return (
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    )
  }
}