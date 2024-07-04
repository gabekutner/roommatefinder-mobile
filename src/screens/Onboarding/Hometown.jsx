import React from "react";
import { moderateScale, verticalScale } from "react-native-size-matters";
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
    <CustomTextInput 
      autoCorrect={false}
      placeholder={'Ex. San Francisco, CA'}
      value={form.hometown}
      onChangeText={input => setHometown(input)}
      colors={colors}
      icon={'location-dot'}
      iconColor={colors.tertiary}
      iconSize={verticalScale(13)}
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
  )
}