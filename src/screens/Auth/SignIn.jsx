import React, { useState } from 'react';
import { View } from 'react-native';

import { verticalScale } from 'react-native-size-matters';

import Snackbar from '../../components/UI/SnackBar';
import CustomText from '../../components/UI/Custom/CustomText';
import CustomTextInput from '../../components/UI/Custom/CustomInput';
import CustomLabel from '../../components/UI/Label';
import Container from './Components/Container';
import CustomButtonComponent from '../../components/Button/CustomButtonComponent';

import useStore from '../../zustand/store';
import api from '../../core/api';
import { colors } from '../../constants/colors';
import { borders, spacing } from '../../styles/styles';


export default function SignIn({ navigation }) {
  const login = useStore(state => state.login)
  const [showError, setShowError] = useState({
    status: false,
    message: ""
  })
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const text = {
    fontWeight:'600', 
    textAlign:'center',
    letterSpacing:0.15,
    color:colors.tint
  }

  /** move outside */
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
    <Container title="Welcome back!">
      { showError.status
        ?
          <Snackbar
            message={showError.message}
            actionText="Dismiss"
            onActionPress={() => setShowError(false)}
            duration={5000} // customize duration
            position="top" // change the position to 'top'/'bottom'
            backgroundColor={colors.accent} // customize background color
            textColor={colors.white} // change text color
            actionTextColor={colors.white} // customize action text color
            containerStyle={{ marginHorizontal:12 }} // apply additional styling
            messageStyle={{ fontWeight:'bold' }} // adjust message text styling
            actionTextStyle={{ }} // customize action text styling
          /> 
        : null
      }
      <View>
        <CustomLabel color={colors.tint} label={'Email Address'} />
        <CustomTextInput 
          autoCapitalize={'none'}
          autoCorrect={false}
          keyboardType={'email-address'}
          placeholder={'gabe@example.com'}
          value={form.email}
          onChangeText={email => setForm({ ...form, email })}
          icon="envelope"
          iconColor={colors.tertiary}
          colors={colors}
          containerStyle={{
            ...spacing.mb5,
            ...borders.bw2,
            backgroundColor:colors.secondary,
            borderColor:colors.tint
          }}
          inputStyle={{ color:colors.tint }}
        />

        <CustomLabel color={colors.tint} label={'Password'} />
        <CustomTextInput 
          secureTextEntry={true}
          placeholder={'********'}
          value={form.password}
          onChangeText={password => setForm({ ...form, password })}
          colors={colors}
          icon='lock'
          iconColor={colors.tertiary}
          containerStyle={{
            ...spacing.mb5,
            ...borders.bw2,
            backgroundColor:colors.secondary,
            borderColor:colors.tint
          }}
          inputStyle={{ color:colors.tint }}
        />

        <CustomButtonComponent
          variant='standard'
          animated
          shadow
          onClick={() => onSignIn()}
        >
          <CustomText fontSize='large' style={{ fontWeight:'600', color:colors.white }}>
            Log in
          </CustomText>
        </CustomButtonComponent>

        <CustomButtonComponent
          variant=''
          animated
          style={{ 
            ...borders.bw0,
            ...spacing.mt1
          }}
          onClick={() => navigation.navigate('signup')}
        >  
          <CustomText fontSize='medium' style={text}>
            Don't have an account?{' '}
            <CustomText 
              fontSize='medium'
              style={{ 
                ...text, 
                textDecorationLine:'underline' 
              }}
            >
              Sign up
            </CustomText>
          </CustomText>
        </CustomButtonComponent>
      </View>
    </Container>
  )
}