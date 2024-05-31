import React from "react";
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