import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { moderateScale, verticalScale } from 'react-native-size-matters';

import CustomText from "../../../components/UI/Custom/CustomText";
import CustomButton from "../../../components/UI/Custom/CustomButton";
import CustomTextInput from "../../../components/UI/Custom/CustomInput";
import useGlobal from "../../../core/global";
import ProfileImage from "../Components/ProfileImage";
import { colors } from "../../../constants/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";


export default function EditBasicsScreen({ navigation }) {

  const user = useGlobal(state => state.user)
  const form = useGlobal(state => state.form)
  const [_form, _setForm] = useState({
    name: '',
    city: '',
    state: '',
    major: '',
    graduation_year: '',
    description: '',
    dorm_building: '',
    interests: [],
  })

  // const submit = () => {
  //   _setForm({ ..._form, dorm_building:form.dorm_building })
  //   _setForm({ ..._form, interests:form.interests })
  //   console.log(_form)
  // }

  return (
    <SafeAreaView style={{ flex:1, backgroundColor:colors.primary }}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            
            <View style={{ alignItems:'center' }}>              

              <ProfileImage user={user} colors={colors} bc={colors.primary} bg={colors.secondary} />

              <View style={styles.doubleInput}>
                <CustomTextInput 
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  placeholder={'Gabe'}
                  value={_form.name}
                  onChangeText={name => _setForm({ ..._form, name })}
                  icon="signature"
                  iconColor={colors.tertiary}
                  colors={colors}
                  containerStyle={{ ...styles.inputContainer, width:'60%' }}
                  inputStyle={styles.inputText}
                />
                <CustomTextInput 
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  keyboardType={'numeric'}
                  placeholder={'2028'}
                  value={_form.graduation_year}
                  onChangeText={graduation_year => _setForm({ ..._form, graduation_year })}
                  icon="calendar-days"
                  iconColor={colors.tertiary}
                  colors={colors}
                  containerStyle={{ ...styles.inputContainer, width:'40%' }}
                  inputStyle={styles.inputText}
                />
              </View>

              <View style={styles.doubleInput}>
                <CustomTextInput 
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  placeholder={'San Francisco'}
                  value={_form.city}
                  onChangeText={city => _setForm({ ..._form, city })}
                  icon="city"
                  iconColor={colors.tertiary}
                  colors={colors}
                  containerStyle={{ ...styles.inputContainer, width:'70%' }}
                  inputStyle={styles.inputText}
                />
                <CustomTextInput 
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  placeholder={'CA'}
                  value={_form.state}
                  onChangeText={state => _setForm({ ..._form, state })}
                  icon="globe"
                  iconColor={colors.tertiary}
                  colors={colors}
                  containerStyle={{ ...styles.inputContainer, width:'30%' }}
                  inputStyle={styles.inputText}
                />
              </View>

              <CustomTextInput 
                autoCapitalize={'none'}
                autoCorrect={false}
                placeholder={'Computer Engineering'}
                value={_form.major}
                onChangeText={major => _setForm({ ..._form, major })}
                icon="graduation-cap"
                iconColor={colors.tertiary}
                colors={colors}
                containerStyle={{ ...styles.inputContainer, width:'102%' }}
                inputStyle={styles.inputText}
              />

              <CustomTextInput 
                autoCapitalize={'none'}
                autoCorrect={false}
                multiline={true}
                placeholder={'Some super interesting bio here ...'}
                value={_form.description}
                onChangeText={description => _setForm({ ..._form, description })}
                icon="address-book"
                iconColor={colors.tertiary}
                colors={colors}
                containerStyle={{ ...styles.inputContainer, width:'102%', height:verticalScale(100) }}
                inputStyle={styles.inputText}
              />

              <CustomButton onClick={() => {}} style={{ ...styles.goto, marginTop:0 }}>
                <CustomText style={styles.gotoText}>
                  Dorm
                </CustomText>
                <FontAwesomeIcon 
                  icon="arrow-right"
                  size={verticalScale(20)}
                  color={colors.tertiary}
                />
              </CustomButton>

              <CustomButton onClick={() => {}} style={styles.goto}>
                <CustomText style={styles.gotoText}>
                  Interests
                </CustomText>
                <FontAwesomeIcon 
                  icon="arrow-right"
                  size={verticalScale(20)}
                  color={colors.tertiary}
                />
              </CustomButton>

            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex:1, 
    paddingHorizontal:moderateScale(25), 
    justifyContent:'center' 
  },
  doubleInput: {
    flexDirection:'row',
    gap:10,
  },
  inputContainer: {
    height:verticalScale(45),
    marginBottom:verticalScale(14),
    backgroundColor:colors.secondary,
    borderRadius:0,
    borderWidth:2,
    borderColor:colors.tint,
    paddingRight:moderateScale(45)
  },
  inputText: {
    fontSize:verticalScale(14),
    color:colors.tint,
  },
  goto: {
    marginTop:verticalScale(10),
    backgroundColor:colors.secondary,
    flexDirection:'row',
    justifyContent:'space-between',
    width:'102%',
    padding:verticalScale(10),
    alignItems:'center',
    borderWidth:2,
    shadowColor: '#222',
    shadowOffset: { width: 7, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 1, 
    borderRadius:0,
  },
  gotoText: {
    fontSize:verticalScale(14),
    fontWeight:'600',
    color:colors.tertiary
  }
})