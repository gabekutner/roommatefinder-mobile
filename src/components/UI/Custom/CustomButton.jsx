// Custom Button component
import React, { useState } from 'react';
import {
  Animated,
  TouchableOpacity,
  Easing,
} from 'react-native';


export default function CustomButton({
  children,
  onClick,
  style,
}) {
  
  const [scaleValue] = useState(new Animated.Value(1)); // Initial scale value
  const [opacityValue] = useState(new Animated.Value(1)); // Initial opacity value

  const animateButton = () => {
    // Scale animation
    Animated.timing(scaleValue, {
      toValue: 0.9,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      // Reverse scale animation
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    });

    // Opacity animation
    Animated.timing(opacityValue, {
      toValue: 0.5,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      // Reverse opacity animation
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <TouchableOpacity
      delayPressIn={200}
      delayPressOut={200}
      style={{
        gap:'0.5rem',
        borderWidth:.75,
        borderRadius:8,
        paddingVertical:15,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        transform: [
          { 
            scale: scaleValue 
          }
        ],
        ...style,
      }}
      onPress={() => {
        onClick()
        animateButton()
      }}
      activeOpacity={0.6}
    >
      {children}
    </TouchableOpacity>
  )
}