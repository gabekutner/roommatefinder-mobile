import React from "react";
import {
  Modal,
  View,
  StyleSheet,
  Linking
} from 'react-native';

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { verticalScale, moderateScale } from "react-native-size-matters";

import CustomButton from "../UI/Custom/CustomButton";
import CustomText from "../UI/Custom/CustomText";

import useStore from "../../zustand/store";
import utils from "../../core/utils";
import { prompts } from "../../assets/Dictionary";
import { colors } from "../../constants/colors";


export default function WidgetsModal({
  isVisible,
  setIsVisible,
  text
}) {

  const user = useStore(state => state.user)

  const whatToRender = () => {
    if (text === 'links') {
      return (
        <>
          {user.links.map((link, index) => {
            return (
              <CustomButton 
                shadow
                key={index}
                style={styles.item}
                onClick={() => {
                  const url = utils.testUrl(link.link)
                  Linking.openURL(url).catch((err) =>
                    console.error('openlink err: ', err)
                  )
                }} 
              >
                <CustomText fontSize="medium" style={{ color:colors.white, fontWeight:'600' }}>
                  {link.title}
                </CustomText>
              </CustomButton>
            ) 
          })}
        </>
      )
    } else if (text === 'quotes') {
      return (
        <>
          {user.quotes.map((quote, index) => (
            <View
              key={index}
              style={{
                width:'100%',
                backgroundColor:colors.secondary,
                paddingHorizontal:moderateScale(15),
                paddingVertical:verticalScale(10),
                borderRadius:12,
                margin:verticalScale(2), // Adjust spacing between items 
              }}
            >
              <CustomText fontSize="medium" style={{ color:colors.tint, fontWeight:'600' }}>
                "{quote.quote}"
              </CustomText>
              <CustomText fontSize="medium" style={{ color:colors.tint, fontWeight:'500', marginTop:verticalScale(5) }}>
                - {quote.cited}
              </CustomText>
            </View>
          ))}
        </>
      )
    } else if (text === 'prompts') {
      return (
        <>
          {user.prompts.map((prompt, index) => (
            <View
              key={index}
              style={{ ...styles.item,
                // width:'100%',
                backgroundColor:colors.secondary,
                // paddingHorizontal:moderateScale(15),
                // paddingVertical:verticalScale(10),
                // borderRadius:12,
                // margin:verticalScale(6), // Adjust spacing between items 
              }}
            >
              <CustomText fontSize="medium" style={{ color:colors.tint, fontWeight:'600' }}>
                {prompts[prompt.question-1].prompt}
              </CustomText>
              <View 
                style={{ 
                  backgroundColor:colors.primary,
                  marginTop:verticalScale(5),
                  
                }}
              >
                <CustomText fontSize="medium" style={{ color:colors.tint, fontWeight:'500' }}>
                  {prompt.answer}
                </CustomText>
              </View>
            </View>
          ))}
        </>
      )
    }
  }

  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <CustomButton
            onClick={() => setIsVisible(false)}
            style={{ 
              position:'absolute', 
              right:moderateScale(10), 
              top:verticalScale(10), 
              borderWidth:0, 
              paddingVertical:0 
            }}
          >
            <FontAwesomeIcon icon="xmark" size={verticalScale(22)} color={colors.tertiary} />
          </CustomButton>

          {whatToRender()}
          
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(22),
  },
  modalView: {
    paddingTop:verticalScale(20),
    paddingBottom:verticalScale(20),
    margin:verticalScale(20),
    backgroundColor:colors.primary,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth:2,
    shadowColor: '#000',
    shadowOffset: {
      width: 1.5,
      height: 2,
    },
    shadowOpacity: .7,
    shadowRadius: .6,
    elevation: 5,
    width:'85%',
  },
  item: {
    backgroundColor:colors.accent,
    paddingHorizontal:moderateScale(15),
    paddingVertical:verticalScale(10),
    borderRadius:12,
    margin:verticalScale(6), // Adjust spacing between items 
  }
})