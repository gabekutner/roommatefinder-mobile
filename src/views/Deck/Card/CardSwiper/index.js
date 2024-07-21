import React from "react";
import { Animated, StyleSheet } from "react-native";


function CardSwiper(props) {
  return (
    <Animated.View
      {...props.panResponder.panHandlers}
      style={[
        StyleSheet.absoluteFill,
        {
          zIndex: props.data.length - props.index,
          marginBottom: 68, // Adjusted margin bottom
          justifyContent:'center',
          alignItems:'center'
        },
      ]}
    >
      <Animated.View
        style={{
          borderWidth: 1,
          borderRadius: 12,
          backgroundColor:props.theme.colors.primary,
          transform: [{translateX: props.pan.x}, {rotate: props.rotate}],
          width: 90 - props.index * 1 + "%",
          marginTop: props.index * 10,
          height: 490
        }}
      >
        {props.children}
        {/* card item goes here */}
      </Animated.View>
    </Animated.View>
  );
};

export {CardSwiper};