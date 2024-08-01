import React, { useState } from "react";
import {SafeAreaView, Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity} from "react-native";
import {Button, TextInput} from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import apiInstance from "constants/apiConstants";
import useBearStore from "../../../libs/store";
import { theme } from "assets/theme";

import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "types/StackParamList";

type LoginViewNavigationProp = StackNavigationProp<AuthStackParamList, 'identifier'>;

interface LoginViewProps {
  navigation: LoginViewNavigationProp;
};

const LoginView: React.FC<LoginViewProps> = ({
  navigation
}) => {
  const login = useBearStore((state) => state.login)

  const [form, setForm] = useState({
    identifier: "",
    password: ""
  })

  const buttonClick = () => {
    const auth = {
      identifier: form.identifier,
      password: form.password
    };
    apiInstance({
      method: "post",
      url: "/api/v1/users/login/",
      data: auth,
    }).then((response) => {
      login(auth, response.data, {
        access: response.data.access,
        refresh: response.data.refresh,
      });
    });
  }

  const [eye, setEye] = useState(true)
  const eyeClick = () => setEye(!eye)

  return (
    <SafeAreaView style={{flex:1 , backgroundColor: theme.colors.background, alignItems: 'center'}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{flex:1}}>
        <View style={{flex:1}}>
          <View>
            {/* header */}
            <View style={{justifyContent:'center', alignItems:'center', marginVertical:40}}>
              {/* logo */}
              <View style={{height:50, width:50, backgroundColor:theme.colors.onTertiary, marginBottom:25}}></View>
              <View style={{height:20, width:20, backgroundColor:theme.colors.tertiary, marginTop:-50, marginBottom:25}}></View>

              <View style={{ width:150, alignItems:'center', justifyContent:'center' }}>
                <Text style={{fontSize:18, fontFamily:'NotoSans_Condensed-Regular', fontWeight:'700', color:theme.colors.primary, textAlign:'center'}}>
                  Welcome back!
                </Text>
              </View>
            </View>
            {/* content */}
            <View style={{gap:15}}>

              <TextInput 
                mode="outlined"
                label={'Email, phone number, or UID'}
                value={form.identifier}
                onChangeText={text => setForm({...form, identifier:text})}
                placeholder={""}
                outlineColor={theme.colors.primary}
                autoCapitalize={'none'}
                textColor={theme.colors.primary}
                contentStyle={{width: 300}}
                keyboardType={"email-address"}
                
              />
              <View>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-end'}}>
                  <TouchableOpacity onPress={eyeClick}>
                    <FontAwesomeIcon icon={"eye"} />
                  </TouchableOpacity>
                </View>
                <TextInput 
                  mode="outlined"
                  label={'Password'}
                  value={form.password}
                  onChangeText={text => setForm({...form, password:text})}
                  placeholder={""}
                  outlineColor={theme.colors.primary}
                  textColor={theme.colors.primary}
                  contentStyle={{width: 300}}
                  keyboardType={"default"}
                  autoCapitalize={'none'}
                  secureTextEntry={eye}
                />
              </View>
              
              <Button
                onPress={buttonClick}
                mode="elevated"
                buttonColor={theme.colors.onTertiary}
                labelStyle={[
                  styles.text,
                  styles.buttonText,
                  {color: theme.colors.secondary}
                ]}
              >
                <Text>Continue</Text>
              </Button>

              <View style={{width:'100%', flexDirection:'row', justifyContent:'center'}}>
                <Text style={{ fontFamily:"NotoSans_Condensed-Regular", fontSize:14, fontWeight:'500', color:theme.colors.primary }}>
                  Don't have an account?
                  {" "}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('startup')}>
                  <Text style={{ fontFamily:"NotoSans_Condensed-Regular", fontSize:14, fontWeight:'500', color:theme.colors.primary, textDecorationLine:'underline' }}>
                    Sign up
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>

          {/* footer */}
          <View style={{position:'absolute', right:10, left:10, bottom:35 }}>
            <Text 
              style={[
                styles.text,
                styles.smallText,
                {
                  textAlign: 'center',
                  color: theme.colors.primary,
                  textDecorationLine: 'none'
                }
              ]}
            >
              By continuing to use DormParty, you agree to our
              {' '}
              <Text 
                style={[
                  styles.text,
                  styles.smallText,
                  {color: theme.colors.primary}
                ]}
              >
                Terms of Service
              </Text>
              {' '}
              and
              {' '}
              <Text 
                style={[
                  styles.text,
                  styles.smallText,
                  {color: theme.colors.primary}
                ]}
              >
                Privacy Policy
              </Text>
              .
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      
    </SafeAreaView>
  );
};

export {LoginView};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'NotoSans_Condensed-Regular',
  },
  
  smallText: {
    fontSize: 11, 
    textDecorationLine:'underline'
  },
  buttonText: {
    fontSize: 16, 
    fontWeight: '700'
  },

  spacer: {
    height: .5, 
    width: 100,
  }

});