import React from "react";
import { StyleSheet } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { verticalScale, moderateScale } from "react-native-size-matters";

import CustomText from "../../../components/UI/Custom/CustomText";
import CustomButton from "../../../components/UI/Custom/CustomButton";

import useStore from "../../../zustand/store";
import { colors } from "../../../constants/colors";


export default function ProfileLogout({ style }) {
  const logout = useStore(state => state.logout)
  return (
    <CustomButton
      shadow
      onClick={() => logout()}
      style={{
        ...styles.button,
        ...style
      }}
    >
      <FontAwesomeIcon 
        icon='right-from-bracket'
        size={verticalScale(16)}
        color={colors.white}
        style={{ marginRight:moderateScale(10) }}
      />
      <CustomText fontSize="large" style={styles.text}>
        Logout
      </CustomText>
    </CustomButton>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginTop:verticalScale(25),
    borderWidth:2,
    borderColor:colors.tint,
    backgroundColor:colors.accent,
  },
  text: {
    fontWeight:'600', 
    color:colors.white 
  }
})