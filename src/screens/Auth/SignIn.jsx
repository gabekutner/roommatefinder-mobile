import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Pressable,
  View,
  StyleSheet,
  ImageBackground
} from 'react-native';

import { verticalScale, moderateScale } from 'react-native-size-matters';

import Snackbar from '../../components/UI/SnackBar';
import CustomText from '../../components/UI/Custom/CustomText';
import CustomButton from '../../components/UI/Custom/CustomButton';
import CustomTextInput from '../../components/UI/Custom/CustomInput';
import CustomLabel from '../../components/UI/Label';
import Title from '../../components/Brand/Title';

import useStore from '../../zustand/store';
import api from '../../core/api';
import { colors } from '../../constants/colors';


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
    <ImageBackground 
      source={require('../../assets/images/image_part_001.png')} 
      style={{ flex:1, backgroundColor:colors.secondary }}
      imageStyle={{ opacity:0.3 }}
    >
      <KeyboardAvoidingView behavior="padding" style={{ flex:1 }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <View style={styles.wrapper}>

              <View style={{ marginVertical:'10%' }}>
                <Title 
                  title='roommatefinder'
                  color={colors.tint}
                  style={{ textAlign:'center' }}
                />
                <CustomText fontSize="medium" style={styles.subtitle}>
                  Welcome back!
                </CustomText>
              </View>
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
              <View style={{ marginBottom:verticalScale(20) }}>
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
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.inputText}
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
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.inputText}
                />

                <CustomButton onClick={() => onSignIn()} shadow style={styles.buttonStyle}>
                  <CustomText fontSize='large' style={styles.buttonText}>
                    Log in
                  </CustomText>
                </CustomButton>

                <Pressable onPress={() => navigation.navigate('signup')} style={styles.pressableStyle}>
                  <CustomText fontSize='medium' style={styles.text}>
                    Don't have an account?{' '}
                    <CustomText 
                      fontSize='medium'
                      style={{ 
                        ...styles.text, 
                        textDecorationLine:'underline' 
                      }}
                    >
                      Sign up
                    </CustomText>
                  </CustomText>
                </Pressable>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}


const styles = StyleSheet.create({
  container: {
    flex:1, 
    justifyContent:'center',
    width:'95%',
    alignSelf:'center',        
  },
  wrapper: {
    backgroundColor:colors.primary, 
    paddingVertical:verticalScale(10), 
    paddingHorizontal:moderateScale(25),
    borderRadius:12,
    borderWidth:2,
    shadowColor: '#222',
    shadowOffset: { width: 5, height: 3 },
    shadowOpacity: .7,
    shadowRadius: 1,  
  },
  subtitle: {
    color: colors.tint,
    marginVertical:verticalScale(5),
    fontWeight:'600', 
    textAlign:'center',
  },
  inputContainer: {
    marginBottom:verticalScale(14),
    backgroundColor:colors.secondary,
    borderWidth:2,
    borderColor:colors.tint,
  },
  inputText: { color:colors.tint },
  buttonStyle: {
    borderWidth:2,
    backgroundColor:colors.accent,
  },
  buttonText: {
    fontWeight:'600', 
    color:colors.white,
  },
  pressableStyle: {
    flexDirection:'row',
    gap:5,
    marginTop:verticalScale(20),
    justifyContent:'center'
  },
  text: {
    fontWeight:'600',
    textAlign:'center',
    letterSpacing:0.15,
    color:colors.tint
  }
})