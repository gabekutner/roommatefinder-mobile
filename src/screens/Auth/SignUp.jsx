import React, { useState } from 'react';
import {
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';

import CustomText from '../../components/UI/Custom/CustomText';
import Title from '../../components/UI/Title';
import Input from '../../components/UI/Input';
import Button from '../../components/Button';

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
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primary }]}>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerWrapper}>

            <View style={styles.header}>
              <Title 
                text='roommatefinder' 
                style={{ 
                  color:colors.tint,
                  textAlign:'center',
                  fontSize:34,
                  fontFamily:'Glegoo-Bold' 
                }}
              />
              <CustomText style={[styles.headerDesc, { color: colors.tertiary }]}>
                Sign up to find your future roommate!
              </CustomText>
            </View>

            <View style={styles.inputWrapper}>
              <Input
                label={'Full Name'}
                placeholder={'Gabe Kutner'}
                value={form.name}
                onChangeText={name => setForm({ ...form, name })}
                colors={colors}
                height={55}
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
              <Input
                label={'Confirm Password'}
                secureTextEntry={true}
                placeholder={'********'}
                value={form.rpassword}
                onChangeText={rpassword => setForm({ ...form, rpassword })}
                colors={colors}
                height={55}
              />

              <Button
                onButtonPress={() => { onSignUp() }}
                buttonText={'Sign up'}
                onLinkPress={() => navigation.navigate('signin')}
                linkQuestion={"Have an account?"}
                linkDirectTo={'Sign in'}
                colors={colors}
              />
            </View>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: { flex: 1 },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  innerWrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: { marginBottom: 20 },
  headerDesc: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },
  inputWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
})