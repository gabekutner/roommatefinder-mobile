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

import { verticalScale, moderateScale } from 'react-native-size-matters';

import CustomText from '../../components/UI/Custom/CustomText';
import CustomButton from '../../components/UI/Custom/CustomButton';
import CustomTextInput from '../../components/UI/Custom/CustomInput';
import Title from '../../components/UI/Title';
import Snackbar from "../../components/UI/SnackBar";
import CustomLabel from '../../components/UI/Label';

import api from '../../core/api';
import useGlobal from '../../core/global';
import { colors as c } from '../../assets/config';


export default function SignUp({ navigation }) {

  const login = useGlobal(state => state.login)
  const theme = useGlobal(state => state.theme)
  const colors = c[theme]

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
        backgroundColor:colors.accentDark 
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
                text='RoommateFinder'
                style={{
                  color:colors.wasatchSun,
                  textAlign:'center',
                  fontSize:verticalScale(30),
                  fontFamily:'LuckiestGuy-Regular',
                  textShadowColor:'#222',
                  textShadowRadius:10,
                  textShadowOffset: [{ width:15, height:15 }]
                }}
              />
              <CustomText 
                style={{ 
                  color: colors.constWhite,
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

              <CustomLabel color={colors.constWhite} label={'Full Name'} />
              <CustomTextInput 
                keyboardAppearance={theme === 'dark' ? 'dark' : 'light'}
                placeholder={'Gabe Kutner'}
                value={form.name}
                onChangeText={name => setForm({ ...form, name })}
                colors={colors}
                style={{
                  height:verticalScale(45),
                  marginBottom:verticalScale(14),
                  backgroundColor:colors.secondary,
                  color:colors.tint,
                  borderRadius:0,
                  borderWidth:2,
                  borderColor:colors.constBlack,
                  fontSize:verticalScale(14)
                }}
              />

              <CustomLabel color={colors.constWhite} label={'Email Address'} />
              <CustomTextInput 
                autoCapitalize={'none'}
                autoCorrect={false}
                keyboardType={'email-address'}
                placeholder={'gabe@example.com'}
                value={form.email}
                onChangeText={email => setForm({ ...form, email })}
                colors={colors}
                keyboardAppearance={theme === 'dark' ? 'dark' : 'light'}
                style={{
                  height:verticalScale(45),
                  marginBottom:verticalScale(14),
                  backgroundColor:colors.secondary,
                  color:colors.tint,
                  borderRadius:0,
                  borderWidth:2,
                  borderColor:colors.constBlack,
                  fontSize:verticalScale(14)
                }}
              />

              <CustomLabel color={colors.constWhite} label={'Password'} />
              <CustomTextInput 
                secureTextEntry={true}
                placeholder={'********'}
                value={form.password}
                onChangeText={password => setForm({ ...form, password })}
                colors={colors}
                keyboardAppearance={theme === 'dark' ? 'dark' : 'light'}
                style={{
                  height:verticalScale(45),
                  marginBottom:verticalScale(14),
                  backgroundColor:colors.secondary,
                  color:colors.tint,
                  borderRadius:0,
                  borderWidth:2,
                  borderColor:colors.constBlack,
                  fontSize:verticalScale(14)
                }}
              />
              
              <CustomLabel color={colors.constWhite} label={'Confirm Password'} />
              <CustomTextInput 
                secureTextEntry={true}
                placeholder={'********'}
                value={form.rpassword}
                onChangeText={rpassword => setForm({ ...form, rpassword })}
                colors={colors}
                keyboardAppearance={theme === 'dark' ? 'dark' : 'light'}
                style={{
                  height:verticalScale(45),
                  marginBottom:verticalScale(14),
                  backgroundColor:colors.secondary,
                  color:colors.tint,
                  borderRadius:0,
                  borderWidth:2,
                  borderColor:colors.constBlack,
                  fontSize:verticalScale(14)
                }}
              />

              <CustomButton
                onClick={() => onSignUp()}
                style={{ 
                  borderWidth:2,
                  borderRadius:0,
                  borderColor:colors.constBlack,
                  backgroundColor:colors.accentDark,
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
                    color:colors.constWhite,
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
                      color:colors.constWhite 
                    }
                  ]}
                >
                  Already have an account?{' '}
                  <CustomText 
                    style={[
                      styles.text, 
                      { 
                        color:colors.constWhite,
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
                  backgroundColor={colors.primary} // customize background color
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