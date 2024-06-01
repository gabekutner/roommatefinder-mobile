import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Pressable,
  View,
  StyleSheet,
} from 'react-native';

import Snackbar from '../../components/UI/SnackBar';
import CustomText from '../../components/UI/Custom/CustomText';
import CustomButton from '../../components/UI/Custom/CustomButton';
import CustomTextInput from '../../components/UI/Custom/CustomInput';
import Title from '../../components/UI/Title';
import CustomLabel from '../../components/UI/Label';

import api from '../../core/api';
import useGlobal from '../../core/global';
import { colors as c } from '../../assets/config';


export default function SignIn({ navigation }) {

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
  })

  function validEmail(email) {
    // Regular expression pattern for validating email addresses
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(email)
  }

  function onSignIn() {
    // Form validation
    if (!form.email || !form.password) {
      setShowError({ ...showError, status:true, message:"Missing credentials."})
      return
    }
    if (!validEmail(form.email)) {
      setShowError({ ...showError, status:true, message:"Invalid email address."})
      return
    }

    api({
      method: 'post',
      url: '/api/v1/users/login/',
      data: {
        email: form.email,
        password: form.password,
      },
    })
      .then(response => {
        const credentials = {
          email: form.email,
          password: form.password,
        }
        login(
          credentials,
          response.data,
          { access: response.data.access, refresh: response.data.refresh }
        )
      })
      .catch(error => {
        // Handle error
        if (error.response.status) {
          setShowError({ ...showError, status:true, message:"Invalid credentails or this email is already in use." })
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
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
                  color:colors.wasatchSun,
                  textAlign:'center',
                  fontSize:40,
                  fontFamily:'Acme-Regular',
                }}
              />
              <CustomText 
                style={{ 
                  color: colors.constWhite,
                  marginVertical:10,
                  fontSize:20,
                  fontWeight:'500', 
                  textAlign:'center',
                  // fontFamily:'blambotcustom'
                }}
              >
                Welcome back!
              </CustomText>
            </View>

            <View style={{ marginBottom:24 }}>

              <CustomLabel color={colors.constWhite} label={'Email Address'} />
              <CustomTextInput 
                autoCapitalize={'none'}
                autoCorrect={false}
                keyboardType={'email-address'}
                keyboardAppearance={theme === 'dark' ? 'dark' : 'light'}
                placeholder={'gabe@example.com'}
                value={form.email}
                onChangeText={email => setForm({ ...form, email })}
                colors={colors}
                style={{
                  height:55,
                  marginBottom:16,
                  backgroundColor:colors.secondary,
                  color:colors.tint,
                  borderRadius:0,
                  borderWidth:2,
                  borderColor:colors.constBlack
                }}
              />

              <CustomLabel color={colors.constWhite} label={'Password'} />
              <CustomTextInput 
                secureTextEntry={true}
                keyboardAppearance={theme === 'dark' ? 'dark' : 'light'}
                placeholder={'********'}
                value={form.password}
                onChangeText={password => setForm({ ...form, password })}
                colors={colors}
                style={{
                  height:55,
                  marginBottom:16,
                  backgroundColor:colors.secondary,
                  color:colors.tint,
                  borderRadius:0,
                  borderWidth:2,
                  borderColor:colors.constBlack
                }}
              />

              <CustomButton
                onClick={() => onSignIn()}
                style={{ 
                  borderWidth:2,
                  borderColor:colors.constBlack,
                  backgroundColor:colors.accentDark,
                  borderRadius:0,
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
                    color:colors.constWhite,
                    fontFamily:'Acme-Regular'
                  }}
                >
                  Log in
                </CustomText>
              </CustomButton>

              <Pressable 
                onPress={() => navigation.navigate('signup')}
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
                  Don't have an account?{' '}
                  <CustomText 
                    style={[
                      styles.text, 
                      { 
                        color:colors.constWhite, 
                        textDecorationLine:'underline' 
                      }
                    ]}
                  >
                    Sign up
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
    fontSize:17, 
    fontWeight:'600',
    textAlign:'center',
    letterSpacing:0.15,
  }
})