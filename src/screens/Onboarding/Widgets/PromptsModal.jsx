import React, { useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';

import {
  verticalScale,
  moderateScale,
} from 'react-native-size-matters';

import BaseWidgetModal from "./BaseWidgetModal";
import CustomText from "../../../components/UI/Custom/CustomText";
import CustomLabel from "../../../components/UI/Label";
import CustomTextInput from "../../../components/UI/Custom/CustomInput";
import CustomNextButton from "../CustomNextButton";

import { prompts } from "../../../assets/Dictionary";
import useGlobal from "../../../core/global";


export default function PromptsModal({
  colors,
  label,
  buttonLabel,
  navigation,
  onActionPress,
}) {
  const form = useGlobal(state => state.form)
  const setForm = useGlobal(state => state.setForm)

  const [selected, setSelected] = useState("")

  const [prompt, setPrompt] = useState({
    question: '',
    answer: ''
  })
  const handlePrompt = () => {
    const arr = [...form.prompts]
    arr.push({ question:prompt.question, answer:prompt.answer })
    setForm({ ...form, prompts:arr })
  }

  const toggleSelected = (key) => {
    setSelected(key)
    setPrompt({ ...prompt, question:key })
  }

  return (
    <BaseWidgetModal
      colors={colors}
      label={label}
      buttonLabel={buttonLabel}
      navigation={navigation}
      onActionPress={onActionPress}
    >

      <View style={{ alignItems:'center' }}>
        <CustomLabel color={colors.constWhite} label={'Answer here!'} />
        <CustomTextInput 
          autoCorrect={false}
          placeholder={'Ex. '}
          value={prompt.answer}
          onChangeText={input => setPrompt({ ...prompt, answer:input })}
          colors={colors}
          multiline={true}
          style={{
            marginTop:verticalScale(7),
            marginBottom:verticalScale(10),            
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
        <FlatList
          showsVerticalScrollIndicator={false}
          data={prompts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => toggleSelected(item.id)}
              style={[
                styles.option, 
                {
                  borderColor: colors.constBlack,
                  backgroundColor:selected === item.id ? colors.wasatchSun : colors.accentDark,
                  shadowColor: '#222',
                  shadowOffset: { width: 7, height: 5 },
                  shadowOpacity: 1,
                  shadowRadius: 1,  
                }
              ]}
            >
              <CustomText 
                style={[
                  styles.text, 
                  { 
                    color:selected === item.id ? colors.tint : colors.constWhite
                  }
                ]}
              >
                {item.prompt}
              </CustomText>
            </TouchableOpacity>
          )}
          style={{
            flexDirection:'column', 
            marginHorizontal:moderateScale(50),
            height:'30%',
            marginTop:verticalScale(10),
            marginBottom:verticalScale(-30),
          }}
        /> 
      </View>
      <CustomNextButton 
        colors={colors}
        onClick={() => {
          handlePrompt()
          navigation.navigate('widgets')
        }}
        text={'Good to go!'}
      />
    </BaseWidgetModal>
  )
}

const styles = StyleSheet.create({
  option: {
    paddingVertical:10,
    paddingHorizontal:30,
    borderWidth:2,
    alignItems:'center',
    marginBottom:20,
  },
  text: { 
    fontSize:verticalScale(14),
    fontWeight:'600',
  },
})