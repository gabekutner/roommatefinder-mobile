import React from "react";
import {
  View,
  StyleSheet,
} from 'react-native';

import { verticalScale } from "react-native-size-matters";

import Base from "../Base";
import CustomButton from "../../../components/UI/Custom/CustomButton";
import CustomText from "../../../components/UI/Custom/CustomText";

import useGlobal from "../../../core/global";
import { colors as c } from "../../../assets/config";


export default function BaseWidgetsScreen({ navigation }) {

  const form = useGlobal(state => state.form)
  const setForm = useGlobal(state => state.setForm)
  const theme = useGlobal(state => state.theme)
  const colors = c[theme]
  const label = "Customize your profile with prompts, quotes, and social handles!"
  const buttonLabel = "Next Step"

  return (
    <Base navigation={navigation} next={'photos'} label={label} buttonLabel={buttonLabel} >
      <View 
        style={{ 
          alignItems:'center',
          flexDirection:'column',
          gap:10,
        }}
      >
        <CustomButton 
          onClick={() => navigation.navigate('prompts')}
          style={{ ...styles.option, backgroundColor:colors.saltFlat }}
        >
          <CustomText style={styles.optionText}>Prompts</CustomText>
        </CustomButton>
        <CustomButton 
          onClick={() => navigation.navigate('quotes')}
          style={{ ...styles.option, backgroundColor:colors.saltFlat }}
        >
          <CustomText style={styles.optionText}>Quotes</CustomText>
        </CustomButton>
        <CustomButton 
          onClick={() => navigation.navigate('linktree')}
          style={{ ...styles.option, backgroundColor:colors.saltFlat }}
        >
          <CustomText style={{ ...styles.optionText }}>LinkTree</CustomText>
        </CustomButton>
      </View>
    </Base>
  )
}

const styles = StyleSheet.create({
  option: {
    height:120,
    width:120,
    // backgroundColor:'#fff',
    borderRadius:12,
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