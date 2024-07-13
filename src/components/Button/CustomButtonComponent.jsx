import React, { useState } from "react";
import { 
  Animated, 
  Easing,
  TouchableOpacity 
} from "react-native";

import { Buttons } from "../../styles";


const withCustomProps = WrappedComponent => {
  /** Props for WrappedComponent:
   * onClick: function
   * disabled: bool
   * 
   * animated: bool
   * shadow: bool
   * variant: 'standard' | 'outline' (default: 'standard')
   * size: 'small' | 'medium' | 'large' (default: 'medium')
   * shape: 'circle' | 'square' (default: 'square')
   * iconPosition: 'start' | 'end' | 'none' (default: 'none')
   */
  const WithCustomProps = ({ 
    onClick,
    disabled,
    

    /** styles */
    animated, 
    shadow, 
    scaleY,
    scaleX,
    variant = 'standard', 
    size = 'medium', 
    shape = 'square', 
    iconPosition = 'none', 
    ...props 
  }) => {
    const [scaleValue] = useState(new Animated.Value(1)) // Initial scale value
    const [opacityValue] = useState(new Animated.Value(1)) // Initial opacity value

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
        }).start()
      })
    
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
        }).start()
      })
    }
    
    const mergedStyles = {
      ...Buttons.base,
      ...(variant === 'standard' ? Buttons.standard : Buttons.outline),
      ...(scaleY && Buttons.scaleY),
      ...(scaleX && Buttons.scaleX),
      ...(shadow && Buttons.shadow),
      ...(size === 'small' ? Buttons.small : size === 'large' ? Buttons.large : Buttons.medium),
      ...(shape === 'circle' ? Buttons.circle : Buttons.square),
      ...(iconPosition === 'end' ? Buttons.iconAtEnd : iconPosition === 'start' ? Buttons.iconAtStart : Buttons.none),
      ...(animated ? {transform: [{ scale: scaleValue }]} : null )
    }
    return (
      <WrappedComponent 
        disabled={disabled}
        style={mergedStyles} 
        onPress={() => {
          onClick()
          animateButton()
        }} 
        activeOpacity={0.6}
        {...props}
      />
    )
  }
  return WithCustomProps
}

const CustomButtonComponent = withCustomProps(TouchableOpacity)
export default CustomButtonComponent