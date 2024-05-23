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

import CustomText from '../../components/UI/Custom/CustomText';
import CustomButton from '../../components/UI/Custom/CustomButton';
import Title from '../../components/UI/Title';
import Input from '../../components/UI/Input';

import api from '../../core/api';
import useGlobal from '../../core/global';
import { colors as c } from '../../assets/config';


export default function SignIn({ navigation }) {

  const login = useGlobal(state => state.login)
  const theme = useGlobal(state => state.theme)
  const colors = c[theme]

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  function onSignIn() {
    // form validation goes here
    if (!form.email || !form.password) {
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
        console.error('Error:', error);
      })
  }

  return (
    <SafeAreaView style={{ flex:1, backgroundColor:colors.primary }}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={{ flex:1, paddingHorizontal:20, justifyContent:'center' }}>

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
                Welcome back!
              </CustomText>
            </View>

            <View style={{ marginBottom:24 }}>
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
              />
              <Input
                label={'Password'}
                secureTextEntry={true}
                placeholder={'********'}
                value={form.password}
                onChangeText={password => setForm({ ...form, password })}
                colors={colors}
                height={55}
              />

              <CustomButton
                onClick={() => onSignIn()}
                style={{ backgroundColor:colors.accent }}
              >
                <CustomText style={{ fontSize:20, fontWeight:'600', color:colors.constWhite }}>Log in</CustomText>
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
                <CustomText style={[styles.text, { color:colors.tint }]}>
                  Don't have an account?{' '}
                  <CustomText style={[styles.text, { color:colors.tint, textDecorationLine:'underline' }]}>
                    Sign up
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