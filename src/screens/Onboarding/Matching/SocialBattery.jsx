import React from "react";
import CustomSlider from "./Components/CustomSlider";
// import useGlobal from "../../../core/global";
import useStore from "../../../zustand/store";


export default function SocialBatteryScreen() {

  const matchingForm = useStore(state => state.matchingForm)
  const setMatchingForm = useStore(state => state.setMatchingForm)

  return (
    <CustomSlider 
      leftIcon={'battery-empty'} 
      rightIcon={'battery-full'} 
      value={matchingForm.social_battery}
      onValueChange={value => setMatchingForm({ ...matchingForm, social_battery:value })}
    />
  )
}