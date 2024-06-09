import React from "react";
import {
  View,
  StyleSheet,
} from 'react-native';

import { 
  moderateScale, 
  verticalScale 
} from "react-native-size-matters";

import Base from "../Components/Base";
import Label from "../Components/Label";
import CustomButton from "../../../components/UI/Custom/CustomButton";
import CustomText from "../../../components/UI/Custom/CustomText";

import useGlobal from "../../../core/global";
import { colors } from "../../../constants/colors";


export default function BaseWidgetsScreen({ navigation }) {
  return (
    <Base>
      <Label 
        text="Customize your profile with prompts, quotes, and your social handles!" 
        style={{ 
          marginTop:verticalScale(30),
          marginBottom:verticalScale(20),
          marginHorizontal:moderateScale(60),
          alignSelf:'center',
          textAlign:'center'
        }} 
      />
      <View 
        style={{ 
          alignItems:'center',
          flexDirection:'row',
          gap:10,
          justifyContent:'center',
        }}
      >
        <CustomButton 
          onClick={() => navigation.navigate('prompts')}
          style={{ ...styles.option, backgroundColor:colors.secondary }}
        >
          <CustomText style={{ ...styles.optionText,  color:colors.tint }}>Prompts</CustomText>
        </CustomButton>
        <CustomButton 
          onClick={() => navigation.navigate('quotes')}
          style={{ ...styles.option, backgroundColor:colors.secondary }}
        >
          <CustomText style={{ ...styles.optionText,  color:colors.tint }}>Quotes</CustomText>
        </CustomButton>
        <CustomButton 
          onClick={() => navigation.navigate('linktree')}
          style={{ ...styles.option, backgroundColor:colors.secondary }}
        >
          <CustomText style={{ ...styles.optionText, color:colors.tint }}>LinkTree</CustomText>
        </CustomButton>
      </View>
    </Base>
  )
}

const styles = StyleSheet.create({
  option: {
    height:100,
    width:100,
    borderRadius:0,
    borderWidth:2,
    alignItems:'center',
    justifyContent:'center',
    shadowOffset: { width: 7, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 1,  
  },
  optionText: {
    fontSize:verticalScale(14),
    fontWeight:'500',
  }
})