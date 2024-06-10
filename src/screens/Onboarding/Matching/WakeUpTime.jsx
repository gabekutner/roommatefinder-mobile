import React, { useState } from "react";
import {
  View,
  StyleSheet,
} from 'react-native';

import {
  moderateScale,
  verticalScale
} from 'react-native-size-matters';

import Base from "../Components/Base";
import Label from "../Components/Label";
import MultipleChoiceOption from "./Components/MultipleChoiceOption";

import { colors } from "../../../constants/colors";


export default function WakeUpScreen() {

  const [selected, setSelected] = useState("")

  return (
    <Base>
      <View 
        style={{ 
          alignItems:'center',
          marginTop:verticalScale(30)  
        }}
      >
        <Label 
          text="What about wake up time? ☀️🥱" 
          style={{ 
            marginVertical:verticalScale(20),
            marginHorizontal:moderateScale(45),
            textAlign:'center'
          }} 
        />
        <View style={styles.optionsContainer}>
          <MultipleChoiceOption 
            text="5am"
            selected={selected}
            setSelected={setSelected}
          />
          <MultipleChoiceOption 
            text="6am" 
            selected={selected}
            setSelected={setSelected}
          />
          <MultipleChoiceOption 
            text="8am" 
            selected={selected}
            setSelected={setSelected}
          />
          <MultipleChoiceOption 
            text="10am" 
            selected={selected}
            setSelected={setSelected}
          />
        </View>
      </View>
    </Base>
  )
}

const styles = StyleSheet.create({
  optionsContainer: {
    flexDirection:'column',
    gap:verticalScale(20),
    backgroundColor:colors.secondary,
    padding:verticalScale(20),
    borderRadius:12,
    width:'80%',
    alignItems:'flex-start'
  }
})