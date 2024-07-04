import React from "react";
import { View, StyleSheet } from "react-native";

import { moderateScale, verticalScale } from "react-native-size-matters";

import CustomTextInput from "../../components/UI/Custom/CustomInput";
import useGlobal from "../../core/global";
import { colors } from "../../constants/colors";


export default function HomeTownScreen() {

  const form = useGlobal(state => state.form)
  const setForm = useGlobal(state => state.setForm)

  // const setHometown = (input) => {
  //   var hometown = input.split(', ')
  //   setForm({ ...form, city:hometown[0], state:hometown[1] })
  // }

  return (
    <View style={styles.container}>
      <CustomTextInput 
        autoCorrect={false}
        placeholder={'Ex. San Francisco'}
        value={form.city}
        onChangeText={value => setForm({ ...form, city:value })}
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
          width:'80%',
          paddingRight:moderateScale(45)
        }}
        inputStyle={{
          fontSize:verticalScale(14),
          color:colors.tint,
        }}
      />  
      <CustomTextInput 
        autoCorrect={false}
        placeholder={'CA'}
        value={form.state}
        onChangeText={value => setForm({ ...form, state:value })}
        colors={colors}
        // icon={'location-dot'}
        // iconColor={colors.tertiary}
        // iconSize={verticalScale(13)}
        containerStyle={{
          height:verticalScale(45),
          marginBottom:verticalScale(14),
          backgroundColor:colors.secondary,
          borderRadius:0,
          borderWidth:2,
          borderColor:colors.tint,
          width:'21%',
          paddingLeft:moderateScale(4)
          // paddingRight:moderateScale(45)
        }}
        inputStyle={{
          fontSize:verticalScale(14),
          color:colors.tint,
        }}
      />  

    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    gap:moderateScale(8),

  }
})