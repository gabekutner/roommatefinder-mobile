import React from "react";
import {
  View
} from 'react-native';

import { 
  moderateScale, 
  verticalScale 
} from "react-native-size-matters";

import Base from "./Base";
import CustomTextInput from "../../components/UI/Custom/CustomInput";

import useGlobal from "../../core/global";
import { colors as c } from "../../assets/config";


export default function MajorScreen({ navigation }) {

  const form = useGlobal(state => state.form)
  const setForm = useGlobal(state => state.setForm)
  const theme = useGlobal(state => state.theme)
  const colors = c[theme]
  const label = "I want to major in ... "

  return (
    <Base navigation={navigation} next={'interests'} label={label} >
      <View style={{ alignItems:'center' }}>
      <CustomTextInput 
        autoCorrect={false}
        placeholder={'Ex. Business'}
        value={form.major}
        onChangeText={major => setForm({ ...form, major:major })}
        colors={colors}
        style={{
          height:verticalScale(45),
          marginBottom:verticalScale(14),
          backgroundColor:colors.secondary,
          color:colors.tint,
          borderRadius:0,
          borderWidth:2,
          borderColor:colors.constBlack,
          fontSize:verticalScale(14),
          width:moderateScale(140)
        }}
      />
      </View>
    </Base>
  )
}