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


export default function HomeTownScreen({ navigation }) {

  const form = useGlobal(state => state.form)
  const setForm = useGlobal(state => state.setForm)

  const setHometown = (input) => {
    var hometown = input.split(', ')
    setForm({ ...form, city:hometown[0], state:hometown[1] })
  }

  return (
    <Base>
      <View style={{ alignItems:'center', marginVertical:verticalScale(30), marginHorizontal:moderateScale(50) }}>
        <Label text="Where are you from?" style={{ marginVertical:verticalScale(20) }} />
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
          }}
        />
      </View>
    </Base>
  )
}