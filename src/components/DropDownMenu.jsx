import React from "react";
import { View, StyleSheet } from 'react-native';

import { verticalScale } from "react-native-size-matters";

import CustomButton from "./UI/Custom/CustomButton";
import CustomText from "./UI/Custom/CustomText";


export default function DropDownMenu({ navigation, colors }) {
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
        <CustomText style={{ ...styles.itemText }}>
          {icon}
        </CustomText>
        <CustomText style={{ ...styles.itemText, color:colors.tint }}>
          {text}
        </CustomText>
      </CustomButton>
    )
  }

  return (
    <View style={{ ...styles.dropDown, backgroundColor:colors.secondary }}>
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
    right:5,
    width:'auto',
    borderRadius:10,
    padding:5,
    overflow:'hidden',
    borderWidth:2,
  },
  dropDownItem: {
    borderRadius:10,
    textAlign:'center',
    alignItems:'center',
    paddingVertical:10,
    paddingHorizontal:15,
    flexDirection:'row',
    gap:10,
  },
  itemText: {
    fontSize:verticalScale(13),
    fontWeight:'bold',
  },
  divider: {
    borderWidth:.5,
    width:'90%',
    alignSelf:'center',
  }
})