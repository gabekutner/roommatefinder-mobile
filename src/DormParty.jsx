import React, { useEffect } from "react";

import useBearStore from "./libs/store";
import { NavigationContainer } from '@react-navigation/native';
import { SplashView } from "./views/Splash";
import { AppNavigator } from "./navigators/AppNavigator";
import { AuthNavigator } from "./navigators/AuthNavigator";


const DormParty = () => {

  const initialized = useBearStore((state) => state.initialized)
  const authenticated = useBearStore((state) => state.authenticated);
  // const initialized = true
  // const authenticated = false
  const init = useBearStore((state) => state.init);

  useEffect(() => {
    init();
  }, []);
  
  return (
    <NavigationContainer>
      {authenticated && initialized && <AppNavigator />}
      {!authenticated && initialized && <AuthNavigator />}
      {!initialized && <SplashView />}
    </NavigationContainer>
  );
};

export {DormParty};