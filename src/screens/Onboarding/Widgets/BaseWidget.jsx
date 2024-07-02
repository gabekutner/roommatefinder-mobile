import React, { useState } from "react";
import {
  View,
  StyleSheet,
} from 'react-native';

import { moderateScale, verticalScale } from "react-native-size-matters";

// import Base from "../Components/Base";
import Card from "../Components/Card";
import Label from "../Components/Label";
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
    <Card
      navigation={navigation} 
      screen={"photos"} 
      style={{ marginTop:verticalScale(30) }}
    >
      <Label 
        text="Customize your profile with prompts, quotes, and your social handles!" 
        style={styles.label} 
      />
      <CustomText style={styles.subtitle}>
        (P.S. Optional)
      </CustomText>

      {/* <View style={{ flexDirection:'column' }}>
        <View style={{ flex: 1, flexDirection: "row", marginHorizontal:moderateScale(20), gap:8 }}>
          <Square onClick={() => navigation.navigate('prompts')} text={'Prompts'} />
          <Square onClick={() => navigation.navigate('quotes')} text={'Quotes'} />
          <Square onClick={() => navigation.navigate('linktree')} text={'LinkTree'} />
        </View>
      </View> */}
    </Card>
  )
}

const styles = StyleSheet.create({
  label: {
    marginTop:verticalScale(20),
    alignSelf:'center',
    textAlign:'center'
  }, 
  subtitle: {
    fontSize:verticalScale(12),
    fontWeight:'500',
    marginTop:verticalScale(5),
    marginBottom:verticalScale(20),
    alignSelf:'center'
  },
  optionText: {
    fontSize:verticalScale(16),
    fontWeight:'600',
    color:colors.white
  },
  square: {
    flex:1,
    borderWidth:2,
    borderColor:colors.tint,
    backgroundColor:colors.accent,
    borderRadius:0,
    shadowColor: '#222',
    shadowOffset: { width: 7, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 1,  
  }
})