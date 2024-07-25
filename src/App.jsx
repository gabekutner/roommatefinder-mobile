import "react-native-gesture-handler";
import React, {useEffect} from "react";

import "./core/fontawesome";
import {NavigationContainer} from "@react-navigation/native";

import SplashStack from "./routes/SplashStack";
import AuthStack from "./routes/AuthStack";
import AppStack from "./routes/AppStack";
import AccountSetupStack from "./routes/AccountSetupStack";

import useStore from "./zustand/store";
// import { print } from "~/components/i";

// export {default} from './.storybook';
export default function App() {
  const initialized = useStore((state) => state.initialized);
  const authenticated = useStore((state) => state.authenticated);
  const profileCreated = useStore((state) => state.profileCreated);
  // const initialized = false
  // const authenticated = false
  // const profileCreated = false
  const init = useStore((state) => state.init);

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
  } else if (!profileCreated) {
    return (
      <NavigationContainer>
        <AccountSetupStack />
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    );
  }
}
