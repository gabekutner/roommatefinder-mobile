import React, { useState } from 'react';
import {
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';

import { verticalScale } from 'react-native-size-matters';

import CustomText from '../../components/UI/Custom/CustomText';
import CustomButton from '../../components/UI/Custom/CustomButton';
import CustomTextInput from '../../components/UI/Custom/CustomInput';
import Snackbar from "../../components/UI/SnackBar";
import CustomLabel from '../../components/UI/Label';
import Title from '../../components/Brand/Title';

import api from '../../core/api';
import useGlobal from '../../core/global';
import { colors } from '../../constants/colors';


export default function SignUp({ navigation }) {

  const login = useGlobal(state => state.login)

  const [showError, setShowError] = useState({
    status: false,
    message: ""
  })

  const [form, setForm] = useState({
    email: '',
    password: '',
    rpassword: '',
    name: '',
  })

  function validEmail(email) {
    // Regular expression pattern for validating email addresses
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(email)
  }
  
  function onSignUp() {
    // form validation here
    if (!form.name || !form.email || !form.password || !form.rpassword) {
      setShowError({ ...showError, status:true, message:"Missing credentials."})
      return
    }
     
    if (!validEmail(form.email)) {
      setShowError({ ...showError, status:true, message:"Invalid email address."})
      return
    }

    if (form.password !== form.rpassword) {
      setShowError({ ...showError, status:true, message:"Your passwords don't match." })
      return
    }

    api({
      method: 'post',
      url: '/api/v1/profiles/',
      data: {
        email: form.email,
        password: form.password, 
        repeated_password: form.rpassword,
        name:form.name,
      }
    }).then(response => {
      const credentials = {
        email:form.email,
        password:form.password,
      }
      login(
        credentials,
        response.data,
        { 'access': response.data.access, 'refresh': response.data.refresh }
      )
    }).catch((error) => {
      if (error.response.status) {
        setShowError({ ...showError, status:true, message:"This email is already in use." })
      }
    })
  }

  return (
    <SafeAreaView 
      style={{ 
        flex:1, 
        backgroundColor:colors.primary 
      }}
    >
      <KeyboardAvoidingView
        style={{ 
          flex:1, 
          justifyContent:'center' 
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View 
            style={{ 
              flex:1, 
              paddingHorizontal:20, 
              justifyContent:'center' 
            }}
          >
            <View style={{ marginVertical:verticalScale(15) }}>
              <Title 
                title='RoommateFinder'
                color={colors.tint}
                fontSize={verticalScale(30)}
                style={{
                  textAlign:'center'
                }}
              />
              <CustomText 
                style={{ 
                  color: colors.tint,
                  marginVertical:10,
                  fontSize:verticalScale(15),
                  fontWeight:'600', 
                  textAlign:'center',
                }}
              >
                Sign up to find your future roommate!
              </CustomText>
            </View>

            <View style={{ marginBottom:verticalScale(20) }}>

              <CustomLabel color={colors.tint} label={'Full Name'} />
              <CustomTextInput 
                placeholder={'Ex. Gabe'}
                value={form.name}
                onChangeText={name => setForm({ ...form, name })}
                colors={colors}
                emoji={'👤'}
                containerStyle={{
                  height:verticalScale(45),
                  marginBottom:verticalScale(14),
                  backgroundColor:colors.secondary,
                  borderRadius:0,
                  borderWidth:2,
                  borderColor:colors.tint,
                }}
                inputStyle={{
                  fontSize:verticalScale(14),
                  color:colors.tint,
                }}
              />

              <CustomLabel color={colors.tint} label={'Email Address'} />
              <CustomTextInput 
                autoCapitalize={'none'}
                autoCorrect={false}
                keyboardType={'email-address'}
                placeholder={'Ex. gabe@example.com'}
                value={form.email}
                onChangeText={email => setForm({ ...form, email })}
                colors={colors}
                emoji={'📬'}
                containerStyle={{
                  height:verticalScale(45),
                  marginBottom:verticalScale(14),
                  backgroundColor:colors.secondary,
                  borderRadius:0,
                  borderWidth:2,
                  borderColor:colors.tint,
                }}
                inputStyle={{
                  fontSize:verticalScale(14),
                  color:colors.tint,
                }}
              />

              <CustomLabel color={colors.tint} label={'Password'} />
              <CustomTextInput 
                secureTextEntry={true}
                placeholder={'********'}
                value={form.password}
                onChangeText={password => setForm({ ...form, password })}
                colors={colors}
                emoji={'🔑'}
                containerStyle={{
                  height:verticalScale(45),
                  marginBottom:verticalScale(14),
                  backgroundColor:colors.secondary,
                  borderRadius:0,
                  borderWidth:2,
                  borderColor:colors.tint,
                }}
                inputStyle={{
                  fontSize:verticalScale(14),
                  color:colors.tint,
                }}
              />
              
              <CustomLabel color={colors.tint} label={'Confirm Password'} />
              <CustomTextInput 
                secureTextEntry={true}
                placeholder={'********'}
                value={form.rpassword}
                onChangeText={rpassword => setForm({ ...form, rpassword })}
                colors={colors}
                emoji={'🔑'}
                containerStyle={{
                  height:verticalScale(45),
                  marginBottom:verticalScale(14),
                  backgroundColor:colors.secondary,
                  borderRadius:0,
                  borderWidth:2,
                  borderColor:colors.tint,
                }}
                inputStyle={{
                  fontSize:verticalScale(14),
                  color:colors.tint,
                }}
              />

              <CustomButton
                onClick={() => onSignUp()}
                style={{ 
                  borderWidth:2,
                  borderRadius:0,
                  borderColor:colors.tint,
                  backgroundColor:colors.accent,
                  shadowColor: '#222',
                  shadowOffset: { width: 7, height: 5 },
                  shadowOpacity: 1,
                  shadowRadius: 1,  
                }}
              >
                <CustomText 
                  style={{ 
                    fontSize:verticalScale(16), 
                    fontWeight:'600', 
                    color:colors.white,
                  }}
                >
                  Sign up
                </CustomText>
              </CustomButton>

              <Pressable 
                onPress={() => navigation.navigate('signin')}
                style={{
                  flexDirection:'row',
                  gap:5,
                  marginTop:20,
                  justifyContent:'center',
                }}
              >
                <CustomText 
                  style={[
                    styles.text, 
                    { 
                      color:colors.tint 
                    }
                  ]}
                >
                  Already have an account?{' '}
                  <CustomText 
                    style={[
                      styles.text, 
                      { 
                        color:colors.tint,
                        textDecorationLine:'underline' 
                      }
                    ]}
                  >
                    Sign in
                  </CustomText>
                </CustomText>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
        { showError.status
              ? 
                <Snackbar 
                  message={showError.message}
                  actionText="Dismiss"
                  onActionPress={() => {
                    setShowError(false)
                  }}
                  duration={5000} // customize duration
                  position="top" // change the position to 'top'/'bottom'
                  backgroundColor={colors.secondary} // customize background color
                  textColor={colors.tint} // change text color
                  actionTextColor={colors.tint} // customize action text color
                  containerStyle={{ marginHorizontal:12 }} // apply additional styling
                  messageStyle={{ fontWeight:'bold' }} // adjust message text styling
                  actionTextStyle={{ }} // customize action text styling
                />
              : null
            }
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  text: {
    fontSize:verticalScale(14), 
    fontWeight:'600',
    textAlign:'center',
    letterSpacing:0.15,
  }
})