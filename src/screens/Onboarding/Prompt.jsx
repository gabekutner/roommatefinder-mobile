import React from "react";
import {
  SafeAreaView,
  View,
} from 'react-native';

import CustomText from "../../components/UI/Custom/CustomText";
import CustomButton from "../../components/UI/Custom/CustomButton";

import { colors } from "../../constants/colors";

export default function PromptScreen({ 
  navigation
}) {
  return (
    <SafeAreaView 
      style={{ 
        flex:1, 
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.primary 
      }}
    >
      <CustomText>
        Let's get started with your profile! This'll take only a couple of minutes.
      </CustomText>
      <CustomButton
        onClick={() => navigation.navigate('age')}
        style={{  }}
      >
        <CustomText>
          That way
        </CustomText>
      </CustomButton>
    </SafeAreaView>
  )
}