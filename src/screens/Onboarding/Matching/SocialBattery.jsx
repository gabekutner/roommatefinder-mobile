import React from "react";
import {
  View,
  StyleSheet,
} from 'react-native';

import { moderateScale, verticalScale } from 'react-native-size-matters';
import {Slider} from '@miblanchard/react-native-slider';

import CustomText from "../../../components/UI/Custom/CustomText";
import useGlobal from "../../../core/global";
import { colors } from "../../../constants/colors";
import CustomSlider from "./Components/CustomSlider";


export default function SocialBatteryScreen() {

  const matchingForm = useGlobal(state => state.matchingForm)
  const setMatchingForm = useGlobal(state => state.setMatchingForm)

  return (
    <CustomSlider 
      leftIcon={'🪫'}
      rightIcon={'🔋'}
      matchingForm={matchingForm}
      setMatchingForm={setMatchingForm()}
    />
  )
}

const styles = StyleSheet.create({
  sliderWrapper: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    gap:4,
  },
  iconWrapper: {
    padding:10,
    backgroundColor:colors.secondary,
    borderRadius:60
  },
  icon: { fontSize:verticalScale(30) }
})