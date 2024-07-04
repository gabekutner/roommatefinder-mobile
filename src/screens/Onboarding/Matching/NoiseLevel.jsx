import React from "react";
import {
  View,
  StyleSheet,
} from 'react-native';

import {
  moderateScale,
  verticalScale
} from 'react-native-size-matters';
import {Slider} from '@miblanchard/react-native-slider';

import useGlobal from "../../../core/global";
import { colors } from "../../../constants/colors";
import CustomText from "../../../components/UI/Custom/CustomText";


export default function NoiseLevelScreen() {

  const matchingForm = useGlobal(state => state.matchingForm)
  const setMatchingForm = useGlobal(state => state.setMatchingForm)

  return (
    <View style={styles.sliderWrapper}>
      <View style={styles.iconWrapper}>
        <CustomText style={styles.icon}>🤫</CustomText>
      </View>
      <Slider
        value={matchingForm.noise_level}
        minimumValue={0}
        maximumValue={20}
        step={1}
        onValueChange={value => setMatchingForm({ ...matchingForm, noise_level:value })}
        containerStyle={{ width:moderateScale(230) }}
        thumbStyle={{ backgroundColor:colors.accent }}
        minimumTrackStyle={{ backgroundColor:colors.accent }}
      />
      <View style={styles.iconWrapper}>
        <CustomText style={styles.icon}>🥳</CustomText>
      </View>
    </View>
    // <View style={styles.description}>
    //   <CustomText style={styles.text}>
    //     Shhhh
    //   </CustomText>
    //   <CustomText style={styles.text}>
    //     Party on!
    //   </CustomText>
    // </View>
  )
}

const styles = StyleSheet.create({
  sliderWrapper: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    gap:4
  },
  iconWrapper: {
    padding:10,
    backgroundColor:colors.secondary,
    borderRadius:60
  },
  icon: { fontSize:verticalScale(30) },
  description: {
    marginTop:verticalScale(15),
    flexDirection:'row',
    width:'95%',
    justifyContent:'space-between',
  },
  text: {
    fontSize:verticalScale(12),
    fontWeight:'bold',
  }
})