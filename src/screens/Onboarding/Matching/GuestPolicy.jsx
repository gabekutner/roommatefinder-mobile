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


export default function GuestPolicyScreen() {

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
            selected={matchingForm.guest_policy}
            setSelected={() => setMatchingForm({ ...matchingForm, guest_policy:"Guests are family—come one, come all, anytime." })}
          />
          <MultipleChoiceOption 
            text="Guests are cool, but they gotta bring snacks to share." 
            selected={matchingForm.guest_policy}
            setSelected={() => setMatchingForm({ ...matchingForm, guest_policy:"Guests are cool, but they gotta bring snacks to share." })}
          />
          <MultipleChoiceOption 
            text="Guests are okay, but keep it chill, we're not running a hotel." 
            selected={matchingForm.guest_policy}
            setSelected={() => setMatchingForm({ ...matchingForm, guest_policy:"Guests are okay, but keep it chill, we're not running a hotel." })}
          />
          <MultipleChoiceOption 
            text="Guests? Nah, this is our sanctuary." 
            selected={matchingForm.guest_policy}
            setSelected={() => setMatchingForm({ ...matchingForm, guest_policy:"Guests? Nah, this is our sanctuary." })}
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