import React, { useState } from "react";
import {SafeAreaView, Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard} from "react-native";
import {Button, TextInput, useTheme} from "react-native-paper";
import useBearStore from "../../../libs/store";
import api from "../../../core/api";


function LoginView({ navigation }) {
  const customTheme = useTheme();
  const [form, setForm] = useState({
    identifier: "",
    password: ""
  })

  const login = useBearStore((state) => state.login)

  const buttonClick = () => {
    const auth = {
      identifier: form.identifier,
      password: form.password
    }
    api({
      method: "post",
      url: "/api/v1/users/login/",
      data: auth,
    }).then((response) => {
      console.log(response.data)
      login(auth, response.data, {
        access: response.data.access,
        refresh: response.data.refresh,
      });
    });
  }

  return (
    <SafeAreaView style={{flex:1 , backgroundColor: customTheme.colors.background, alignItems: 'center'}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{flex:1}}>
        <View style={{flex:1}}>
          <View>
            {/* header */}
            <View style={{justifyContent:'center', alignItems:'center', marginVertical:40}}>
              {/* logo */}
              <View style={{height:50, width:50, backgroundColor:'#890000', marginBottom:25}}></View>
              <View style={{height:20, width:20, backgroundColor:'#be0000', marginTop:-50, marginBottom:25}}></View>

              <View style={{ width:150, alignItems:'center', justifyContent:'center' }}>
                <Text style={{fontSize:18, fontFamily:'NotoSans_Condensed-Regular', fontWeight:'700', color:customTheme.colors.primary, textAlign:'center'}}>
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
                outlineColor={customTheme.colors.primary}
                textColor={customTheme.colors.primary}
                contentStyle={{width: 300}}
                keyboardType={"email-address"}
                autoCapitalize={false}
              />
              <TextInput 
                mode="outlined"
                label={'Password'}
                value={form.password}
                onChangeText={text => setForm({...form, password:text})}
                placeholder={""}
                outlineColor={customTheme.colors.primary}
                textColor={customTheme.colors.primary}
                contentStyle={{width: 300}}
                keyboardType={"default"}
                autoCapitalize={false}
              />

              <Button
                onPress={buttonClick}
                mode="elevated"
                buttonColor={'#890000'}
                labelStyle={[
                  styles.fontFamily,
                  styles.buttonText,
                  {color: customTheme.colors.secondary}
                ]}
              >
                <Text>Continue</Text>
              </Button>

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
                  color: customTheme.colors.primary,
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
                  {color: customTheme.colors.primary}
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
                  {color: customTheme.colors.primary}
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