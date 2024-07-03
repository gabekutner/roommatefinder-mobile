import React from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import { colors } from "../../../../constants/colors";


export default function Paginator({ data, scrollX}) {
  const width = Dimensions.get('window').width
  return (
    <View style={{ flexDirection:'row' }}>
      {data.map((_, i) => {

        const inputRange = [(i - 1) * width , i * width, (i + 1) * width]

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp'
        })

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp'
        })

        return <Animated.View style={{ ...styles.dot, width:dotWidth, opacity:opacity }} key={i.toString( )}/>
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  dot: {
    height:10,
    borderRadius:5,
    backgroundColor:colors.accent,
    marginHorizontal:8
  }
})