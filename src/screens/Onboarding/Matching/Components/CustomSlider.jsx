import React from "react";
import { 
  StyleSheet,
  View
} from "react-native";

import { verticalScale, moderateScale } from "react-native-size-matters";
import { Slider } from '@miblanchard/react-native-slider';

import CustomText from "../../../../components/UI/Custom/CustomText";
import { colors } from "../../../../constants/colors";



export default function CustomSlider({ 
  leftIcon,
  rightIcon,
  matchingForm,
  setMatchingForm,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <CustomText style={styles.icon}>🪫</CustomText>
      </View>
      <Slider
        value={matchingForm.social_battery}
        minimumValue={0}
        maximumValue={20}
        step={1}
        onValueChange={value => setMatchingForm({ ...matchingForm, social_battery:value })}
        containerStyle={{ width:moderateScale(230) }}
        thumbStyle={{ backgroundColor:colors.accent }}
        minimumTrackStyle={{ backgroundColor:colors.accent }}
      />
      <View style={styles.wrapper}>
        <CustomText style={styles.icon}>🔋</CustomText>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    gap:4,
  },
  wrapper: {
    padding:10,
    backgroundColor:colors.secondary,
    borderRadius:60
  },
  icon: { fontSize:verticalScale(20) }
})