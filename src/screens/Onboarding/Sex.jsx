import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { 
  moderateScale,
  verticalScale 
} from "react-native-size-matters";

// import Base from "./Components/Base";
import Label from "./Components/Label";
import CustomText from "../../components/UI/Custom/CustomText";
import CustomButton from "../../components/UI/Custom/CustomButton";

import useGlobal from "../../core/global";
import { colors } from "../../constants/colors";
import Card from "./Components/Card";


export default function SexScreen({ navigation }) {

  const form = useGlobal(state => state.form)
  const setForm = useGlobal(state => state.setForm)

  const [selected, setSelected] = useState("")
  function toggleSelected(key) {
    setSelected(key)
    setForm({ ...form, sex:key })
  }

  return (
    <Card 
      navigation={navigation} 
      screen={"hometown"} 
      style={{ marginTop:verticalScale(30) }}
    >
      <Label text="I am a ..." style={{ marginVertical:verticalScale(20) }} />
      <CustomButton 
        onClick={() => toggleSelected("M")}
        style={{
          ...styles.option, 
          backgroundColor: selected === "M" ? colors.accent : colors.secondary,
        }}
      >
        <CustomText 
          style={{
            ...styles.text, 
            color: selected === "M" ? colors.white : colors.tint
          }}
        >
          Guy
        </CustomText>
      </CustomButton>
      <CustomButton 
        onClick={() => toggleSelected("F")}
        style={{
          ...styles.option, 
          backgroundColor: selected === "F" ? colors.accent : colors.secondary,
        }}
      >
        <CustomText 
          style={{
            ...styles.text, 
            color: selected === "F" ? colors.white : colors.tint
          }}
        >
          Guy
        </CustomText>
      </CustomButton>
    </Card>
  )
}

const styles = StyleSheet.create({
  option: {
    paddingVertical:verticalScale(10),
    paddingHorizontal:moderateScale(50),
    borderWidth:2,
    shadowColor: '#222',
    shadowOffset: { width: 7, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 1,  
    borderColor: colors.tint,
    marginVertical:verticalScale(5)
  },
  text: { 
    fontSize:verticalScale(14),
    fontWeight:'600',
  },
})