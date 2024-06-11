import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';

import { 
  verticalScale,
  moderateScale
} from "react-native-size-matters";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import Base from "../Components/Base";
import Label from "../Components/Label";
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
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Base>  
        <View 
          style={{ 
            alignItems:'center',
            flexDirection:'column',
            gap:10,
            marginVertical:verticalScale(30)
          }}
        >
          <Label text="Answer a question or two!" style={{ marginVertical:verticalScale(20) }} />

          <Label 
            text="Prompt" 
            style={{ 
              fontSize:verticalScale(14), 
              alignSelf:'flex-start',
              marginLeft:moderateScale(42)
            }} 
          />
          <FlatList 
            showsVerticalScrollIndicator={false}
            data={prompts}
            keyExtractor={item => item.id}
            style={{ 
              height:verticalScale(130),
              marginHorizontal:moderateScale(20)
            }}
            renderItem={({ item }) => (
              <TouchableOpacity 
                onPress={() => toggleSelected(item.id)}
                style={[
                  styles.option, 
                  { 
                    borderColor: colors.tint,
                    backgroundColor: selected === item.id ? colors.accent : colors.secondary,
                    shadowColor: '#222',
                    shadowOffset: { width: 7, height: 5 },
                    shadowOpacity: 1,
                    shadowRadius: 1,
                    marginBottom:verticalScale(10)
                  }
                ]}
              >
                <CustomText 
                  style={[
                    styles.text, 
                    { 
                      color: selected === item.id ? colors.white : colors.tint
                    }
                  ]}
                >
                  {item.prompt}
                </CustomText>
              </TouchableOpacity>
            )}
          />

          <Label 
            text="Answer" 
            style={{ 
              fontSize:verticalScale(14), 
              alignSelf:'flex-start',
              marginLeft:moderateScale(42)
            }} 
          />
          <CustomTextInput 
            autoCorrect={false}
            multiline={true}
            placeholder={'Ex. Ninja Turtles'}
            value={prompt.answer}
            onChangeText={input => setPrompt({ ...prompt, answer:input })}
            colors={colors}
            style={{
              height:verticalScale(45),
              marginBottom:verticalScale(14),
              backgroundColor:colors.secondary,
              color:colors.tint,
              borderRadius:0,
              borderWidth:2,
              borderColor:colors.tint,
              fontSize:verticalScale(14),
              width:'80%',
              height:verticalScale(75),
              paddingTop:verticalScale(12),
            }}
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
            <CustomText style={[styles.linkedText, { color:colors.white }]}>+ Add a prompt</CustomText>
          </CustomButton>
          
          { form.prompts
            ?
              <FlatList 
                showsVerticalScrollIndicator={false}
                data={form.prompts}
                keyExtractor={item => item.question}
                style={{ marginBottom:verticalScale(360) }}
                renderItem={({ item }) => (
                  <View 
                    style={{
                      ...styles.linked, 
                      borderColor: colors.tint,
                      backgroundColor: colors.secondary
                    }}
                  >
                    <View style={{ ...styles.questionBox }}>
                      <CustomText style={{ ...styles.question, color:colors.tint }}>{prompts[item.question-1].prompt}</CustomText>
                    </View>
                    <View style={{ ...styles.answerBox }}>
                      <CustomText style={{ ...styles.answer, color:colors.tint }}>{item.answer}</CustomText>
                    </View>
                  </View>
                )}
              />
            : null
          }
        </View>
      </Base>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  linked: {
    borderWidth:1,
    borderRadius:0,
    marginBottom:verticalScale(10),
    shadowColor: '#222',
    shadowOffset: { width: 7, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 1,  
  },
  linkedText: {
    fontSize:verticalScale(12),
    fontWeight:'500',
  },
  addLink: {
    padding:verticalScale(15),
    marginBottom:verticalScale(10)
  },
  questionBox: {
    borderBottomWidth:1,
    width:'100%',
    padding:verticalScale(15),
    paddingBottom:verticalScale(8),
    paddingLeft:verticalScale(8),
    paddingTop:verticalScale(8),

  },
  question: {
    fontSize:verticalScale(14),
    fontWeight:'600',
  },
  answerBox: {
    marginTop:verticalScale(6),
    padding:verticalScale(10)
  },
  answer: {
    fontSize:verticalScale(12)
  },
  option: {
    paddingVertical:verticalScale(10),
    paddingHorizontal:moderateScale(50),
    borderWidth:2,
  },
  text: { 
    fontSize:verticalScale(14),
    fontWeight:'600',
  },
})