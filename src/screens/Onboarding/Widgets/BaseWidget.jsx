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
          flexDirection:'column',
          gap:8,
          justifyContent:'center',
        }}
      >

        <CustomButton 
          onClick={() => navigation.navigate('prompts')}
          style={{ 
            ...styles.option, 
            marginRight:moderateScale(75)
            
          }}
        >
          <CustomText style={{ ...styles.optionText }}>Prompts</CustomText>
        </CustomButton>

        <CustomButton 
          onClick={() => navigation.navigate('quotes')}
          style={{ 
            ...styles.option, 
            marginLeft:moderateScale(75)
          }}
        >
          <CustomText style={{ ...styles.optionText }}>Quotes</CustomText>
        </CustomButton>

        <CustomButton 
          onClick={() => navigation.navigate('linktree')}
          style={{ 
            ...styles.option, 
            marginRight:moderateScale(75)
          }}
        >
          <CustomText style={{ ...styles.optionText }}>LinkTree</CustomText>
        </CustomButton>

      </View>
    </Base>
  )
}

const styles = StyleSheet.create({
  option: {
    height:160,
    width:160,
    borderRadius:0,
    borderWidth:2,
    alignItems:'center',
    justifyContent:'center',
    shadowOffset: { width: 7, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 1,  
    backgroundColor:colors.secondary
  },
  optionText: {
    fontSize:verticalScale(17),
    fontWeight:'bold',
    color:colors.tint
  }
})