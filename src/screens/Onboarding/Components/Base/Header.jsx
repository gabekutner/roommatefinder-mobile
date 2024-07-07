import React from "react";
import { View, StyleSheet } from 'react-native';

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { verticalScale, moderateScale } from "react-native-size-matters";

import Paginator from "./Paginator";
import CustomButton from "../../../../components/UI/Custom/CustomButton";

import { colors } from "../../../../constants/colors";


export default function Header({ 
  scrollNext, 
  scrollBack,
  data,
  scrollX
}) {
  return (
    <View style={styles.container}>
      <View 
        style={{ 
          ...styles.wrapper, 
          justifyContent:'center', 
          paddingVertical:verticalScale(10),
          marginBottom:verticalScale(5),
        }}
      >
        <Paginator data={data} scrollX={scrollX} />
      </View>
      <View 
        style={{ 
          ...styles.wrapper, 
          justifyContent:'space-between', 
          width:'65%',
        }}
      >
        <CustomButton onClick={scrollBack} style={{ borderWidth:0 }}>
          <FontAwesomeIcon
            icon='arrow-left'
            size={verticalScale(20)}
            color={colors.tint}
          />
        </CustomButton>
        <CustomButton onClick={scrollNext} style={{ borderWidth:0 }}>
          <FontAwesomeIcon
            icon='arrow-right'
            size={verticalScale(20)}
            color={colors.tint}
          />
        </CustomButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems:'center',
    marginTop:verticalScale(50), 
    marginHorizontal:moderateScale(50),
  },
  wrapper: {
    alignItems:"center",
    flexDirection:'row',
    backgroundColor:colors.primary,
    width:'100%',
    paddingHorizontal:6,
    borderRadius:12,
    borderWidth:2,
  } 
})