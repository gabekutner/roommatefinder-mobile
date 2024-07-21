import React from "react";
import {Animated, View, StyleSheet} from "react-native";
import {styles} from "./deck.styles";


function DeckSwiper(props) {
  return (
    <View 
      style={[
        styles.container,
        {backgroundColor: props.theme.colors.background}
      ]}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFill, 
          {opacity: props.opacity}
        ]}
        ref={(e) => (this.containerRef = e)}
      />
      <View style={styles.container}>
        {props.children}
      </View>
    </View>
  );
};

export {DeckSwiper};