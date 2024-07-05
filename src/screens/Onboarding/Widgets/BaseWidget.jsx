import React, { useState } from "react";
import {
  View,
  StyleSheet
} from 'react-native';

import { moderateScale, verticalScale, scale } from "react-native-size-matters";

import CustomButton from "../../../components/UI/Custom/CustomButton";
import CustomText from "../../../components/UI/Custom/CustomText";
import { colors } from "../../../constants/colors";


export default function BaseWidgetsScreen({ navigation }) {

  const Square = ({ text, onClick }) => {
    const [height, setHeight] = useState(0)
    return (
      <CustomButton
        onClick={onClick}
        onLayout={(e) => setHeight(e.nativeEvent.layout.width)}
        style={{ ...styles.square, height }}
      >
        <CustomText style={styles.optionText}>{text}</CustomText>
      </CustomButton>
    )
  }

  return (
    <View style={{ flexDirection:'column' }}>
      <View style={{ flexDirection: "row", gap:moderateScale(8) }}>
        <Square onClick={() => {}} text="Prompts"/>
        <Square onClick={() => {}} text="Quotes"/>
        <Square onClick={() => navigation.navigate('linktree')} text="Links"/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  square: {
    borderWidth:2,
    borderColor:colors.tint,
    backgroundColor:colors.secondary,
    height:scale(90),
    width:scale(90),
    shadowColor: '#222',
    shadowOffset: { width: 5, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 1,  
  },
  optionText: {
    fontSize:verticalScale(15),
    fontWeight:'500',
    color:colors.tint
  }
})