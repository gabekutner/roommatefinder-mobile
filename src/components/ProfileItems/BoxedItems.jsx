import React from "react";
import {
  View
} from 'react-native';

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import CustomText from "../UI/Custom/CustomText";


export default function BoxedItem({ 
  
}) {



  return (
    <View 
      style={{
        
      }}
    >
      <View style={{  }}>
        <CustomText style={{  }}>
          {prompts[item.question-1].prompt}
        </CustomText>
      </View>
      <View style={{ ...styles.answerBox }}>
        <CustomText style={{ ...styles.answer, color:colors.tint }}>{item.answer}</CustomText>
      </View>
    </View>
  )
}