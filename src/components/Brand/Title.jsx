import React from "react";
import { Text } from 'react-native';


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
        fontSize:fontSize,
        ...style
      }}
    >
      {title}
    </Text>
  )
}