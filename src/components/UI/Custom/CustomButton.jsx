// Custom Button component
import React from 'react';
import {
  TouchableOpacity,
} from 'react-native';


export default function CustomButton({
  children,
  onClick,
  style,
}) {
  return (
    <TouchableOpacity
      style={{
        borderWidth:.75,
        borderRadius:8,
        paddingVertical:15,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        ...style,
      }}
      onPress={() => onClick()}
      activeOpacity={0.6}
    >
      {children}
    </TouchableOpacity>
  )
}