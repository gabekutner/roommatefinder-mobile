import React from "react";
// import useGlobal from "../../../core/global";
import useStore from "../../../zustand/store";
import CustomSlider from "./Components/CustomSlider";


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