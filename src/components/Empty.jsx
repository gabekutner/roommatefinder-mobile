import React from "react";
import { 
  View,
} from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

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
        paddingVertical:120,
        backgroundColor:colors.primary,
      }}
    >
      <FontAwesomeIcon 
        icon={icon}
        color={colors.tint}
        size={90}
        style={{
          marginBottom:16,
        }}
      />
      <CustomText
        style={{
          color:colors.tint,
          fontSize:16,
        }}
      >
        {message}
      </CustomText>
      { refresh
        ?
          <CustomButton
            onClick={() => refresh()}
            style={{
              marginTop:15,
              backgroundColor:colors.accent,
              borderColor:colors.tint,              
              width:150
            }}
          >
            <CustomText
              style={{
                fontSize:18, 
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