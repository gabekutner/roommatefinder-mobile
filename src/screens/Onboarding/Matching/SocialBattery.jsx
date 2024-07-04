import React from "react";
import CustomSlider from "./Components/CustomSlider";
import useGlobal from "../../../core/global";


export default function SocialBatteryScreen() {

  const matchingForm = useGlobal(state => state.matchingForm)
  const setMatchingForm = useGlobal(state => state.setMatchingForm)

  return (
    <CustomSlider 
      leftIcon={'battery-empty'} 
      rightIcon={'battery-full'} 
      value={matchingForm.social_battery}
      onValueChange={value => setMatchingForm({ ...matchingForm, social_battery:value })}
    />
  )
}