import React from "react";

import CustomNextButton from './CustomNextButton';
import Base from "./Base";

import useGlobal from "../../core/global";
import { colors as c } from "../../assets/config";


export default function DoneScreen({navigation}) {

  const theme = useGlobal(state => state.theme)
  const colors = c[theme]

  return (
    <Base 
      navigation={navigation} 
      label={"All done! Hit 'Done' to create your profile and move on!"} 
    >
      <CustomNextButton 
        colors={colors}
        onClick={() => {
          console.log('submit form')
        }}
        text={'Done'}
      />
    </Base>
  )
}