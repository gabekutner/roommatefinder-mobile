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
  View,
} from "react-native";

import CustomLabel from "../../components/UI/Label";
import Title from "../../components/Brand/Title";
import CustomText from "../../components/UI/Custom/CustomText";
import CustomTextInput from "../../components/UI/Custom/CustomInput";
import {AuthAction} from "./Components/AuthAction";

import {styles} from "./auth.styles";
import {colors} from "../../constants/colors";
import useStore from "../../zustand/store";


function SignIn(props) {
  return (
    <View>
      <CustomLabel color={colors.tint} label={'Email Address'} />
      <CustomTextInput 
        autoCapitalize={'none'}
        autoCorrect={false}
        keyboardType={'email-address'}
        placeholder={'gabe@example.com'}
        value={props.form.email}
        onChangeText={email => props.setForm({ ...props.form, email })}
        icon="envelope"
        iconColor={colors.tertiary}
        colors={colors}
        containerStyle={styles.inputContainer}
        inputStyle={styles.text}
      />

      <CustomLabel color={colors.tint} label={'Password'} />
      <CustomTextInput 
        secureTextEntry={true}
        placeholder={'********'}
        value={props.form.password}
        onChangeText={password => props.setForm({ ...props.form, password })}
        colors={colors}
        icon='lock'
        iconColor={colors.tertiary}
        containerStyle={styles.inputContainer}
        inputStyle={styles.text}
      />

      <AuthAction 
        navigation={() => props.navigation.navigate('signup')} 
        text1="Log in"
        text2="Don't have an account? "
        text3="Sign up"
        form={props.form}
      />
    </View>
  );
};

function SignUp(props) {
  return (
    <View>
      <CustomLabel color={colors.tint} label={'Name'} />
      <CustomTextInput 
        placeholder={''}
        value={props.form.name}
        onChangeText={name => props.setForm({ ...props.form, name })}
        colors={colors}
        icon="signature"
        iconColor={colors.tertiary}
        containerStyle={styles.inputContainer}
        inputStyle={styles.text}
      />

      <CustomLabel color={colors.tint} label={'Email Address'} />
      <CustomTextInput 
        autoCapitalize={'none'}
        autoCorrect={false}
        keyboardType={'email-address'}
        placeholder={'gabe@example.com'}
        value={props.form.email}
        onChangeText={email => props.setForm({ ...props.form, email })}
        colors={colors}
        icon="envelope"
        iconColor={colors.tertiary}
        containerStyle={styles.inputContainer}
        inputStyle={styles.text}
      />

      <CustomLabel color={colors.tint} label={'Password'} />
      <CustomTextInput 
        secureTextEntry={true}
        placeholder={'********'}
        value={props.form.password}
        onChangeText={password => props.setForm({ ...props.form, password })}
        colors={colors}
        icon="lock"
        iconColor={colors.tertiary}
        containerStyle={styles.inputContainer}
        inputStyle={styles.text}
      />
      
      <CustomLabel color={colors.tint} label={'Confirm Password'} />
      <CustomTextInput 
        secureTextEntry={true}
        placeholder={'********'}
        value={props.form.rpassword}
        onChangeText={rpassword => props.setForm({ ...props.form, rpassword })}
        colors={colors}
        icon="lock"
        iconColor={colors.tertiary}
        containerStyle={styles.inputContainer}
        inputStyle={styles.text}
      />

      <AuthAction 
        navigation={() => props.navigation.navigate('signin')} 
        text1="Sign up"
        text2="Already have an account? "
        text3="Sign in"
        form={props.form}
      />
    </View>
  );
};

function Auth(props) {
  return (
    <ImageBackground 
      source={require('../../assets/images/image_part_001.png')} 
      style={[styles.container, {backgroundColor: 'rgba(0,0,0,.45)'}]}
      imageStyle={styles.containerImageStyle}
    > 
      <KeyboardAvoidingView behavior="padding" style={{flex:1}}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <View style={styles.card}>
              <View style={{ alignItems:'center', marginTop:15 }}>
                <Title 
                  title='roommatefinder'
                  color={colors.tint}
                />
                <CustomText 
                  fontSize="medium" 
                  style={[styles.title, styles.text]}
                >
                  {/* Welcome back! */}
                  {/* Sign up to find your future roommate! */}
                  {props.title}
                </CustomText>
              </View>
              {props.children}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export {SignIn, SignUp, Auth};