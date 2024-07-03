import React from "react";
import {
  View, 
  StyleSheet, 
  ImageBackground,
} from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { moderateScale, verticalScale } from "react-native-size-matters";

import CustomText from "../../../components/UI/Custom/CustomText";
import CustomButton from "../../../components/UI/Custom/CustomButton";
import { colors } from "../../../constants/colors";


const Header = ({ navigation, screen }) => {
  return (
    <View 
      style={{ 
        ...styles.shared,
        marginTop:verticalScale(50), 
        flexDirection:'row', 
        justifyContent:'space-between', 
        marginHorizontal:moderateScale(100),
        paddingVertical:0,
      }}
    >
      <CustomButton
        onClick={() => navigation.goBack()}
        style={{ borderWidth:0 }}
      >
        <FontAwesomeIcon
          icon='arrow-left'
          size={verticalScale(20)}
          color={colors.tint}
        />
      </CustomButton>
      <CustomButton
        onClick={() => navigation.navigate(screen)}
        style={{ borderWidth:0 }}
      >
        <FontAwesomeIcon
          icon='arrow-right'
          size={verticalScale(20)}
          color={colors.tint}
        />
      </CustomButton>
    </View>
  )
}

export default function Card({ 
  navigation,
  children, 
  screen, 
  style,
}) {
  return (
    <ImageBackground 
      source={require('../../../assets/images/image_part_002.png')}
      style={{ flex:1, backgroundColor:colors.secondary }}
      imageStyle={{ opacity:0.5 }}
    >
      <Header navigation={navigation} screen={screen} />
      <View 
        style={{ 
          ...styles.shared,
          ...styles.card, 
          ...style
        }}
      >
        {children}
      </View>
      <View 
        style={{ 
          ...styles.shared,
          ...styles.subCard, 
        }}
      >
        <CustomText style={styles.subCardText}>No information about your account is shared with the University of Utah.</CustomText>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  shared: {
    alignItems:'center',
    backgroundColor:colors.primary,
    marginHorizontal:moderateScale(25),
    paddingVertical:verticalScale(12),
    paddingHorizontal:6,
    borderRadius:12,
    borderWidth:2,
  },
  card: {},
  subCard: {
    position:'absolute',
    left:0,
    right:0,
    bottom:verticalScale(35),
  },
  subCardText: {
    fontSize:verticalScale(11),
    fontWeight:'500',
    textAlign:'center',
    color:colors.tertiary
  }
})