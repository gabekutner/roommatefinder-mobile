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
        <>
          {user.links.map((link, index) => (
            <View 
              key={index}
              style={{ 
                backgroundColor:colors.secondary, 
                flexDirection:'row', 
                gap:moderateScale(10), 
                alignItems:'center',
                padding:verticalScale(10),
                borderRadius:12,
                margin:verticalScale(5)
              }}
            >
              <CustomButton onClick={() => {}} style={{ borderWidth:0, paddingVertical:0 }}>
                <FontAwesomeIcon icon="xmark" size={verticalScale(22)} color={colors.tertiary} />
              </CustomButton>
              <View style={styles.item}>
                <CustomText fontSize="medium" style={{ color:colors.white, fontWeight:'600' }}>
                  {link.title}
                </CustomText>
              </View>
            </View>
          ))}
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

  const _deleteLink = (link) => {
    // delete 
    deleteLink(link.id, user)
  }
  const _deleteQuote = (quote) => {
    // _deleteQuote(quote.id, user)
  }
  const _deletePrompt = (prompt) => {
    // _deletePrompt(prompt.id, user)
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
          <View style={{ width:'90%', borderBottomWidth:2, borderColor:colors.tertiary, paddingBottom:verticalScale(5) }}>
            <CustomButton onClick={() => setIsVisible(false)} style={{ alignItems:'flex-end', borderWidth:0, paddingVertical:0, justifyContent:'flex-end' }}>
              <FontAwesomeIcon icon="xmark" size={verticalScale(22)} color={colors.tertiary} />
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
    borderRadius: 12,
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