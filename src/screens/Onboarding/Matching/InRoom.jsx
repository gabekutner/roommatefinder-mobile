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

import { colors } from "../../../constants/colors";
import CustomText from "../../../components/UI/Custom/CustomText";


export default function InRoomScreen() {

  const [value, setValue] = useState(0)

  return (
    <Base>
      <View 
        style={{ 
          alignItems:'center',
          marginTop:verticalScale(30)  
        }}
      >
        <Label 
          text='Room Time 🕥' 
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
          How much time do you spend in your room?
        </CustomText>
        <View style={styles.sliderWrapper}>
          <View style={styles.iconWrapper}>
            <CustomText style={styles.icon}>🏠</CustomText>
          </View>
          <Slider
            value={value}
            minimumValue={0}
            maximumValue={20}
            step={1}
            onValueChange={value => setValue(value)}
            containerStyle={{ width:moderateScale(230) }}
            thumbStyle={{ backgroundColor:colors.accent }}
            minimumTrackStyle={{ backgroundColor:colors.accent }}
          />
          <View style={styles.iconWrapper}>
            <CustomText style={styles.icon}>🧗‍♂️</CustomText>
          </View>
        </View>
        <View style={styles.description}>
          <CustomText style={styles.text}>
            Always Around!
          </CustomText>
          <CustomText style={styles.text}>
            Out and About!
          </CustomText>
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
    gap:10
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