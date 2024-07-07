import React from "react";
import {
  View,
  StyleSheet,
} from 'react-native';

import { verticalScale } from 'react-native-size-matters';

import MultipleChoiceOption from "./Components/MultipleChoiceOption";
// import useGlobal from "../../../core/global";
import useStore from "../../../zustand/store";
import { colors } from "../../../constants/colors";


export default function WakeUpScreen() {

  const matchingForm = useStore(state => state.matchingForm)
  const setMatchingForm = useStore(state => state.setMatchingForm)

  return (
    <View style={styles.optionsContainer}>
      <MultipleChoiceOption 
        text="5am"
        selected={matchingForm.wake_up_time}
        setSelected={() => setMatchingForm({ ...matchingForm, wake_up_time:"5am" })}
      />
      <MultipleChoiceOption 
        text="6am" 
        selected={matchingForm.wake_up_time}
        setSelected={() => setMatchingForm({ ...matchingForm, wake_up_time:"6am" })}
      />
      <MultipleChoiceOption 
        text="8am" 
        selected={matchingForm.wake_up_time}
        setSelected={() => setMatchingForm({ ...matchingForm, wake_up_time:"8am" })}
      />
      <MultipleChoiceOption 
        text="10am" 
        selected={matchingForm.wake_up_time}
        setSelected={() => setMatchingForm({ ...matchingForm, wake_up_time:"10am" })}
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