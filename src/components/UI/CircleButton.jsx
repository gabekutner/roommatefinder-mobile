import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { 
  moderateScale, 
  scale
} from "react-native-size-matters";

import CustomButton from "./Custom/CustomButton";


export default function CircleButton({ 
  onPress,
  icon,
  size,
  backgroundColor,
  iconColor,
}) {
  return (
    <CustomButton
      onClick={onPress}
      style={{
        width:scale(50),
        height:scale(50),
        borderRadius:scale(60),
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'flex-end',
        marginVertical:moderateScale(14),
        marginHorizontal:moderateScale(14),
        padding:scale(10),
        backgroundColor:backgroundColor,
        zIndex:1,
        shadowColor: '#222',
        shadowOffset: { width:2, height:1 },
        shadowOpacity: 1,
        shadowRadius: 1,  
        borderWidth:3
      }}
    >
      <FontAwesomeIcon 
        icon={icon}
        size={size}
        color={iconColor}
      />
    </CustomButton>
  )
}