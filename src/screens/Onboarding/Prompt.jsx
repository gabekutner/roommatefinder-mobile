import React from "react";
import {
  SafeAreaView,
  View
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
      <View
        style={{
          marginHorizontal:moderateScale(30),
          marginVertical:verticalScale(100)
        }}
      >
        <CustomText
          style={{
            textAlign:'center',
            fontSize:verticalScale(17),
            marginBottom:verticalScale(15),
            fontWeight:'bold'
          }}
        >
          Ready to kick off your profile?
        </CustomText>
        <CustomText
          style={{
            textAlign:'center',
            fontSize:verticalScale(13),
          }}
        >
          It'll only take a couple of minutes.
        </CustomText>
      </View> 

      <CustomButton
        onClick={() => navigation.navigate('age')}
        style={{ 
          backgroundColor:colors.accent,
          paddingVertical:verticalScale(15),
          paddingHorizontal:moderateScale(30),
          flexDirection:'row',
          gap:moderateScale(20),
          shadowColor:'#222',
          shadowOffset: { width:5, height:3 },
          shadowOpacity:1,
          shadowRadius:1, 
          borderRadius:0,
          borderWidth:2
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