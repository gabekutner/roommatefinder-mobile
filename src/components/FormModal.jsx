import React from "react";
import {
  Modal,
  View,
  StyleSheet
} from 'react-native';

import { verticalScale, moderateScale } from "react-native-size-matters";

import CustomButton from "./UI/Custom/CustomButton";
import CustomText from "./UI/Custom/CustomText";

import { colors } from "../constants/colors";
import CustomLabel from "./UI/Label";
import CustomTextInput from "./UI/Custom/CustomInput";


export default function FormModal({
  isVisible,
  setIsVisible,
  title,
  subtitle,
  placeholderTitle,
  placeholderTitleEmoji,
  placeholderMessage,
  placeholderMessageEmoji,
  form,
  setForm,
}) {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <CustomText style={[styles.modalText, styles.title, { marginBottom:0 }]}>{title}</CustomText>
          <CustomText style={[styles.modalText, { marginTop:verticalScale(7), fontSize:verticalScale(12) }]}>{subtitle}</CustomText>

          <View style={styles.inputBox}>
            <CustomLabel color={colors.tint} label={'Title'} />
            <CustomTextInput 
              autoCapitalize={'none'}
              autoCorrect={false}
              placeholder={placeholderTitle}
              value={form.title}
              onChangeText={title => setForm({ ...form, title })}
              emoji={placeholderTitleEmoji}
              colors={colors}
              containerStyle={{
                height:verticalScale(45),
                marginBottom:verticalScale(14),
                backgroundColor:colors.secondary,
                borderRadius:0,
                borderWidth:2,
                borderColor:colors.tint,
                paddingRight:moderateScale(40)
              }}
              inputStyle={{
                fontSize:verticalScale(13),
                color:colors.tint,
              }}
            />

            <CustomLabel color={colors.tint} label={'Message'} />
            <CustomTextInput 
              autoCapitalize={'none'}
              autoCorrect={false}
              keyboardType={'email-address'}
              placeholder={placeholderMessage}
              multiline={true}
              value={form.message}
              onChangeText={message => setForm({ ...form, message })}
              emoji={placeholderMessageEmoji}
              colors={colors}
              containerStyle={{
                height:verticalScale(65),
                marginBottom:verticalScale(14),
                backgroundColor:colors.secondary,
                borderRadius:0,
                borderWidth:2,
                borderColor:colors.tint,
                paddingRight:moderateScale(30)
              }}
              inputStyle={{
                fontSize:verticalScale(12),
                color:colors.tint,
              }}
            />
          </View>

          <CustomButton
            onClick={() => {
              console.log(form)
              setIsVisible(false)
            }}
            style={{ 
                borderWidth:2,
                borderColor:colors.tint,
                backgroundColor:colors.accent,
                borderRadius:0,
                shadowColor: '#222',
                shadowOffset: { width: 7, height: 5 },
                shadowOpacity: 1,
                shadowRadius: 1,  
                paddingHorizontal:moderateScale(20)
              }}
            >
            <CustomText 
              style={{ 
                fontSize:verticalScale(14), 
                fontWeight:'600', 
                color:colors.white,
              }}
            >
              Good to go!
            </CustomText>
          </CustomButton>
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
    margin:verticalScale(20),
    backgroundColor:colors.primary,
    borderRadius: 20,
    padding: verticalScale(35),
    alignItems: 'center',
    borderWidth:1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputBox: {
    width:'80%'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: verticalScale(14),
    textAlign: 'center',
  },
  title: {
    fontSize:verticalScale(16),
    fontWeight:'600',
  }
});