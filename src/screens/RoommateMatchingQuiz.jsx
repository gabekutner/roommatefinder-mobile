// https://www.slu.edu/beabilliken/quizzes-checklists/roommate-readiness-quiz.php
import React from "react";
import {
  View,
  FlatList
} from 'react-native';

import CustomText from "../components/UI/Custom/CustomText";

import { quiz } from '../assets/Dictionary';


function QuizForm({ item, colors }) {
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
      <View
        style={{
          padding:20,
        }}
      >
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
          renderItem={({ item }) => (
            <View
              style={{
                marginBottom:20
              }}
            >
              <CustomText
                style={{
                  color:colors.tertiary,
                  fontSize:18
                }}
              >{item.answer}</CustomText>
            </View>
          )}
        />
      </View>
    </View>
  )
}


export default function RoommateMatchingQuiz({ colors }) {

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={quiz}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <QuizForm item={item} colors={colors} />}
    />  
  )
}