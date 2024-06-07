import React from "react";
import {
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import CustomText from "./UI/Custom/CustomText";
import { verticalScale } from "react-native-size-matters";





export default function DropDownMenu({

}) {

  function DropDownItem({
    onPress,
    icon,
    children
  }) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          height:50,
          // display:'flex',
          // alignItems:'center',
          borderRadius:10,
          textAlign:'center',
          padding:10,
          backgroundColor:'#ccc',
          flexDirection:'row',
        }}
      >
        <CustomText>
          {icon}
        </CustomText>
        <CustomText>
          {children}
        </CustomText>
      </TouchableOpacity>
    )
  }


  return (
    <View 
      style={{
        position:'absolute',
        top:verticalScale(25),
        right:5,
        width:'auto',
        // transform: [{ translateX:'-45%' }],
        backgroundColor:'red',
        borderRadius:10,
        padding:3,
        overflow:'hidden'
      }}
    >
      <DropDownItem  
        onPress={() => {}}
        icon="🎯"
      >
        <CustomText>
          My Profile
        </CustomText>
      </DropDownItem>
      
    </View>
  )
}