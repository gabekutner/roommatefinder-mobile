import "react-native-gesture-handler";
import React, {useEffect} from "react";

import "./core/fontawesome";
import {NavigationContainer} from "@react-navigation/native";

import SplashStack from "./routes/SplashStack";
import AuthStack from "./routes/AuthStack";
import AppStack from "./routes/AppStack";
import AccountSetupStack from "./routes/AccountSetupStack";

// ~deprecated
// import useStore from "./zustand/store";
import useBearStore from "./libs/store";

// export {default} from './.storybook';
export default function App() {
  const initialized = useBearStore((state) => state.initialized)
  const authenticated = useBearStore((state) => state.authenticated);
  const init = useBearStore((state) => state.init);

  useEffect(() => {
    init();
  }, []);

  if (!initialized) {
    return (
      <NavigationContainer>
        <SplashStack />
      </NavigationContainer>
    );
  } else if (!authenticated) {
    return (
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    );
  };
};