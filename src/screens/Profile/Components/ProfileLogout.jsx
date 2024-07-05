import React from "react";
import { StyleSheet } from "react-native";

import { verticalScale, moderateScale } from "react-native-size-matters";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import CustomText from "../../../components/UI/Custom/CustomText";
import CustomButton from "../../../components/UI/Custom/CustomButton";

import useGlobal from "../../../core/global";
import { colors } from "../../../constants/colors";


export default function ProfileLogout({ style }) {
  const logout = useGlobal(state => state.logout)
  return (
    <CustomButton
      onClick={() => logout()}
      style={{
        ...styles.button,
        ...style
      }}
    >
      <FontAwesomeIcon 
        icon='right-from-bracket'
        size={verticalScale(15)}
        color={colors.white}
        style={{ marginRight:moderateScale(10) }}
      />
      <CustomText style={styles.text}>
        Logout
      </CustomText>
    </CustomButton>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection:'row',
    paddingHorizontal:moderateScale(22),
    alignItems:'center',
    justifyContent:'center',
    marginTop:verticalScale(25),
    borderWidth:2,
    borderColor:colors.tint,
    backgroundColor:colors.accent,
    shadowColor: '#222',
    shadowOffset: { width: 7, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 1, 
  },
  text: {
    fontWeight:'600', 
    fontSize:verticalScale(15), 
    color:colors.white 
  }
})