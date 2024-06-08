import React from "react";
import { verticalScale } from "react-native-size-matters";
import CustomText from "./Custom/CustomText";


export default function CustomLabel({ 
  color, 
  label, 
  style 
}) {
  return (
    <CustomText 
      style={{ 
        color:color,
        fontSize:verticalScale(14), 
        fontWeight:'600', 
        marginBottom:6,
        ...style
      }}
    >
      { label }
    </CustomText>
  )
}