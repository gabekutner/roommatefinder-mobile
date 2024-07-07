import React from "react";

import CustomSlider from "./Components/CustomSlider";

import useStore from "../../../zustand/store";


export default function NoiseLevelScreen() { 

  const matchingForm = useStore(state => state.matchingForm)
  const setMatchingForm = useStore(state => state.setMatchingForm)

  return (
    <CustomSlider 
      leftIcon={'volume-xmark'} 
      rightIcon={'volume-high'} 
      value={matchingForm.noise_level}
      onValueChange={value => setMatchingForm({ ...matchingForm, noise_level:value })}
    />
  ) 
}