import React from "react";
import {
  View
} from 'react-native';

import { 
  moderateScale, 
  verticalScale 
} from "react-native-size-matters";

import Base from "./Components/Base";
import Label from "./Components/Label";
import CustomTextInput from "../../components/UI/Custom/CustomInput";

import useGlobal from "../../core/global";
import { colors } from "../../constants/colors";


export default function MajorScreen({ navigation }) {

  const form = useGlobal(state => state.form)
  const setForm = useGlobal(state => state.setForm)

  const setMajor = (input) => {
    setForm({ ...form, major:input })
  }

  return (
    <Base>
      <View style={{ alignItems:'center', marginVertical:verticalScale(30) }}>
        <Label text="What do you want to major in?" style={{ marginVertical:verticalScale(20) }} />
        <CustomTextInput 
          autoCorrect={false}
          placeholder={'Ex. Business'}
          value={form.major}
          onChangeText={input => setMajor(input)}
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