import React from "react";
import {
  View,
  StyleSheet,
} from 'react-native';

import { 
  moderateScale, 
  verticalScale 
} from "react-native-size-matters";

import Base from "../Base";
import CustomButton from "../../../components/UI/Custom/CustomButton";
import CustomText from "../../../components/UI/Custom/CustomText";
import CustomNextButton from "../CustomNextButton";

import useGlobal from "../../../core/global";
import { colors as c } from "../../../assets/config";


export default function BaseWidgetsScreen({ navigation }) {

  const form = useGlobal(state => state.form)
  const setForm = useGlobal(state => state.setForm)
  const theme = useGlobal(state => state.theme)
  const colors = c[theme]
  const label = "Customize your profile with prompts, quotes, and social handles!"

  return (
    <Base navigation={navigation} label={label} >
      <View 
        style={{ 
          alignItems:'center',
          flexDirection:'row',
          gap:10,
          justifyContent:'center'
        }}
      >
        <CustomButton 
          onClick={() => navigation.navigate('prompts')}
          style={{ ...styles.option, backgroundColor:colors.accentDark }}
        >
          <CustomText style={{ ...styles.optionText,  color:colors.constWhite }}>Prompts</CustomText>
        </CustomButton>
        <CustomButton 
          onClick={() => navigation.navigate('quotes')}
          style={{ ...styles.option, backgroundColor:colors.accentDark }}
        >
          <CustomText style={{ ...styles.optionText,  color:colors.constWhite }}>Quotes</CustomText>
        </CustomButton>
        <CustomButton 
          onClick={() => navigation.navigate('linktree')}
          style={{ ...styles.option, backgroundColor:colors.accentDark }}
        >
          <CustomText style={{ ...styles.optionText, color:colors.constWhite }}>LinkTree</CustomText>
        </CustomButton>
      </View>
      <CustomNextButton 
        colors={colors}
        onClick={() => {
          navigation.navigate('photos')
          // console.log(form)
        }}
        text={'Next Step'}
      />
    </Base>
  )
}

const styles = StyleSheet.create({
  option: {
    height:verticalScale(80),
    width:moderateScale(100),
    borderRadius:0,
    borderWidth:2,
    alignItems:'center',
    justifyContent:'center',
    shadowOffset: { width: 7, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 1,  

  },
  optionText: {
    fontSize:verticalScale(12),
    fontWeight:'500',
  }
})