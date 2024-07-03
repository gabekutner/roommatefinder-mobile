import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet
} from 'react-native';

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { verticalScale, moderateScale } from 'react-native-size-matters';

import CustomText from "../../components/UI/Custom/CustomText";
import CustomButton from "../../components/UI/Custom/CustomButton";
import { colors } from "../../constants/colors";


export default function PromptScreen({ route, navigation }) {

  const {
    title, 
    subtitle, 
    text, 
    screen,
    screen2,
    icon
  } = route.params

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleWrapper}>
        <CustomText style={styles.title}>
          {title}
        </CustomText>
        <CustomText style={styles.subtitle}>
          {subtitle}
        </CustomText>
      </View> 

      { screen2 
        ?
          <CustomButton
            onClick={() => navigation.navigate(screen2)}
            style={{ borderWidth:0 }}
          >
            <CustomText
              style={{
                fontSize:verticalScale(12),
                fontWeight:'bold',
                color:colors.tint,
                textDecorationLine:'underline'
              }}
            >
              Nah, I'll do it later
            </CustomText>
          </CustomButton>
        : null 
      }

      <CustomButton
        onClick={() => navigation.navigate(screen)}
        style={styles.button}
      >
        <CustomText style={styles.text}>
          {text}
        </CustomText>
        { icon 
          ?
            <FontAwesomeIcon 
              icon={icon}
              size={verticalScale(20)}
              color={colors.white}
            />
          : null  
        }
        
      </CustomButton>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1, 
    alignItems:'center',
    backgroundColor:colors.primary 
  },
  titleWrapper: {
    marginHorizontal:moderateScale(30),
    marginVertical:verticalScale(100)
  },
  title: {
    textAlign:'center',
    fontSize:verticalScale(17),
    marginBottom:verticalScale(15),
    fontWeight:'bold'
  },
  subtitle: {
    textAlign:'center',
    fontSize:verticalScale(13),
  },
  button: {
    backgroundColor:colors.accent,
    paddingVertical:verticalScale(15),
    paddingHorizontal:moderateScale(30),
    flexDirection:'row',
    gap:moderateScale(20),
    shadowColor:'#222',
    shadowOffset: { width:5, height:3 },
    shadowOpacity:1,
    shadowRadius:1, 
    borderRadius:0,
    borderWidth:2
  },
  text: {
    fontSize:verticalScale(16),
    fontWeight:'600',
    color:colors.white,
  }
})