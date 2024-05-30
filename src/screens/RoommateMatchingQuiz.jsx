// https://www.slu.edu/beabilliken/quizzes-checklists/roommate-readiness-quiz.php
import React, { useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';

import CustomText from "../components/UI/Custom/CustomText";

import { quiz } from '../assets/Dictionary';



function AnswerOptions({ 
  item, 
  colors, 
  form, 
  setForm, 
  key 
}) {

  const [selected, setSelected] = useState(false)

  return (
    <View
      style={{
        flexDirection:'row',
        gap:10,
        marginBottom:20,
        flexWrap:'wrap'
      }}
    >
      <TouchableOpacity 
        onPress={() => {
          let copy = { ...form }
          copy[key] = item.id
          setForm(copy)
          setSelected(true)
        }}
        style={{
          padding:13,
          borderRadius:12,
          borderWidth:.5,
          borderColor:selected ? colors.accent : colors.tint,
          backgroundColor:colors.secondary
        }}
      >
        <CustomText
          style={{
            color:colors.tertiary,
            fontSize:18
          }}
        >
          {item.answer}
        </CustomText>
      </TouchableOpacity>
    </View>
  )
}


function QuizForm({ item, colors, form, setForm }) {

  const key = `question${item.id}`

  return (
    <View
      style={{
        borderWidth:1,
        borderColor:colors.tint,
        borderRadius:12,
        backgroundColor:colors.secondary,
        marginBottom:20
      }}
    >
      <View style={{ padding:20 }} >
        <CustomText
          style={{
            color:colors.tint,
            fontSize:20,
            fontWeight:'600',
          }}
        >
          {item.question}
        </CustomText>
      </View>
      <View
        style={{
          backgroundColor:colors.primary,
          borderRadius:12,
          padding:15
        }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          data={item.answers}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <AnswerOptions item={item} colors={colors} form={form} setForm={setForm} key={key} />}
        />
      </View>
    </View>
  )
}


export default function RoommateMatchingQuiz({ colors }) {

  const [form, setForm] = useState({
    question1: null,
    question2: null,
    question3: null,
    question4: null,
    question5: null,
    question6: null,
    question7: null,
  })

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={quiz}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <QuizForm item={item} colors={colors} form={form} setForm={setForm} />}
    />  
  )
}