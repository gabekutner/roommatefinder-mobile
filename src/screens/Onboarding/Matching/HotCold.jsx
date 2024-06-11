import React, { useState } from "react";
import {
  View,
  StyleSheet,
} from 'react-native';

import {
  moderateScale,
  verticalScale
} from 'react-native-size-matters';
import {Slider} from '@miblanchard/react-native-slider';

import Base from "../Components/Base";
import Label from "../Components/Label";

import useGlobal from "../../../core/global";
import { colors } from "../../../constants/colors";
import CustomText from "../../../components/UI/Custom/CustomText";


export default function HotColdScreen() {

  // const [value, setValue] = useState(0)
  const matchingForm = useGlobal(state => state.matchingForm)
  const setMatchingForm = useGlobal(state => state.setMatchingForm)

  return (
    <Base>
      <View 
        style={{ 
          alignItems:'center',
          marginTop:verticalScale(30)  
        }}
      >
        <Label 
          text='Hot or Cold? 🌡️' 
          style={{ marginVertical:verticalScale(20) }} 
        />
        <CustomText
          style={{
            textAlign:'center',
            fontSize:verticalScale(13),
            marginBottom:verticalScale(35),
            marginHorizontal:moderateScale(50)
          }}
        >
          How hot or cold do you keep your room?
        </CustomText>
        <View style={styles.sliderWrapper}>
          <View style={styles.iconWrapper}>
            <CustomText style={styles.icon}>🥶</CustomText>
          </View>
          <Slider
            value={matchingForm.hot_cold}
            minimumValue={0}
            maximumValue={20}
            step={1}
            onValueChange={value => setMatchingForm({ ...matchingForm, hot_cold:value })}
            containerStyle={{ width:moderateScale(230) }}
            thumbStyle={{ backgroundColor:colors.accent }}
            minimumTrackStyle={{ backgroundColor:colors.accent }}
          />
          <View style={styles.iconWrapper}>
            <CustomText style={styles.icon}>🥵</CustomText>
          </View>
        </View>
      </View>
    </Base>
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
})