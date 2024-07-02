import React from "react";
import {
  View,
  StyleSheet,
} from 'react-native';

import {
  moderateScale,
  verticalScale
} from 'react-native-size-matters';

// import Base from "../Components/Base";
import Label from "../Components/Label";
import MultipleChoiceOption from "./Components/MultipleChoiceOption";

import useGlobal from "../../../core/global";
import { colors } from "../../../constants/colors";


export default function BedTimeScreen() {

  const matchingForm = useGlobal(state => state.matchingForm)
  const setMatchingForm = useGlobal(state => state.setMatchingForm)

  return (
    <>
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
      </View>
    </>
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