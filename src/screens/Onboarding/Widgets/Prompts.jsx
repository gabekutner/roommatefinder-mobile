import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
} from 'react-native';

import { verticalScale } from "react-native-size-matters";

import Base from "../Base";
import CustomButton from "../../../components/UI/Custom/CustomButton";
import CustomText from "../../../components/UI/Custom/CustomText";
import PromptsModal from "./PromptsModal";

import useGlobal from "../../../core/global";
import { colors as c } from "../../../assets/config";


export default function PromptsScreen({ navigation }) {

  const form = useGlobal(state => state.form)
  const setForm = useGlobal(state => state.setForm)
  const theme = useGlobal(state => state.theme)
  const colors = c[theme]

  const [show, setShow] = useState(false)
  const label = "Answer a couple questions!"
  const buttonLabel = "That's good"
  const modalLabel = "Add a prompt!"
  const modalButtonLabel = "Good to go"

  // get users prompts and populate them here
  // temporary
  const userPrompts = [
    {
      id: "1",
      question: "Hot take:",
      answer: "I hate pineapple on pizza",
    },
  ]

  return (
    <Base navigation={navigation} next={'widgets'} label={label} buttonLabel={buttonLabel} >
      <View 
        style={{ 
          alignItems:'center',
          flexDirection:'column',
          gap:10,
        }}
      >
        <CustomButton 
          onClick={() => setShow(true)}
          style={{ 
            ...styles.addLink, 
            borderColor:colors.constWhite
          }}
        >
          <CustomText style={[styles.linkedText, { color:colors.constWhite }]}>+ Add a prompt</CustomText>
        </CustomButton>
        <FlatList 
          showsVerticalScrollIndicator={false}
          data={userPrompts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View 
              style={{
                ...styles.linked, 
                borderColor: colors.constBlack,
                backgroundColor: colors.accentDark
              }}
            >
              <View style={{ ...styles.questionBox }}>
                <CustomText style={{ ...styles.question, color:colors.constWhite }}>{item.question}</CustomText>
              </View>
              <View style={{ ...styles.answerBox }}>
                <CustomText style={{ ...styles.answer, color:colors.constWhite }}>{item.answer}</CustomText>
              </View>
            </View>
          )}
        />
      </View>
      { show
        ?
          <PromptsModal 
            colors={colors}
            label={modalLabel}
            buttonLabel={modalButtonLabel}
            navigation={navigation}
            onActionPress={setShow}
          />
        : null
      }
    </Base>
  )
}

const styles = StyleSheet.create({
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
    textShadowColor:'#222',
    textShadowRadius:10,
    textShadowOffset: [{ width:15, height:15 }],
  },
  answerBox: {
    marginTop:verticalScale(6),
    padding:verticalScale(10)
  },
  answer: {
    fontSize:verticalScale(12)
  },
})