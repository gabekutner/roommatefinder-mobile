import React, { useState } from "react";
import {
  View
} from 'react-native';

import {
  verticalScale,
  moderateScale,
} from 'react-native-size-matters';

import BaseWidgetModal from "./BaseWidgetModal";
import CustomNextButton from "../CustomNextButton";
import CustomTextInput from "../../../components/UI/Custom/CustomInput";
import CustomLabel from "../../../components/UI/Label";
import useGlobal from "../../../core/global";


export default function QuotesModal({
  colors,
  label,
  navigation,
  onActionPress,
}) {

  const form = useGlobal(state => state.form)
  const setForm = useGlobal(state => state.setForm)

  const [quote, setQuote] = useState({
    quote: '',
    cited: ''
  })
  const handleQuote = () => {
    const arr = [...form.quotes]
    arr.push({ quote:quote.quote, cited:quote.cited })
    setForm({ ...form, quotes:arr })
  }

  return (
    <BaseWidgetModal
      colors={colors}
      label={label}
      navigation={navigation}
      onActionPress={onActionPress}
    >
      <View style={{ alignItems:'center', marginTop:verticalScale(10) }}>
        <CustomLabel color={colors.constWhite} label={'Add your quote here!'} />
        <CustomTextInput 
          autoCorrect={false}
          placeholder={'Ex. If you want to make the world a better place, take a look at yourself and make a change. Hooo.'}
          value={quote.quote}
          onChangeText={input => setQuote({ ...quote, quote:input })}
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
          value={quote.cited}
          onChangeText={input => setQuote({ ...quote, cited:input })}
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
          handleQuote()
          navigation.navigate('widgets')
        }}
        text={'Good to go!'}
      />
    </BaseWidgetModal>
  )
}