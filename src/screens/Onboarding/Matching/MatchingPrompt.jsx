import React from "react";
import {
  SafeAreaView,
  View,
} from 'react-native';

import { verticalScale, moderateScale } from 'react-native-size-matters';

import CustomText from "../../../components/UI/Custom/CustomText";
import CustomButton from "../../../components/UI/Custom/CustomButton";

import { colors } from "../../../constants/colors";


export default function MatchingPromptScreen({ navigation }) {
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
          Want to take our roommate matching quiz?
        </CustomText>
        <CustomText
          style={{
            textAlign:'center',
            fontSize:verticalScale(13),
          }}
        >
          This'll up our game in matching you with people you'll get along with better!
        </CustomText>
        <CustomText
          style={{
            textAlign:'center',
            fontSize:verticalScale(12),
            fontWeight:'500',
            marginVertical:verticalScale(7)
          }}
        >
          (P.S. Only 9 questions)
        </CustomText>
      </View> 
      
      <CustomButton
        onClick={() => navigation.navigate('done')}
        style={{ borderWidth:0 }}
      >
        <CustomText
          style={{
            fontSize:verticalScale(12),
            fontWeight:'bold',
            color:colors.tint,
            textDecorationLine:'underline'
          }}
        >
          Nah, I'll do it later
        </CustomText>
      </CustomButton>
      <CustomButton
        onClick={() => navigation.navigate('social-battery')}
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
          Let's do it!
        </CustomText>
      </CustomButton>
    </SafeAreaView>
  )
}