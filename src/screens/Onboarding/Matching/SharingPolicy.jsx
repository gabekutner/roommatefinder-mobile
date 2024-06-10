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
import CustomButton from "../../../components/UI/Custom/CustomButton";
import CustomText from "../../../components/UI/Custom/CustomText";


export default function SharingPolicyScreen({ navigation }) {

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
          text="What do you think about sharing your stuff? 🧸" 
          style={{ 
            marginVertical:verticalScale(20),
            marginHorizontal:moderateScale(45),
            textAlign:'center'
          }} 
        />
        <View style={styles.optionsContainer}>
          <MultipleChoiceOption 
            text="I'm cool with sharing everything - food, clothes, you name it … just maybe not my underwear."
            selected={selected}
            setSelected={setSelected}
          />
          <MultipleChoiceOption 
            text="I'm open to sharing some things, but not everything." 
            selected={selected}
            setSelected={setSelected}
          />
          <MultipleChoiceOption 
            text="Occasional sharing is chill, but not all the time." 
            selected={selected}
            setSelected={setSelected}
          />
          <MultipleChoiceOption 
            text="I'm not big on sharing - my stuff is my stuff." 
            selected={selected}
            setSelected={setSelected}
          />
        </View>
        <CustomButton
          onClick={() => {}}
          style={{
            marginVertical:verticalScale(25)
          }}
        >
          <CustomText>
            Done
          </CustomText>
        </CustomButton>
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