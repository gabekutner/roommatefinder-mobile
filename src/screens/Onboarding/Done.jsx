import React from "react";
import Base from "./Base";


export default function DoneScreen({navigation}) {
  return (
    <Base 
      navigation={navigation} 
      next={''} 
      label={"All done! Hit 'Done' to create your profile and move on!"} 
      buttonLabel={'Done'} 
    />
  )
}