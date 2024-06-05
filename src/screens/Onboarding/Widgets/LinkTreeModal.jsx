import React from "react";
import {
  View
} from 'react-native';

import {
  verticalScale,
  moderateScale,
} from 'react-native-size-matters';

import BaseWidgetModal from "./BaseWidgetModal";
import CustomText from "../../../components/UI/Custom/CustomText";
import CustomTextInput from "../../../components/UI/Custom/CustomInput";
import CustomLabel from "../../../components/UI/Label";
import CustomNextButton from "../CustomNextButton";


export default function LinkTreeModal({
  colors,
  label,
  navigation,
}) {
  return (
    <BaseWidgetModal
      colors={colors}
      label={label}
      navigation={navigation}
    >
      <View style={{ alignItems:'center', marginTop:verticalScale(10) }}>
        <CustomLabel color={colors.constWhite} label={'Add the title of your link!'} />
        <CustomTextInput 
          autoCorrect={false}
          placeholder={'Ex. Instagram'}
          // value={form.graduation_year}
          // onChangeText={graduation_year => setForm({ ...form, graduation_year:graduation_year })}
          colors={colors}
          style={{
            marginTop:verticalScale(5),
            height:verticalScale(45),
            marginBottom:verticalScale(14),
            backgroundColor:colors.secondary,
            color:colors.tint,
            borderRadius:0,
            borderWidth:2,
            borderColor:colors.constBlack,
            fontSize:verticalScale(14),
            width:moderateScale(150)
          }}
        />
        <CustomLabel color={colors.constWhite} label={'Add the link here!'} />
        <CustomTextInput 
        autoCorrect={false}
        placeholder={'Ex. https://'}
        colors={colors}
        style={{
          marginTop:verticalScale(5),
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
      <CustomNextButton 
        colors={colors}
        onClick={() => {
          console.log('submitted linktree')
        }}
        text={'Good to go!'}
      />
    </BaseWidgetModal>
  )
}