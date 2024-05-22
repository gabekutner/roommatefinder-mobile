import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import CustomText from '../../components/UI/Custom/CustomText';
import Title from '../../components/UI/Title';
import Input from '../../components/UI/Input';
import Button from '../../components/Button';

import styles from '../../styles/auth';
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
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primary }]}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.wrapper}>

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
                Welcome back!
              </CustomText>
            </View>

            <View style={styles.inputWrapper}>
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
              <Button
                onButtonPress={() => { onSignIn() }}
                buttonText={'Log in'}
                onLinkPress={() => navigation.navigate('signup')}
                linkQuestion={"Don't have an account?"}
                linkDirectTo={'Sign up'}
                colors={colors}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}