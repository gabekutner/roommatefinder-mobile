import React from "react";
import CustomSlider from "./Components/CustomSlider";
import useGlobal from "../../../core/global";


export default function NoiseLevelScreen() { 

  const matchingForm = useGlobal(state => state.matchingForm)
  const setMatchingForm = useGlobal(state => state.setMatchingForm)

  return (
    <CustomSlider 
      leftIcon={'volume-xmark'} 
      rightIcon={'volume-high'} 
      value={matchingForm.noise_level}
      onValueChange={value => setMatchingForm({ ...matchingForm, noise_level:value })}
    />
  ) 
}