import React from "react";
import {
  SafeAreaView,
} from 'react-native';

import { 
  verticalScale,
  moderateScale
} from 'react-native-size-matters';

import CustomText from "../../components/UI/Custom/CustomText";
import CustomButton from "../../components/UI/Custom/CustomButton";

import { colors } from "../../constants/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";


export default function PromptScreen({ navigation }) {
  return (
    <SafeAreaView 
      style={{ 
        flex:1, 
        alignItems:'center',
        backgroundColor:colors.primary 
      }}
    >
      <CustomText
        style={{
          textAlign:'center',
          fontSize:verticalScale(17),
          marginHorizontal:moderateScale(30),
          marginVertical:verticalScale(100)
        }}
      >
        Let's get started with your profile! This'll take only a couple of minutes.
      </CustomText>
      <CustomButton
        onClick={() => navigation.navigate('age')}
        style={{ 
          backgroundColor:colors.accent,
          paddingVertical:verticalScale(15),
          paddingHorizontal:moderateScale(30),
          flexDirection:'row',
          gap:moderateScale(20)
        }}
      >
        <CustomText
          style={{
            fontSize:verticalScale(16),
            fontWeight:'bold',
            color:colors.white,
          }}
        >
          That way
        </CustomText>
        <FontAwesomeIcon 
          icon="arrow-right-to-bracket"
          size={verticalScale(20)}
          color={colors.white}
        />
      </CustomButton>
    </SafeAreaView>
  )
}