import React from "react";
import {
  View
} from 'react-native';

import { moderateScale, verticalScale } from "react-native-size-matters";

import Base from "./Base";
import CustomTextInput from "../../components/UI/Custom/CustomInput";
import CustomNextButton from "./CustomNextButton";

import useGlobal from "../../core/global";
import { colors as c } from "../../assets/config";


export default function HomeTownScreen({ navigation }) {

  const form = useGlobal(state => state.form)
  const setForm = useGlobal(state => state.setForm)
  const theme = useGlobal(state => state.theme)
  const colors = c[theme]
  const label = "I'm from ..."

  const setHometown = (input) => {
    var hometown = input.split(', ')
    setForm({ ...form, city:hometown[0], state:hometown[1] })
  }

  return (
    <Base navigation={navigation} label={label} >
      <View style={{ alignItems:'center' }}>
      <CustomTextInput 
        autoCorrect={false}
        placeholder={'Ex. San Francisco, CA'}
        value={form.hometown}
        onChangeText={input => setHometown(input)}
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
          width:moderateScale(215)
        }}
      />
      </View>
      <CustomNextButton 
        colors={colors}
        onClick={() => navigation.navigate('graduation_year')}
        text={'Next Step'}
      />
    </Base>
  )
}