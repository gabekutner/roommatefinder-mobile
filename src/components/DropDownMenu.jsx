import React from "react";
import { View, StyleSheet } from 'react-native';

import { moderateScale, verticalScale } from "react-native-size-matters";

import CustomButton from "./UI/Custom/CustomButton";
import CustomText from "./UI/Custom/CustomText";

import { colors } from "../constants/colors";


export default function DropDownMenu({ navigation }) {
  function DropDownItem({
    onPress,
    icon,
    text,
  }) {
    return (
      <CustomButton
        onClick={onPress}
        style={{ 
          ...styles.dropDownItem,
          borderWidth:0,
          justifyContent:'flex-start',
        }}
      >
        <CustomText fontSize="medium" style={styles.itemText}>
          {icon}
        </CustomText>
        <CustomText fontSize="medium" style={styles.itemText}>
          {text}
        </CustomText>
      </CustomButton>
    )
  }

  return (
    <View style={styles.dropDown}>
      <DropDownItem  
        onPress={() => navigation.navigate('requests')}
        icon="👋"
        text="Roommate Matches"
      />
      <View style={styles.divider } />
      <DropDownItem  
        onPress={() => navigation.navigate('search')}
        icon="🔍"
        text="Search"
      />
    </View>
  )
}


const styles = StyleSheet.create({
  dropDown: {
    position:'absolute',
    top:verticalScale(40),
    right:moderateScale(5),
    width:'auto',
    borderRadius:10,
    padding:verticalScale(5),
    overflow:'hidden',
    borderWidth:2,
    backgroundColor:colors.secondary
  },
  dropDownItem: {
    borderRadius:10,
    textAlign:'center',
    alignItems:'center',
    paddingVertical:verticalScale(8),
    paddingHorizontal:moderateScale(10),
    flexDirection:'row',
    gap:verticalScale(10),
  },
  itemText: {
    color:colors.tint, 
    fontWeight:'600' 
  },
  divider: {
    borderWidth:.5,
    width:'90%',
    alignSelf:'center',
  }
})