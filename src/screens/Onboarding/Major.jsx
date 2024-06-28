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
      <View style={{ alignItems:'center', marginVertical:verticalScale(30), marginHorizontal:moderateScale(50) }}>
        <Label text="What do you want to major in?" style={{ marginVertical:verticalScale(20), textAlign:'center' }} />
        <CustomTextInput 
          autoCorrect={false}
          placeholder={'Ex. Business'}
          value={form.major}
          onChangeText={input => setMajor(input)}
          colors={colors}
          emoji={'🎓'}
          containerStyle={{
            height:verticalScale(45),
            marginBottom:verticalScale(14),
            backgroundColor:colors.secondary,
            borderRadius:0,
            borderWidth:2,
            borderColor:colors.tint,
            width:'90%',
            paddingRight:moderateScale(45)
          }}
          inputStyle={{
            fontSize:verticalScale(14),
            color:colors.tint,
          }}
        />
      </View>
    </Base>
  )
}