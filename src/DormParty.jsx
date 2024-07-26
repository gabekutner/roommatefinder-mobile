import React, { useEffect } from "react";

import useBearStore from "./libs/store";
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from "./screens/SplashScreen";


const DormParty = () => {
  // const initialized = useBearStore((state) => state.initialized)
  // const authenticated = useBearStore((state) => state.authenticated);
  const init = useBearStore((state) => state.init);
  const initialized = false
  const authenticated = false

  useEffect(() => {
    init();
  }, []);

  return (
    <NavigationContainer>
      
      {!initialized && !authenticated &&<SplashScreen />}
    </NavigationContainer>
  );
};

export {DormParty};