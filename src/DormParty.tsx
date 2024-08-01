import React, { useEffect, useRef, ReactNode } from "react";
import { View, Animated, ViewStyle, StyleProp } from 'react-native';
import useBearStore from "./libs/store";
import { NavigationContainer } from '@react-navigation/native';
import { SplashView } from "./views/Splash";
import { AppNavigator } from "./navigators/AppNavigator";
import { AuthNavigator } from "./navigators/AuthNavigator";


// Define props type for AnimatedNavigatorContainer
interface AnimatedNavigatorContainerProps {
  authenticated: boolean;
  initialized: boolean;
  children: ReactNode;
}

const DormParty: React.FC = () => {
  /**
   * DormParty App Config
   * @props
   *    None
   */
  const init = useBearStore((state) => state.init);
  const initialized = useBearStore((state) => state.initialized)
  const authenticated = useBearStore((state) => state.authenticated);

  useEffect(() => {
    init();
  }, [init]);

  const fill = {flex: 1}

  const AnimatedView = Animated.createAnimatedComponent(View);

  const AnimatedNavigatorContainer: React.FC<AnimatedNavigatorContainerProps> = ({ 
    authenticated, 
    initialized, 
    children,
  }) => {
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
    }, [authenticated, initialized, opacity, translateY]);

    const animatedStyle: StyleProp<ViewStyle> = {
      opacity,
      transform: [{ translateY }],
    };

    return <AnimatedView style={[fill, animatedStyle]}>{children}</AnimatedView>;
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

export { DormParty };