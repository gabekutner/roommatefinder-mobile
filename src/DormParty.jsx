import React, { useEffect, useRef } from "react";
import { View, Animated } from 'react-native';

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

  const AnimatedView = Animated.createAnimatedComponent(View);

  const AnimatedNavigatorContainer = ({ authenticated, initialized, children }) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(50)).current;

    useEffect(() => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, [authenticated, initialized]);

    const animatedStyle = {
      opacity,
      transform: [{ translateY }],
    };

    return <AnimatedView style={[{flex:1}, animatedStyle]}>{children}</AnimatedView>;
  };
  
  return (
    <NavigationContainer>
      <AnimatedNavigatorContainer authenticated={authenticated} initialized={initialized}>
        {authenticated && initialized && <AppNavigator />}
        {!authenticated && initialized && <AuthNavigator />}
        {!initialized && <SplashView />}
      </AnimatedNavigatorContainer>
    </NavigationContainer>
  );
};

export {DormParty};