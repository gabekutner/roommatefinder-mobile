import React, { useState } from 'react';
import { View } from 'react-native';

import CustomText from '../../components/UI/Custom/CustomText';
import CustomTextInput from '../../components/UI/Custom/CustomInput';
import Snackbar from "../../components/UI/SnackBar";
import CustomLabel from '../../components/UI/Label';
import Container from './Components/Container';
import CustomButtonComponent from '../../components/Button/CustomButtonComponent';

import useStore from '../../zustand/store';
import api from '../../core/api';
import { colors } from '../../constants/colors';
import { borders, spacing } from '../../styles/styles';


export default function SignUp({ navigation }) {
  const login = useStore(state => state.login)

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

  const text = {
    fontWeight:'600', 
    textAlign:'center',
    letterSpacing:0.15,
    color:colors.tint
  }

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

    if (form.password !== form.rpassword) {
      setShowError({ ...showError, status:true, message:"Your passwords don't match." })
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
      if (error.response.status) {
        setShowError({ ...showError, status:true, message:"This email is already in use." })
      }
    })
  }

  return (
    <Container title='Sign up to find your future roommate!'>
      { showError.status
        ? 
          <Snackbar 
            message={showError.message}
            actionText="Dismiss"
            onActionPress={() => setShowError(false)}
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

      <View>

        <CustomLabel color={colors.tint} label={'Name'} />
        <CustomTextInput 
          placeholder={''}
          value={form.name}
          onChangeText={name => setForm({ ...form, name })}
          colors={colors}
          icon="signature"
          iconColor={colors.tertiary}
          containerStyle={{
            ...spacing.mb5,
            ...borders.bw2,
            backgroundColor:colors.secondary,
            borderColor:colors.tint
          }}
          inputStyle={{ color:colors.tint }}
        />

        <CustomLabel color={colors.tint} label={'Email Address'} />
        <CustomTextInput 
          autoCapitalize={'none'}
          autoCorrect={false}
          keyboardType={'email-address'}
          placeholder={'gabe@example.com'}
          value={form.email}
          onChangeText={email => setForm({ ...form, email })}
          colors={colors}
          icon="envelope"
          iconColor={colors.tertiary}
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
          icon="lock"
          iconColor={colors.tertiary}
          containerStyle={{
            ...spacing.mb5,
            ...borders.bw2,
            backgroundColor:colors.secondary,
            borderColor:colors.tint
          }}
          inputStyle={{ color:colors.tint }}
        />
        
        <CustomLabel color={colors.tint} label={'Confirm Password'} />
        <CustomTextInput 
          secureTextEntry={true}
          placeholder={'********'}
          value={form.rpassword}
          onChangeText={rpassword => setForm({ ...form, rpassword })}
          colors={colors}
          icon="lock"
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
          onClick={() => onSignUp()}
        >
          <CustomText fontSize='large' style={{ fontWeight:'600', color:colors.white }}>
            Sign up
          </CustomText>
        </CustomButtonComponent>

        <CustomButtonComponent
          variant=''
          animated
          style={{ 
            ...borders.bw0,
            ...spacing.mt1
          }}
          onClick={() => navigation.navigate('signin')}
        >  
          <CustomText fontSize='medium' style={text}>
            Already have an account?{' '}
            <CustomText 
              fontSize='medium'
              style={{ 
                ...text, 
                textDecorationLine:'underline' 
              }}
            >
              Sign in
            </CustomText>
          </CustomText>
        </CustomButtonComponent>
      </View>
    </Container>
  )
}