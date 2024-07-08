import React from "react";
import { Text } from 'react-native';
import { verticalScale } from "react-native-size-matters";


export default function Title({
  title,
  color,
  fontSize,
  style
}) {
  return (
    <Text
      style={{
        fontFamily:'LuckiestGuy-Regular',
        color:color,
        fontSize:fontSize ? fontSize : verticalScale(30),
        ...style
      }}
    >
      {title}
    </Text>
  )
}