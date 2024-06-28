import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  FlatList,
  View,
  StyleSheet,
} from 'react-native';

import { 
  verticalScale,
  moderateScale
} from "react-native-size-matters";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import Base from "../Components/Base";
import CustomButton from "../../../components/UI/Custom/CustomButton";
import CustomText from "../../../components/UI/Custom/CustomText";
import CustomTextInput from "../../../components/UI/Custom/CustomInput";

import useGlobal from "../../../core/global";
import { colors } from "../../../constants/colors";
import { prompts } from "../../../assets/Dictionary";


export default function QuotesScreen({ navigation }) {

  const form = useGlobal(state => state.form)
  const setForm = useGlobal(state => state.setForm)

  const [prompt, setPrompt] = useState({
    question:"",
    answer:"",
  })

  const [selected, setSelected] = useState("")
  function toggleSelected(key) {
    setSelected(key)
    setPrompt({ ...prompt, question:key })
  }

  const handleForm = () => {
    if (prompt.question && prompt.answer) {
      const arr = [...form.prompts]
      arr.push({ question:prompt.question, answer:prompt.answer })
      setForm({ ...form, prompts:arr })
      setPrompt({ ...prompt, question:'', answer:'' })
    } else {
      return
    }
  }

  return (
    <SafeAreaView style={{ flex:1, backgroundColor:colors.primary }}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <Base>
            <View style={styles.wrapper}>
              <CustomTextInput 
                autoCorrect={false}
                multiline={true}
                placeholder={'Ex. Ninja Turtles'}
                value={prompt.answer}
                onChangeText={input => setPrompt({ ...prompt, answer:input })}
                colors={colors}
                emoji={'🧐'}
                containerStyle={{
                  height:verticalScale(75),
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

              <FlatList 
                showsVerticalScrollIndicator={false}
                data={prompts}
                keyExtractor={item => item.id}
                style={{ height:verticalScale(300), marginHorizontal:moderateScale(20) }}
                renderItem={({ item }) => (
                  <CustomButton 
                    onClick={() => toggleSelected(item.id)}
                    style={{
                      ...styles.option, 
                      backgroundColor: selected === item.id ? colors.accent : colors.secondary,
                    }}
                  >
                    <CustomText 
                      style={{
                        ...styles.text, 
                        color: selected === item.id ? colors.white : colors.tint
                      }}
                    >
                      {item.prompt}
                    </CustomText>
                  </CustomButton>
                )}
              />
              <CustomButton 
                onClick={() => handleForm()}
                style={{ 
                  ...styles.addLink, 
                  borderColor:colors.tint,
                  backgroundColor:colors.accent,
                  shadowColor:'#222',
                  shadowOffset: { width:5, height:3 },
                  shadowOpacity:1,
                  shadowRadius:1, 
                  borderRadius:0,
                  borderWidth:2
                }}
              >
                <CustomText style={{...styles.linkedText, color:colors.white }}>+ Add a prompt</CustomText>
              </CustomButton>
            </View>
          </Base>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  wrapper: {
    alignItems:'center',
    flexDirection:'column',
    gap:10,
    marginVertical:verticalScale(30)
  },
  option: {
    paddingVertical:verticalScale(10),
    paddingHorizontal:moderateScale(50),
    borderWidth:2,
    shadowColor: '#222',
    shadowOffset: { width: 7, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 1,
    marginBottom:verticalScale(10),
    borderRadius:0,
    borderColor: colors.tint,
  },
  text: {
    fontSize:verticalScale(14), 
    fontWeight:'600',
    textAlign:'center',
    letterSpacing:0.15,
  },
  linkedText: {
    fontSize:verticalScale(12),
    fontWeight:'500',
  },
  addLink: {
    padding:verticalScale(15),
    marginBottom:verticalScale(10)
  },
})

//   return (
//     <KeyboardAvoidingView style={styles.container} behavior="padding">
//       <Base>  
        
//           <Label text="Answer a question or two!" style={{ marginVertical:verticalScale(20) }} />

//           <Label 
//             text="Prompt" 
//             style={{ 
//               fontSize:verticalScale(14), 
//               alignSelf:'flex-start',
//               marginLeft:moderateScale(42)
//             }} 
//           />


//           <Label 
//             text="Answer" 
//             style={{ 
//               fontSize:verticalScale(14), 
//               alignSelf:'flex-start',
//               marginLeft:moderateScale(42)
//             }} 
//           />
          

          
          
//           { form.prompts
//             ?
//               <FlatList 
//                 showsVerticalScrollIndicator={false}
//                 data={form.prompts}
//                 keyExtractor={item => item.question}
//                 style={{ marginBottom:verticalScale(360) }}
//                 renderItem={({ item }) => (
//                   <View 
//                     style={{
//                       ...styles.linked, 
//                       borderColor: colors.tint,
//                       backgroundColor: colors.secondary
//                     }}
//                   >
//                     <View style={{ ...styles.questionBox }}>
//                       <CustomText style={{ ...styles.question, color:colors.tint }}>{prompts[item.question-1].prompt}</CustomText>
//                     </View>
//                     <View style={{ ...styles.answerBox }}>
//                       <CustomText style={{ ...styles.answer, color:colors.tint }}>{item.answer}</CustomText>
//                     </View>
//                   </View>
//                 )}
//               />
//             : null
//           }
//         </View>
//       </Base>
//     </KeyboardAvoidingView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   linked: {
//     borderWidth:1,
//     borderRadius:0,
//     marginBottom:verticalScale(10),
//     shadowColor: '#222',
//     shadowOffset: { width: 7, height: 5 },
//     shadowOpacity: 1,
//     shadowRadius: 1,  
//   },
  
//   questionBox: {
//     borderBottomWidth:1,
//     width:'100%',
//     padding:verticalScale(15),
//     paddingBottom:verticalScale(8),
//     paddingLeft:verticalScale(8),
//     paddingTop:verticalScale(8),

//   },
//   question: {
//     fontSize:verticalScale(14),
//     fontWeight:'600',
//   },
//   answerBox: {
//     marginTop:verticalScale(6),
//     padding:verticalScale(10)
//   },
//   answer: {
//     fontSize:verticalScale(12)
//   },
  
//   text: { 
//     fontSize:verticalScale(14),
//     fontWeight:'600',
//   },
// })