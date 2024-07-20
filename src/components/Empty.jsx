import React from "react";
import { StyleSheet, View } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { verticalScale, moderateScale } from 'react-native-size-matters';

import CustomText from "./UI/Custom/CustomText";
import CustomButton from "./UI/Custom/CustomButton";

import { colors } from "../constants/colors";


export default function Empty({ 
  icon, 
  emoji,
  message, 
  centered=true, 
  refresh,
}) {
  return (
    <View
      style={{
        ...styles.container,
        justifyContent:centered?'center' : 'flex-start'
      }}
    >
      {icon
        ? 
          <FontAwesomeIcon 
            icon={icon}
            color={colors.tint}
            size={verticalScale(70)}
            style={{ marginBottom:verticalScale(14) }}
          />
        : 
          <CustomText style={{ fontSize:verticalScale(80), marginBottom:verticalScale(14) }}>
            {emoji}
          </CustomText>
      }
      
      <CustomText
        fontSize="medium"
        style={{
          color:colors.tint,
          maxWidth:moderateScale(200),
          textAlign:'center'
        }}
      >
        {message}
      </CustomText>
      { refresh
        ?
          <CustomButton
            shadow
            onClick={() => refresh()}
            style={styles.button}
          >
            <CustomText
              fontSize="medium"
              style={{
                fontWeight:'600', 
                color:colors.white,
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

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    paddingVertical:verticalScale(120),
    backgroundColor:colors.primary,
  },
  button: {
    marginTop:verticalScale(14),        
    width:moderateScale(150),
    borderWidth:2,
    borderColor:colors.tint,
    backgroundColor:colors.accent, 
  },

})