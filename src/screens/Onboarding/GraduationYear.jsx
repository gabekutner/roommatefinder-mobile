import React from "react";
import {
  View
} from 'react-native';

import { 
  moderateScale, 
  verticalScale 
} from "react-native-size-matters";

// import Base from "./Components/Base";
import Label from "./Components/Label";
import CustomTextInput from "../../components/UI/Custom/CustomInput";

import useGlobal from "../../core/global";
import { colors } from "../../constants/colors";


export default function GraduationYearScreen({ navigation }) {

  const form = useGlobal(state => state.form)
  const setForm = useGlobal(state => state.setForm)

  const setGradYear = (input) => {
    setForm({ ...form, graduation_year:input })
  }

  return (
    <>
      <View style={{ alignItems:'center', marginVertical:verticalScale(30), marginHorizontal:moderateScale(50) }}>
        <Label text="When will you graduate?" style={{ marginVertical:verticalScale(20) }} />
        <CustomTextInput 
          autoCorrect={false}
          placeholder={'Ex. 2028'}
          value={form.graduation_year}
          onChangeText={input => setGradYear(input)}
          colors={colors}
          emoji={'📅'}
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
    </>
  )
}