import React from "react";
import { 
  View,
} from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  verticalScale,
  moderateScale
} from 'react-native-size-matters';

import CustomText from "./UI/Custom/CustomText";
import CustomButton from "./UI/Custom/CustomButton";


export default function Empty({ 
  icon, 
  message, 
  centered=true, 
  colors, 
  refresh 
}) {

  return (
    <View
      style={{
        flex:1,
        justifyContent:centered?'center' : 'flex-start',
        alignItems:'center',
        paddingVertical:verticalScale(120),
        backgroundColor:colors.primary,
      }}
    >
      <FontAwesomeIcon 
        icon={icon}
        color={colors.tint}
        size={verticalScale(70)}
        style={{
          marginBottom:verticalScale(14),
        }}
      />
      <CustomText
        style={{
          color:colors.tint,
          fontSize:verticalScale(13),
        }}
      >
        {message}
      </CustomText>
      { refresh
        ?
          <CustomButton
            onClick={() => refresh()}
            style={{
              marginTop:verticalScale(14),
              backgroundColor:colors.accent,
              borderColor:colors.tint,              
              width:moderateScale(150)
            }}
          >
            <CustomText
              style={{
                fontSize:verticalScale(14), 
                fontWeight:'600', 
                color:colors.white 
              }}
            >
              Refresh
            </CustomText>
          </CustomButton>
        : null
      }
    </View>
  )
}