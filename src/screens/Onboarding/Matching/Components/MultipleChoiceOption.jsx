import React from "react";
import {
  View,
  StyleSheet, 
  TouchableOpacity
} from "react-native";

import { verticalScale, moderateScale } from "react-native-size-matters";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import CustomButton from "../../../../components/UI/Custom/CustomButton";
import CustomText from "../../../../components/UI/Custom/CustomText";
import { colors } from "../../../../constants/colors";


export default function MultipleChoiceOption({
  text,
  selected,
  setSelected
}) {
  return (
    <CustomButton onClick={setSelected} style={{ borderWidth:0, paddingVertical:0 }}>
      <View style={styles.option}>
        <FontAwesomeIcon 
          icon="circle"
          size={verticalScale(20)}
          color={selected === text ? colors.accent : colors.primary}
        />
        <CustomText style={styles.text}>
          {text}
        </CustomText>
      </View>
    </CustomButton>
  )
}

const styles = StyleSheet.create({
  option: {
    flexDirection:'row',
    gap:moderateScale(15),
    alignItems:'center',
    maxWidth:'90%'
  },
  text: {
    fontSize:verticalScale(14),
    fontWeight:'500'
  }
})