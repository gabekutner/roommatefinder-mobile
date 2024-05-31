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
      // if (error.response) {
      //   console.log(error.response.data)
      //   console.log(error.response.status)
      //   console.log(error.response.headers)
      // } else if (error.request) {
      //   console.log(error.request)
      // } else {
      //   console.log('Error', error.message)
      // }
      // console.log(error.config)
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
            <View style={{ marginVertical:'10%' }}>
            <Title 
                text='RoommateFinder'
                style={{
                  color:colors.tint,
                  textAlign:'center',
                  fontSize:40,
                  fontFamily:'Acme-Regular'
                }}
              />
              <CustomText 
                style={{ 
                  color: colors.tertiary,
                  marginVertical:10,
                  fontSize:20,
                  fontWeight:'500', 
                  textAlign:'center'
                }}
              >
                Sign up to find your future roommate!
              </CustomText>
            </View>

            <View style={{ marginBottom:24 }}>

              <CustomLabel colors={colors} label={'Full Name'} />
              <CustomTextInput 
                keyboardAppearance={theme === 'dark' ? 'dark' : 'light'}
                placeholder={'Gabe Kutner'}
                value={form.name}
                onChangeText={name => setForm({ ...form, name })}
                colors={colors}
                style={{
                  height:55,
                  marginBottom:16,
                  backgroundColor:colors.secondary,
                  color:colors.tint
                }}
              />

              <CustomLabel colors={colors} label={'Email Address'} />
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
                  height:55,
                  marginBottom:16,
                  backgroundColor:colors.secondary,
                  color:colors.tint
                }}
              />

              <CustomLabel colors={colors} label={'Password'} />
              <CustomTextInput 
                secureTextEntry={true}
                placeholder={'********'}
                value={form.password}
                onChangeText={password => setForm({ ...form, password })}
                colors={colors}
                keyboardAppearance={theme === 'dark' ? 'dark' : 'light'}
                style={{
                  height:55,
                  marginBottom:16,
                  backgroundColor:colors.secondary,
                  color:colors.tint
                }}
              />
              
              <CustomLabel colors={colors} label={'Confirm Password'} />
              <CustomTextInput 
                secureTextEntry={true}
                placeholder={'********'}
                value={form.rpassword}
                onChangeText={rpassword => setForm({ ...form, rpassword })}
                colors={colors}
                keyboardAppearance={theme === 'dark' ? 'dark' : 'light'}
                style={{
                  height:55,
                  marginBottom:16,
                  backgroundColor:colors.secondary,
                  color:colors.tint
                }}
              />

              <CustomButton
                onClick={() => onSignUp()}
                style={{ 
                  borderWidth:1,
                  borderColor:colors.constWhite,
                  backgroundColor:colors.accentDark,
                  shadowColor: '#222',
                  shadowOffset: { width: 7, height: 5 },
                  shadowOpacity: 1,
                  shadowRadius: 1,  
                }}
              >
                <CustomText 
                  style={{ 
                    fontSize:20, 
                    fontWeight:'600', 
                    color:colors.constWhite 
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
                  backgroundColor={colors.accent} // customize background color
                  textColor={colors.constWhite} // change text color
                  actionTextColor={colors.constWhite} // customize action text color
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
    fontSize:17, 
    fontWeight:'600',
    textAlign:'center',
    letterSpacing:0.15,
  }
})