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

import { verticalScale } from 'react-native-size-matters';

import Snackbar from '../../components/UI/SnackBar';
import CustomText from '../../components/UI/Custom/CustomText';
import CustomButton from '../../components/UI/Custom/CustomButton';
import CustomTextInput from '../../components/UI/Custom/CustomInput';
// import Title from '../../components/UI/Title';
import CustomLabel from '../../components/UI/Label';

import Title from '../../components/Brand/Title';

import api from '../../core/api';
import useGlobal from '../../core/global';
// import { colors as c } from '../../assets/config';
import { colors } from '../../constants/colors';


export default function SignIn({ navigation }) {

  const login = useGlobal(state => state.login)
  // const theme = useGlobal(state => state.theme)
  // const colors = c[theme]

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
        backgroundColor:colors.primary 
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
                Welcome back!
              </CustomText>
            </View>

            <View style={{ marginBottom:verticalScale(20) }}>
              <CustomLabel color={colors.tint} label={'Email Address'} />
              <CustomTextInput 
                autoCapitalize={'none'}
                autoCorrect={false}
                keyboardType={'email-address'}
                placeholder={'gabe@example.com'}
                value={form.email}
                onChangeText={email => setForm({ ...form, email })}
                emoji={'✉️'}
                colors={colors}
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

              <CustomButton
                onClick={() => onSignIn()}
                style={{ 
                  borderWidth:2,
                  borderColor:colors.tint,
                  backgroundColor:colors.accent,
                  borderRadius:0,
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
                      color:colors.tint
                    }
                  ]}
                >
                  Don't have an account?{' '}
                  <CustomText 
                    style={[
                      styles.text, 
                      { 
                        color:colors.tint, 
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
    fontSize:verticalScale(14), 
    fontWeight:'600',
    textAlign:'center',
    letterSpacing:0.15,
  }
})