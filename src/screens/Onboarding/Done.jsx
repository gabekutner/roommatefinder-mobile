import React, { useEffect } from "react";

import { verticalScale } from "react-native-size-matters";

import Base from "./Components/Base";
import Label from "./Components/Label";
import CustomText from "../../components/UI/Custom/CustomText";
import CustomButton from "../../components/UI/Custom/CustomButton";

import useGlobal from "../../core/global";
import { colors } from "../../constants/colors";


export default function DoneScreen({navigation}) {

  const user = useGlobal(state => state.user)
  const form = useGlobal(state => state.form)
  const CreateProfile = useGlobal(state => state.CreateProfile)

  // form validation here
  const submit = () => {
    console.log(form)
    for (let value in form) {
      // console.log(form[value])
      // if ()
      console.log(form[value])
    }
  }

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
      <CustomText
        style={{
          alignSelf:'center',
          fontSize:verticalScale(14)
        }}
      >
        Hit{' '}
        <CustomText
          style={{
            fontSize:verticalScale(14),
            fontWeight:'bold'
          }}
        >
          submit
        </CustomText>
        {' '}
        to move on and get swiping! 
      </CustomText>
      <CustomButton
        onClick={() => submit()}
        style={{
          width:'80%',
          alignSelf:'center',
          backgroundColor:colors.accent,
          position:'absolute',
          bottom:verticalScale(130),
        }}
      >
        <CustomText
          style={{
            fontSize:verticalScale(14),
            color:colors.white,
            fontWeight:'bold'
          }}
        >
          Submit
        </CustomText>
      </CustomButton>
    </Base>
  )
}