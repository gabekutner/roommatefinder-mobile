import React from "react";
import { 
  View,
} from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import CustomText from "./UI/Custom/CustomText";


export default function Empty({ icon, message, centered=true, colors }) {
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
        color={colors.tertiary}
        size={90}
        style={{
          marginBottom:16,
        }}
      />
      <CustomText
        style={{
          color:colors.tertiary,
          fontSize:16,
        }}
      >
        {message}
      </CustomText>
    </View>
  )
}