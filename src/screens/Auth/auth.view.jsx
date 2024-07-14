/**
 * UI for auth
 * state is imported from ./index.js
 */
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";

import CustomButtonComponent from '../../components/Button/CustomButtonComponent';
import CustomText from "../../components/UI/Custom/CustomText";
import CustomTextInput from "../../components/UI/Custom/CustomInput";

import {styles} from "./auth.styles";
import {colors} from "../../constants/colors";


function SignIn({ props }) {
  return (
    <View>
      <CustomLabel color={colors.tint} label={'Email Address'} />
      <CustomTextInput 
        autoCapitalize={'none'}
        autoCorrect={false}
        keyboardType={'email-address'}
        placeholder={'gabe@example.com'}
        value={props.form.email}
        onChangeText={email => props.setForm({ ...form, email })}
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
        value={props.form.password}
        onChangeText={password => props.setForm({ ...form, password })}
        colors={colors}
        icon='lock'
        iconColor={colors.tertiary}
        containerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
      />

      {/* <CustomButtonComponent
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
      </CustomButtonComponent> */}
    </View>
  );
};
function SignUp() {};

function Auth({ props }) {
  /** props
   * 
   * title: ''
   * page: 'SignIn' | 'SignUp'
   */
  return (
    <ImageBackground 
      source={require('../../assets/images/image_part_001.png')} 
      style={styles.containerStyle}
      imageStyle={styles.containerImageStyle}
    > 
      <KeyboardAvoidingView behavior="padding" style={{ flex:1 }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.wrapper}>
            <View style={styles.card}>
              <View style={{marginVertical:20}}>
                <Title 
                  title='roommatefinder'
                  color={colors.tint}
                  style={{textAlign:'center'}}
                />
                <CustomText 
                  fontSize="medium" 
                  style={styles.title}
                >
                  {/* Welcome back! */}
                  {/* Sign up to find your future roommate! */}
                  {props.title}
                </CustomText>
              </View>
              {...props.children}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default {SignIn, SignUp, Auth};