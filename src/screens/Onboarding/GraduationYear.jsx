import React from "react";
import { moderateScale, verticalScale } from "react-native-size-matters";
import CustomTextInput from "../../components/UI/Custom/CustomInput";
import useGlobal from "../../core/global";
import { colors } from "../../constants/colors";


export default function GraduationYearScreen() {

  const form = useGlobal(state => state.form)
  const setForm = useGlobal(state => state.setForm)

  const setGradYear = (input) => {
    setForm({ ...form, graduation_year:input })
  }

  return (
    <CustomTextInput 
      autoCorrect={false}
      placeholder={'Ex. 2028'}
      value={form.graduation_year}
      onChangeText={input => setGradYear(input)}
      colors={colors}
      icon={'calendar-days'}
      iconColor={colors.tertiary}
      iconSize={verticalScale(13)}
      containerStyle={{
        height:verticalScale(45),
        marginBottom:verticalScale(14),
        backgroundColor:colors.secondary,
        borderRadius:0,
        borderWidth:2,
        borderColor:colors.tint,
        width:'50%',
        paddingRight:moderateScale(45)
      }}
      inputStyle={{
        fontSize:verticalScale(14),
        color:colors.tint,
      }}
    />
  )
}