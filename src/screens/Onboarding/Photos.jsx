import React from "react";
import {
  View,
  StyleSheet,
} from 'react-native';

import { verticalScale } from "react-native-size-matters";

import Base from "./Base";
import CustomButton from "../../components/UI/Custom/CustomButton";
import CustomText from "../../components/UI/Custom/CustomText";
import useGlobal from "../../core/global";
import { colors as c } from "../../assets/config";


export default function PhotosScreen({ navigation }) {

  const form = useGlobal(state => state.form)
  const setForm = useGlobal(state => state.setForm)
  const theme = useGlobal(state => state.theme)
  const colors = c[theme]
  const label = "Upload some photos!"
  const buttonLabel = "Next Step"
  
  return (
    <Base navigation={navigation} next={'widgets'} label={label} buttonLabel={buttonLabel} >
      <View 
        style={{ 
          alignItems:'center',
          flexDirection:'column',
          gap:10,
        }}
      >
        
      </View>
    </Base>
  )
}