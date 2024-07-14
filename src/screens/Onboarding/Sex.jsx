import React, { useState } from "react";

import CustomText from "../../components/UI/Custom/CustomText";
import CustomButtonComponent from "../../components/Button/CustomButtonComponent";

import useStore from "../../zustand/store";
import { colors } from "../../constants/colors";
import { spacing, borders } from "../../styles/styles";


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
      <CustomButtonComponent
        variant=""
        animated
        shadow
        onClick={() => toggleSelected("M")}
        style={{ 
          backgroundColor: selected === "M" ? colors.accent : colors.secondary,
          borderColor: colors.tint,
          ...spacing.pv4,
          ...spacing.ph15,
          ...borders.bw2,
          ...spacing.mv1,
        }}
      >
        <CustomText 
          fontSize="medium" 
          style={{
            fontWeight:'bold',
            color: selected === "M" ? colors.white : colors.tint 
          }}
        >
          Guy
        </CustomText>
      </CustomButtonComponent>
      <CustomButtonComponent
        variant=""
        animated
        shadow
        onClick={() => toggleSelected("F")}
        style={{
          backgroundColor: selected === "F" ? colors.accent : colors.secondary,
          borderColor: colors.tint,
          ...spacing.pv4,
          ...spacing.ph15,
          ...borders.bw2,
          ...spacing.mv1,
        }}
      >
        <CustomText 
          fontSize="medium" 
          style={{ 
            fontWeight:'bold',
            color: selected === "F" ? colors.white : colors.tint 
          }}
        >
          Girl
        </CustomText>
      </CustomButtonComponent>
    </>
  )
}