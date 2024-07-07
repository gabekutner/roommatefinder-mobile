import React, { useState } from "react";
import { StyleSheet } from 'react-native';

import { moderateScale, verticalScale } from "react-native-size-matters";

import CustomText from "../../components/UI/Custom/CustomText";
import CustomButton from "../../components/UI/Custom/CustomButton";

import useStore from "../../zustand/store";
import { colors } from "../../constants/colors";


export default function SexScreen() {

  const form = useStore(state => state.form)
  const setForm = useStore(state => state.setForm)

  const [selected, setSelected] = useState("")
  function toggleSelected(key) {
    setSelected(key)
    setForm({ ...form, sex:key })
  }

  return (
    <>
      <CustomButton 
        onClick={() => toggleSelected("M")}
        style={{ ...styles.option, backgroundColor: selected === "M" ? colors.accent : colors.secondary }}
      >
        <CustomText style={{ ...styles.text, color: selected === "M" ? colors.white : colors.tint }}>
          Guy
        </CustomText>
      </CustomButton>
      <CustomButton 
        onClick={() => toggleSelected("F")}
        style={{ ...styles.option, backgroundColor: selected === "F" ? colors.accent : colors.secondary }}
      >
        <CustomText style={{ ...styles.text, color: selected === "F" ? colors.white : colors.tint }}>
          Guy
        </CustomText>
      </CustomButton>
    </>
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