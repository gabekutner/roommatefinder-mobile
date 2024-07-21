import React, {useEffect, useRef} from "react";
import {Animated, Easing} from "react-native";
import {styles} from "./loadingIndicator.styles";


function LoadingIndicator() {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1800, // 1.8 seconds in milliseconds
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      })
    ).start();
  };

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(255, 255, 255, 0)", "#F0F0F0"],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        backgroundColor
      ]}
    />
  );
};

export {LoadingIndicator};