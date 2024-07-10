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
import { prompts } from "../../assets/Dictionary";
import { colors } from "../../constants/colors";


export default function WidgetsModal({
  isVisible,
  setIsVisible,
  text
}) {

  const user = useStore(state => state.user)
  const deleteLink = useStore(state => state.deleteLink)

  const whatToRender = () => {
    if (text === 'links') {
      return (
        <View style={{ marginTop:verticalScale(10) }}>
          {user.links.map((link, index) => {
            return (
              <View key={index}>
                <View style={styles.item}>
                  <CustomText fontSize="medium" style={{ color:colors.white, fontWeight:'600' }}>
                    {link.title}
                  </CustomText>
                  <CustomButton 
                    onClick={() => _deleteItem(link)}
                    style={{
                      position:'absolute', 
                      top:verticalScale(-2),
                      left:moderateScale(-50), 
                      borderWidth:0,
                      paddingHorizontal:moderateScale(10),
                      paddingVertical:verticalScale(10),
                      backgroundColor:colors.secondary,
                    }}
                  >
                    <FontAwesomeIcon icon="xmark" size={verticalScale(22)} color={colors.tertiary} />
                  </CustomButton>
                </View>
              </View>
            ) 
          })}
        </View>
      )
    } else if (text === 'quotes') {
      return (
        <>
          {user.quotes.map((quote, index) => (
            <View
              key={index}
              style={{
                width:'100%',
                marginTop:verticalScale(20),
              }}
            >
              <View
                style={{
                  marginHorizontal:moderateScale(10),
                  backgroundColor:colors.secondary,
                  padding:verticalScale(15),
                  borderRadius:12,
                }}
              >
                <CustomText 
                  fontSize="medium" 
                  style={{ 
                    color:colors.tint, 
                    textAlign:'center',
                    fontWeight:'500'
                  }}
                >
                  "{quote.quote}"
                </CustomText>
                <CustomText
                  fontSize="large"
                  style={{
                    marginTop:verticalScale(10),
                    color:colors.tint,
                    textAlign:'center',
                    fontWeight:'600',
                  }}
                >
                  {quote.cited}
                </CustomText>
              </View>
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
              style={{ 
                ...styles.item,
                backgroundColor:colors.secondary,
                marginTop:verticalScale(20)
              }}
            >
              <CustomText fontSize="medium" style={{ color:colors.tint, fontWeight:'600' }}>
                {prompts[prompt.question-1].prompt}
              </CustomText>
              <View 
                style={{ 
                  ...styles.answer,
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

  const _deleteItem = (link) => {
    // delete 
    deleteLink(link.id, user)
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
          <View 
            style={{ 
              position:'absolute', 
              right:moderateScale(10), 
              top:verticalScale(10), 
              borderBottomWidth:1, 
              width:'90%',
            }}
          >
            <CustomButton
              onClick={() => setIsVisible(false)}
              style={{ 
                paddingVertical:verticalScale(10),
                borderWidth:0,
                marginBottom:verticalScale(5),
                backgroundColor:colors.accent,
              }}
            >
              {/* <FontAwesomeIcon icon="xmark" size={verticalScale(22)} color={colors.tertiary} /> */}
              <CustomText fontSize="large" style={{ fontWeight:'600', color:colors.white }}>Close</CustomText>
            </CustomButton>
          </View>

          <View style={{ marginTop:verticalScale(35) }}>
            {whatToRender()}
          </View>
          
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
  },
  // prompt
  answer: {
    backgroundColor:colors.primary,
    padding:verticalScale(10),
    marginTop:verticalScale(5),
    borderRadius:12
  }
})