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
import CustomNextButton from "./CustomNextButton";

import useGlobal from "../../core/global";
import { colors as c } from "../../assets/config";


export default function GraduationYearScreen({ navigation }) {

  const form = useGlobal(state => state.form)
  const setForm = useGlobal(state => state.setForm)
  const theme = useGlobal(state => state.theme)
  const colors = c[theme]
  const label = "I'll graduate in ..."

  const setGradYear = (input) => {
    setForm({ ...form, graduation_year:input })
  }

  return (
    <Base navigation={navigation} label={label} >
      <View style={{ alignItems:'center' }}>
      <CustomTextInput 
        autoCorrect={false}
        placeholder={'Ex. 2028'}
        value={form.graduation_year}
        onChangeText={input => setGradYear(input)}
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
          width:moderateScale(110)
        }}
      />
      </View>
      <CustomNextButton 
        colors={colors}
        onClick={() => navigation.navigate('major')}
        text={'Next Step'}
      />
    </Base>
  )
}