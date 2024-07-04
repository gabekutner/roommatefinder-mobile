import React from "react";
import {
  View,
  StyleSheet,
} from 'react-native';

import { verticalScale } from 'react-native-size-matters';

import MultipleChoiceOption from "./Components/MultipleChoiceOption";
import useGlobal from "../../../core/global";
import { colors } from "../../../constants/colors";


export default function BedTimeScreen() {

  const matchingForm = useGlobal(state => state.matchingForm)
  const setMatchingForm = useGlobal(state => state.setMatchingForm)

  return (
    <View style={styles.optionsContainer}>
      <MultipleChoiceOption 
        text="9pm"
        selected={matchingForm.bed_time}
        setSelected={() => setMatchingForm({ ...matchingForm, bed_time:"9pm" })}
      />
      <MultipleChoiceOption 
        text="11pm" 
        selected={matchingForm.bed_time}
        setSelected={() => setMatchingForm({ ...matchingForm, bed_time:"11pm" })}
      />
      <MultipleChoiceOption 
        text="1am" 
        selected={matchingForm.bed_time}
        setSelected={() => setMatchingForm({ ...matchingForm, bed_time:"1am" })}
      />
      <MultipleChoiceOption 
        text="3am" 
        selected={matchingForm.bed_time}
        setSelected={() => setMatchingForm({ ...matchingForm, bed_time:"3am" })}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  optionsContainer: {
    flexDirection:'column',
    gap:verticalScale(20),
    backgroundColor:colors.secondary,
    padding:verticalScale(20),
    borderRadius:12,
    borderWidth:2,
    width:'100%',
    alignItems:'flex-start'
  }
})