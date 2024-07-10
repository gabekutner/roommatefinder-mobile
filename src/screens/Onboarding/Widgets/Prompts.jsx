import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ImageBackground,
  FlatList
} from 'react-native';

import { verticalScale, moderateScale } from "react-native-size-matters";

import WidgetsModal from "../../../components/Modals/WidgetsModal";
import CustomButton from "../../../components/UI/Custom/CustomButton";
import CustomText from "../../../components/UI/Custom/CustomText";
import CustomTextInput from '../../../components/UI/Custom/CustomInput'

import useStore from "../../../zustand/store";
import { colors } from "../../../constants/colors";
import { prompts } from "../../../assets/Dictionary";


export default function PromptsScreen({ navigation, route }) {

  const { preview } = route.params

  const form = useStore(state => state.form)
  const setForm = useStore(state => state.setForm)

  const [showPrompts, setShowPrompts] = useState(false)
  const [prompt, setPrompt] = useState({
    question:"",
    answer:"",
  })

  const [selected, setSelected] = useState(-1)
  
  const handleForm = () => {
    if (selected != -1 && prompt.answer) {
      const arr = [...form.prompts]
      arr.push({ question:selected, answer:prompt.answer })
      setForm({ ...form, prompts:arr })
      setPrompt({ ...prompt, question:'', answer:'' })
    } else {
      return
    }
  }

  return (
    <ImageBackground 
      source={require('../../../assets/images/image_part_003.png')}
      style={{ flex:1, backgroundColor:colors.primary }}
      imageStyle={{ opacity:0.5 }}
    >
      <KeyboardAvoidingView behavior="padding" style={{ flex:1 }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <View style={styles.wrapper}>
              <View style={{ marginBottom:verticalScale(20), alignItems:'center' }}>

                <CustomText fontSize="xx-large" style={styles.title}>
                  Answer a question!
                </CustomText>

                {/* flatlist */}
                <FlatList 
                  showsVerticalScrollIndicator={false}
                  data={prompts}
                  renderItem={({ item }) => {
                    return (
                      <CustomButton 
                        shadow
                        onClick={() => setSelected(item.id)} 
                        style={{ 
                          ...styles.flatlistItem,
                          backgroundColor:selected === item.id ? colors.accent : colors.primary
                        }}
                      >
                        <CustomText 
                          fontSize="medium"
                          style={{ 
                            ...styles.text, 
                            marginHorizontal:moderateScale(10),
                            fontWeight:'500',
                            color:selected === item.id ? colors.white : colors.tint
                          }}
                        >
                          {item.prompt}
                        </CustomText>
                      </CustomButton>
                    )
                  }}
                  style={styles.flatlist}
                />
                
                <CustomTextInput 
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  placeholder={'Ninja Turtles'}
                  value={prompt.answer}
                  onChangeText={value => setPrompt({ ...prompt, answer:value })}
                  icon="comment"
                  iconColor={colors.tertiary}
                  colors={colors}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.text}
                />

                <CustomButton 
                  shadow
                  onClick={() => {
                    handleForm()
                    navigation.goBack()
                  }} 
                  style={styles.buttonStyle}
                >
                  <CustomText fontSize="large" style={styles.buttonText}>
                    Submit
                  </CustomText>
                </CustomButton>
                
                {preview
                  ? <CustomButton onClick={() => setShowPrompts(true)} style={styles.pressableStyle}>
                      {showPrompts 
                        ? <WidgetsModal isVisible={showPrompts} setIsVisible={setShowPrompts} text={'prompts'} />
                        : null
                      }
                      <CustomText fontSize='medium' style={styles.pressableText}>
                        Preview Prompts
                      </CustomText>
                    </CustomButton>
                  : null
                }
  
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}
  
const styles = StyleSheet.create({
  container: {
    flex:1, 
    justifyContent:'center',
    width:'95%',
    alignSelf:'center',        
  },
  wrapper: {
    backgroundColor:colors.primary, 
    paddingVertical:verticalScale(10), 
    paddingHorizontal:moderateScale(25),
    borderRadius:12,
    borderWidth:2,
    shadowColor: '#000',
    shadowOffset: { width: 1.5, height: 2 },
    shadowOpacity: .7,
    shadowRadius: .6,  
  },
  title: {
    fontWeight:'600',
    marginVertical:verticalScale(15),
  },

  inputContainer: {
    height:verticalScale(45),
    marginBottom:verticalScale(14),
    backgroundColor:colors.secondary,
    borderRadius:12,
    borderWidth:2,
    borderColor:colors.tint,
    marginHorizontal:moderateScale(20)
  },
  text: { color:colors.tint },
  buttonStyle: {
    borderWidth:2,
    borderColor:colors.tint,
    backgroundColor:colors.accent,
    shadowColor: '#222',
    shadowOffset: { width: 7, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 1,  
    width:'90%'
  },
  buttonText: {
    fontWeight:'600', 
    color:colors.white,
  },
  flatlist: {
    backgroundColor:colors.secondary,
    width:'100%',
    height:'50%',
    paddingHorizontal:moderateScale(10),
    paddingVertical:verticalScale(10),
    marginBottom:verticalScale(15),
    borderRadius:12,
    borderWidth:2,
  },
  flatlistItem: {
    marginBottom:verticalScale(10),
    borderWidth:2,
    backgroundColor:colors.primary,
  },
  pressableStyle: {
    flexDirection:'row',
    gap:5,
    justifyContent:'center',
    borderWidth:0
  },
  pressableText: {
    fontWeight:'600',
    textAlign:'center',
    letterSpacing:0.15,
    color:colors.tint,
    textDecorationLine:'underline'
  },

})