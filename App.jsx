import 'react-native-gesture-handler';
import React, { useEffect } from 'react';

import './src/core/fontawesome';
import { NavigationContainer } from '@react-navigation/native';

import SplashStack from './src/routes/SplashStack';
import AuthStack from './src/routes/AuthStack';
import AppStack from './src/routes/AppStack';
import AccountSetupStack from './src/routes/AccountSetupStack';

import useStore from './src/zustand/store';


export default function App() {
  const initialized = useStore(state => state.initialized)
  const authenticated = useStore(state => state.authenticated)
  const profileCreated = useStore(state => state.profileCreated)
  // const initialized = true
  // const authenticated = false
  // const profileCreated = false
  const init = useStore(state => state.init)

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