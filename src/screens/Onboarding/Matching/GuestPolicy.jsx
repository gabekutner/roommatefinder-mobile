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


export default function GuestPolicyScreen() {

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
          text="What do you think about dorm guests? 🏨" 
          style={{ 
            marginVertical:verticalScale(20),
            marginHorizontal:moderateScale(45),
            textAlign:'center'
          }} 
        />
        <View style={styles.optionsContainer}>
          <MultipleChoiceOption 
            text="Guests are family—come one, come all, anytime."
            selected={selected}
            setSelected={setSelected}
          />
          <MultipleChoiceOption 
            text="Guests are cool, but they gotta bring snacks to share." 
            selected={selected}
            setSelected={setSelected}
          />
          <MultipleChoiceOption 
            text="Guests are okay, but keep it chill, we're not running a hotel." 
            selected={selected}
            setSelected={setSelected}
          />
          <MultipleChoiceOption 
            text="Guests? Nah, this is our sanctuary." 
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