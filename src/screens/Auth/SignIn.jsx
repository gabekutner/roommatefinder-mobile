import { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Title from '../../components/Title';
import Input from '../../components/Input';
import Button from '../../components/Button';

import Colors from '../../assets/Colors';
import styles from '../../styles/auth';
import api from '../../core/api';
import useGlobal from '../../core/global';


export default function SignIn({ navigation }) {

  const login = useGlobal(state => state.login)

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
      // https://axios-http.com/docs/handling_errors
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
    <SafeAreaView style={styles.container}> 
      <KeyboardAvoidingView behavior='height' style={{ flex:1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
          <View style={styles.wrapper}>

            <View style={styles.header}>
              <Title text='roommatefinder' color={Colors.labelBlack} />
              <Text style={[styles.headerDesc, { fontFamily:'NotoSans_Condensed-Regular' }]}>
                Welcome back!
              </Text>
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
              />

              <Input 
                label={'Password'}
                secureTextEntry={true}
                placeholder={'********'}
                value={form.password}
                onChangeText={password => setForm({ ...form, password })}  
              />

              <Button 
                onButtonPress={() => {onSignIn()}}
                buttonText={'Log in'}
                onLinkPress={() => navigation.navigate('signup')}
                linkQuestion={"Don't have an account?"}
                linkDirectTo={'Sign up'}
              />
            </View>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}