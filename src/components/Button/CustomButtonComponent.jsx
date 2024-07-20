import React, {useState} from "react";
import {Animated, Easing, TouchableOpacity} from "react-native";

import {buttons, shadow as sh} from "../../styles/styles";

const withCustomProps = (WrappedComponent) => {
  /** Props for WrappedComponent:
   * onClick: function
   * disabled: bool
   * style : object
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
    style,

    /** styles */
    animated,
    shadow,
    circle,
    variant = "standard",
    size = "medium",
    iconPosition = "none",
    ...props
  }) => {
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

    const mergedStyles = {
      ...buttons.base,
      ...(variant === "standard"
        ? buttons.standard
        : variant === "outline"
        ? buttons.outline
        : {}),
      ...(shadow && sh.shadow),
      // ...(size === 'small' ? Buttons.small : size === 'large' ? Buttons.large : Buttons.medium),
      // ...(circle && Buttons.circle),
      // ...(iconPosition === 'end' ? Buttons.iconAtEnd : iconPosition === 'start' ? Buttons.iconAtStart : Buttons.none),
      ...(animated ? {transform: [{scale: scaleValue}]} : null),
      ...style,
    };
    return (
      <WrappedComponent
        disabled={disabled}
        style={mergedStyles}
        onPress={() => {
          onClick();
          animateButton();
        }}
        activeOpacity={0.6}
        {...props}
      />
    );
  };
  return WithCustomProps;
};

const CustomButtonComponent = withCustomProps(TouchableOpacity);
export default CustomButtonComponent;
