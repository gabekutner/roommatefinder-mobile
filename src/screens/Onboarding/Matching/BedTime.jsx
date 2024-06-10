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


export default function BedTimeScreen() {

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
          text="When is it time for bed? 🥱" 
          style={{ 
            marginVertical:verticalScale(20),
            marginHorizontal:moderateScale(45),
            textAlign:'center'
          }} 
        />
        <View style={styles.optionsContainer}>
          <MultipleChoiceOption 
            text="9 pm"
            selected={selected}
            setSelected={setSelected}
          />
          <MultipleChoiceOption 
            text="11pm" 
            selected={selected}
            setSelected={setSelected}
          />
          <MultipleChoiceOption 
            text="1am" 
            selected={selected}
            setSelected={setSelected}
          />
          <MultipleChoiceOption 
            text="3am" 
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