import React from "react";

import { verticalScale } from "react-native-size-matters";

import Base from "./Components/Base";
import Label from "./Components/Label";

import useGlobal from "../../core/global";
import { colors } from "../../constants/colors";


export default function DoneScreen({navigation}) {

  const user = useGlobal(state => state.user)
  const form = useGlobal(state => state.form)
  const CreateProfile = useGlobal(state => state.CreateProfile)

  return (
    <Base>
      <Label 
        text="All Done!" 
        style={{ 
          marginTop:verticalScale(50), 
          marginBottom:verticalScale(20),
          alignSelf:'center'
        }} 
      />
    </Base>
  )
}