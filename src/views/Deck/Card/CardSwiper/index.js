import React from "react";
import {Animated, StyleSheet} from "react-native";
import {styles} from "./cardSwiper.styles";
import { Card } from "../Card";


function CardSwiper(props) {
  return (
    <Animated.View
      {...props.panResponder.panHandlers}
      style={[
        StyleSheet.absoluteFill,
        styles.container,
        {zIndex: props.data.length - props.index}
      ]}
    >
      <Animated.View
        style={[
          styles.wrapper,
          {
            backgroundColor: props.theme.colors.background,
            transform: [
              {translateX: props.pan.x}, 
              {rotate: props.rotate}
            ],
            width: 90 - props.index * 1 + "%",
          }
        ]}
      >
        <Card item={props.item} />
      </Animated.View>
    </Animated.View>
  );
};

export {CardSwiper};