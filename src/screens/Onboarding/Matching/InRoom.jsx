import React from "react";
import useGlobal from "../../../core/global";
import CustomSlider from "./Components/CustomSlider";


export default function InRoomScreen() {

  const matchingForm = useGlobal(state => state.matchingForm)
  const setMatchingForm = useGlobal(state => state.setMatchingForm)

  return (
    <CustomSlider 
      leftIcon={'headset'} 
      rightIcon={'person-hiking'} 
      value={matchingForm.in_room}
      onValueChange={value => setMatchingForm({ ...matchingForm, in_room:value })}
    />
  )
}