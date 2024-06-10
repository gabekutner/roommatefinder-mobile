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


export default function CleanRoomScreen() {

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
            selected={selected}
            setSelected={setSelected}
          />
          <MultipleChoiceOption 
            text="Mostly tidy, with a stray sock or two." 
            selected={selected}
            setSelected={setSelected}
          />
          <MultipleChoiceOption 
            text="A bit cluttered, but I know where everything is." 
            selected={selected}
            setSelected={setSelected}
          />
          <MultipleChoiceOption 
            text="Organized Chaos 😈" 
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