import React, {useState} from "react";
import {SafeAreaView, Text, View, TouchableWithoutFeedback, Keyboard, TouchableOpacity} from "react-native";
import {Button, useTheme, TextInput, HelperText} from "react-native-paper";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import useBearStore from "../../../libs/store";
import api from "../../../core/api";


function PasswordView({ navigation }) {
  const customTheme = useTheme();

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [valid, setValid] = useState("");

  const login = useBearStore((state) => state.login)
  const user = useBearStore((state) => state.user)
  const sendPassword = useBearStore((state) => state.sendPassword);

  const buttonClick = async () => {
    // 1. check password similarity
    if (password != repeatPassword) {
      // opposites : true = show error, false = don't
      setValid(true)
    } else {
      // 2. update profile with password
      const res = await sendPassword(password, repeatPassword)
      if (res === 200) {
        // 3. login user
        api({
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
        })

        // 4. navigation.navigate('setup')
      } else {
        // show error
      }      
    }
  }

  const [eye, setEye] = useState(true)

  const eyeClick = () => {
    console.log(eye)
    setEye(!eye)
  }

  return (
    <SafeAreaView style={{flex:1 , backgroundColor: customTheme.colors.background}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>

          <View style={{ justifyContent:'center', alignItems: 'center' }}>
            {/* header */}
            <View style={{justifyContent:'center', alignItems:'center', marginVertical:40}}>
              {/* logo */}
              <View style={{height:50, width:50, backgroundColor:'#890000', marginBottom:25}}></View>
              <View style={{height:20, width:20, backgroundColor:'#be0000', marginTop:-50, marginBottom:25}}></View>

              <View style={{ width:200, alignItems:'center', justifyContent:'center' }}>
                <Text style={{fontSize:18, fontFamily:'NotoSans_Condensed-Regular', fontWeight:'700', color:customTheme.colors.primary, textAlign:'center'}}>
                  Set up your password
                </Text>
              </View>
            </View>
            {/* content */}
            <View style={{gap: 35}}>
              <View>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                  <HelperText type="info" visible={eye}>
                    {password}
                  </HelperText>
                  <TouchableOpacity onPress={eyeClick}>
                    <FontAwesomeIcon icon={"eye"} />
                  </TouchableOpacity>
                </View>
                <TextInput 
                  mode="outlined"
                  label={'Password'}
                  value={password}
                  onChangeText={text => setPassword(text)}
                  outlineColor={customTheme.colors.primary}
                  textColor={customTheme.colors.primary}
                  contentStyle={{width: 300}}
                  keyboardType={"default"}
                  autoCapitalize={false}
                  secureTextEntry
                />
              </View>

              <TextInput 
                mode="outlined"
                label={'Confirm Password'}
                value={repeatPassword}
                onChangeText={text => setRepeatPassword(text)}
                outlineColor={customTheme.colors.primary}
                textColor={customTheme.colors.primary}
                contentStyle={{width: 300}}
                keyboardType={"default"}
                autoCapitalize={false}
                secureTextEntry
              />

              <HelperText type="error" visible={valid}>
                Passwords don't match!
              </HelperText>
              <Button
                disabled={password === "" || repeatPassword === ""  ? true : false}
                onPress={buttonClick}
                mode="elevated"
                buttonColor={'#890000'}
                labelStyle={{
                  fontFamily: 'NotoSans_Condensed-Regular',
                  fontSize: 16, 
                  fontWeight: '700',
                  color: customTheme.colors.secondary
                }}
              >
                <Text>Continue</Text>
              </Button>

            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export {PasswordView}