import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';

import { moderateScale, verticalScale } from 'react-native-size-matters';

import CustomText from "../../../components/UI/Custom/CustomText";
import CustomTextInput from "../../../components/UI/Custom/CustomInput";
import useGlobal from "../../../core/global";
import ProfileImage from "../Components/ProfileImage";
import { colors } from "../../../constants/colors";


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
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
})