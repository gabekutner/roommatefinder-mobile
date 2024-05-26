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
import Title from '../../components/UI/Title';
import Input from '../../components/UI/Input';

import api from '../../core/api';
import useGlobal from '../../core/global';
import { colors as c } from '../../assets/config';


export default function SignUp({ navigation }) {

  const login = useGlobal(state => state.login)
  const theme = useGlobal(state => state.theme)
  const colors = c[theme]

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
              <Input
                label={'Full Name'}
                placeholder={'Gabe Kutner'}
                value={form.name}
                onChangeText={name => setForm({ ...form, name })}
                colors={colors}
                height={55}
                keyboardAppearance={theme === 'dark' ? 'dark' : 'light'}
              />

              <Input
                label={'Email Address'}
                autoCapitalize={'none'}
                autoCorrect={false}
                keyboardType={'email-address'}
                placeholder={'gabe@example.com'}
                value={form.email}
                onChangeText={email => setForm({ ...form, email })}
                colors={colors}
                height={55}
                keyboardAppearance={theme === 'dark' ? 'dark' : 'light'}
              />

              <Input
                label={'Password'}
                secureTextEntry={true}
                placeholder={'********'}
                value={form.password}
                onChangeText={password => setForm({ ...form, password })}
                colors={colors}
                height={55}
                keyboardAppearance={theme === 'dark' ? 'dark' : 'light'}
              />
              <Input
                label={'Confirm Password'}
                secureTextEntry={true}
                placeholder={'********'}
                value={form.rpassword}
                onChangeText={rpassword => setForm({ ...form, rpassword })}
                colors={colors}
                height={55}
                keyboardAppearance={theme === 'dark' ? 'dark' : 'light'}
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