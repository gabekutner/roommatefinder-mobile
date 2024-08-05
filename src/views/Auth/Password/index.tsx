import React, {useEffect, useState} from "react";
import {SafeAreaView, StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, TouchableOpacity} from "react-native";
import {Button, TextInput} from "react-native-paper";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import useBearStore from "../../../libs/store";
import apiInstance from "constants/apiConstants";
import { theme } from "assets/theme";


const PasswordView: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const login = useBearStore((state) => state.login)
  const user = useBearStore((state) => state.user)
  const sendPassword = useBearStore((state) => state.sendPassword);

  const buttonClick = async () => {
    setLoading(true)
    // 1. check password similarity
    if (password != repeatPassword) {} else {
      // 2. update profile with password
      const res = await sendPassword(password, repeatPassword)
      if (res === 200) {
        // 3. login user
        apiInstance({
          method: "post",
          url: "/api/v1/users/login/",
          data: {
            identifier: user.identifier,
            password: password,
          },
        }).then((response) => {
          const credentials = {
            identifier: user.identifier,
            password: password,
          };
          login(credentials, response.data, {
            access: response.data.access,
            refresh: response.data.refresh,
          });
        });
      } else {
        // error setting passwords, 500 
      };
    };
    setLoading(false)
  };

  useEffect(() => {
    if (password !== "" && repeatPassword !== "" && password === repeatPassword) {
      setDisabled(false);
    };
  }, [password, repeatPassword]);
  

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
                  Set up your password
                </Text>
              </View>
            </View>
            {/* content */}
            <View style={{gap:15}}>
              <View>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-end'}}>
                  <TouchableOpacity onPress={eyeClick}>
                    <FontAwesomeIcon icon={"eye"} />
                  </TouchableOpacity>
                </View>
                <TextInput 
                  mode="outlined"
                  label={'Password'}
                  onChangeText={text => setPassword(text)}
                  value={password}
                  outlineColor={theme.colors.primary}
                  autoCapitalize={'none'}
                  textColor={theme.colors.primary}
                  contentStyle={{width: 300}}
                  keyboardType={"default"}
                  secureTextEntry={eye}
                />
              </View>

              <TextInput 
                mode="outlined"
                label={'Confirm Password'}
                value={repeatPassword}
                onChangeText={text => setRepeatPassword(text)}
                placeholder={""}
                outlineColor={theme.colors.primary}
                textColor={theme.colors.primary}
                contentStyle={{width: 300}}
                keyboardType={"default"}
                autoCapitalize={'none'}
                secureTextEntry={eye}
              />
              
              <Button
                loading={loading}
                disabled={disabled}
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

            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export {PasswordView};

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