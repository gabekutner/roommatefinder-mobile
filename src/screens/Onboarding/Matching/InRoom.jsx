import React from "react";

import CustomSlider from "./Components/CustomSlider";

import useStore from "../../../zustand/store";


export default function InRoomScreen() {

  const matchingForm = useStore(state => state.matchingForm)
  const setMatchingForm = useStore(state => state.setMatchingForm)

  return (
    <CustomSlider 
      leftIcon={'headset'} 
      rightIcon={'person-hiking'} 
      value={matchingForm.in_room}
      onValueChange={value => setMatchingForm({ ...matchingForm, in_room:value })}
    />
  )
}