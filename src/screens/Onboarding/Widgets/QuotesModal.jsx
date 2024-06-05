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
import CustomNextButton from "../CustomNextButton";
import CustomTextInput from "../../../components/UI/Custom/CustomInput";
import CustomLabel from "../../../components/UI/Label";


export default function QuotesModal({
  colors,
  label,
  buttonLabel,
  navigation,
  onActionPress,
}) {
  return (
    <BaseWidgetModal
      colors={colors}
      label={label}
      // buttonLabel={buttonLabel}
      navigation={navigation}
      onActionPress={onActionPress}
    >
      <View style={{ alignItems:'center', marginTop:verticalScale(10) }}>
        <CustomLabel color={colors.constWhite} label={'Add your quote here!'} />
        <CustomTextInput 
          autoCorrect={false}
          placeholder={'Ex. If you want to make the world a better place, take a look at yourself and make a change. Hooo.'}
          // value={form.graduation_year}
          // onChangeText={graduation_year => setForm({ ...form, graduation_year:graduation_year })}
          colors={colors}
          multiline={true}
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
            width:moderateScale(240),
            height:verticalScale(150),
            paddingTop:verticalScale(10)
          }}
        />
        <CustomLabel color={colors.constWhite} label={"Don't forget to cite!"} />
          <CustomTextInput 
          autoCorrect={false}
          placeholder={'Ex. Lego Batman'}
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
            width:moderateScale(200)
          }}
        />
      </View>
      <CustomNextButton 
        colors={colors}
        onClick={() => {
          console.log('submitted quotes')
        }}
        text={'Good to go!'}
      />
    </BaseWidgetModal>
  )
}