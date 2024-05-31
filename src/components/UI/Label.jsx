import React from "react";
import CustomText from "./Custom/CustomText";


export default function CustomLabel({ 
  colors, 
  label, 
  style 
}) {
  return (
    <CustomText 
      style={{ 
        color:colors.tint,
        fontSize:18, 
        fontWeight:'600', 
        marginBottom:6,
        ...style
      }}
    >
      { label }
    </CustomText>
  )
}