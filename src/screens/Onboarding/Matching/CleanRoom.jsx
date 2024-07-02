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


export default function CleanRoomScreen() {

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
          text='How clean do you keep your room? 🧹' 
          style={{ 
            marginVertical:verticalScale(20),
            marginHorizontal:moderateScale(45),
            textAlign:'center'
          }} 
        />
        <View style={styles.optionsContainer}>
          <MultipleChoiceOption 
            text="I'm the master of cleanliness and order. 🤹"
            selected={matchingForm.clean_room}
            setSelected={() => setMatchingForm({ ...matchingForm, clean_room:"I'm the master of cleanliness and order. 🤹" })}
          />
          <MultipleChoiceOption 
            text="Mostly tidy, with a stray sock or two." 
            selected={matchingForm.clean_room}
            setSelected={() => setMatchingForm({ ...matchingForm, clean_room:"Mostly tidy, with a stray sock or two." })}
          />
          <MultipleChoiceOption 
            text="A bit cluttered, but I know where everything is." 
            selected={matchingForm.clean_room}
            setSelected={() => setMatchingForm({ ...matchingForm, clean_room:"A bit cluttered, but I know where everything is." })}
          />
          <MultipleChoiceOption 
            text="Organized Chaos 😈" 
            selected={matchingForm.clean_room}
            setSelected={() => setMatchingForm({ ...matchingForm, clean_room:"Organized Chaos 😈" })}
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