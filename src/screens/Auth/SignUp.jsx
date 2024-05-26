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

  const [show, setShow] = useState(false)

  const [form, setForm] = useState({
    email: '',
    password: '',
    rpassword: '',
    name: '',
  })
  
  function onSignUp() {
    // form validation here
    if (!form.name || !form.email || !form.password || !form.rpassword) {
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
      if (error.response) {
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log('Error', error.message)
      }
      console.log(error.config)
      setShow(true)
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
            { show
              ? 
                <Snackbar 
                  message="This profile already exists"
                  actionText="Dismiss"
                  onActionPress={() => {
                    setShow(false)
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
            <View style={{ marginVertical:'10%' }}>
              <Title 
                text='roommatefinder' 
                style={{ 
                  color:colors.tint,
                  textAlign:'center',
                  fontSize:34,
                  fontFamily:'Glegoo-Bold' 
                }}
              />
              <CustomText 
                style={{ 
                  color: colors.tertiary,
                  marginVertical:10,
                  fontSize:15,
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
                style={{ backgroundColor:colors.accent }}
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