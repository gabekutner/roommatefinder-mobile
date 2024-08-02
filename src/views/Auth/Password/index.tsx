import React, {useEffect, useState} from "react";
import {SafeAreaView, Text, View, TouchableWithoutFeedback, Keyboard, TouchableOpacity} from "react-native";
import {Button, useTheme, TextInput} from "react-native-paper";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import useBearStore from "../../../libs/store";
// import api from "../../../core/api";
import apiInstance from "constants/apiConstants";
import { theme } from "assets/theme";

import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "types/StackParamList";

type PasswordViewNavigationProp = StackNavigationProp<AuthStackParamList, 'password'>;

interface PasswordViewProps {
  navigation: PasswordViewNavigationProp;
};


const PasswordView: React.FC<PasswordViewProps> = ({
  navigation
}) => {
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true)

  const login = useBearStore((state) => state.login)
  const user = useBearStore((state) => state.user)
  const sendPassword = useBearStore((state) => state.sendPassword);

  const buttonClick = async () => {
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
  };

  useEffect(() => {
    if (password !== "" && repeatPassword !== "" && password === repeatPassword) {
      setDisabled(false);
    };
  }, [password, repeatPassword]);
  

  const [eye, setEye] = useState(true)
  const eyeClick = () => setEye(!eye)

  return (
    <SafeAreaView style={{flex:1 , backgroundColor: theme.colors.background}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>

          <View style={{ justifyContent:'center', alignItems: 'center' }}>
            {/* header */}
            <View style={{justifyContent:'center', alignItems:'center', marginVertical:40}}>
              {/* logo */}
              <View style={{height:50, width:50, backgroundColor:theme.colors.onTertiary, marginBottom:25}}></View>
              <View style={{height:20, width:20, backgroundColor:theme.colors.tertiary, marginTop:-50, marginBottom:25}}></View>

              <View style={{ width:200, alignItems:'center', justifyContent:'center' }}>
                <Text style={{fontSize:18, fontFamily:'NotoSans_Condensed-Regular', fontWeight:'700', color:theme.colors.primary, textAlign:'center'}}>
                  Set up your password
                </Text>
              </View>
            </View>
            {/* content */}
            <View style={{gap: 35}}>
              <View>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-end'}}>
                  <TouchableOpacity onPress={eyeClick}>
                    <FontAwesomeIcon icon={"eye"} />
                  </TouchableOpacity>
                </View>
                <TextInput 
                  mode="outlined"
                  label={'Password'}
                  value={password}
                  onChangeText={text => setPassword(text)}
                  outlineColor={theme.colors.primary}
                  textColor={theme.colors.primary}
                  contentStyle={{width: 300}}
                  keyboardType={"default"}
                  autoCapitalize={'none'}
                  secureTextEntry={eye}
                />
              </View>

              <TextInput 
                mode="outlined"
                label={'Confirm Password'}
                value={repeatPassword}
                onChangeText={text => setRepeatPassword(text)}
                outlineColor={theme.colors.primary}
                textColor={theme.colors.primary}
                contentStyle={{width: 300}}
                keyboardType={"default"}
                autoCapitalize={'none'}
                secureTextEntry={eye}
              />

              <Button
                disabled={disabled}
                onPress={buttonClick}
                mode="elevated"
                buttonColor={theme.colors.onTertiary}
                labelStyle={{
                  fontFamily: 'NotoSans_Condensed-Regular',
                  fontSize: 16, 
                  fontWeight: '700',
                  color: theme.colors.secondary
                }}
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