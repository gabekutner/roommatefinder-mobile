import React from "react";
import CustomSlider from "./Components/CustomSlider";
import useGlobal from "../../../core/global";


export default function HotColdScreen() {

  const matchingForm = useGlobal(state => state.matchingForm)
  const setMatchingForm = useGlobal(state => state.setMatchingForm)

  return (
    <CustomSlider 
      leftIcon={'snowflake'} 
      rightIcon={'temperature-high'} 
      value={matchingForm.hot_cold}
      onValueChange={value => setMatchingForm({ ...matchingForm, hot_cold:value })}
    />
  )
}