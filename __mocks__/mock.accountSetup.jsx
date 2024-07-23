import React, {useState} from "react";
import {SafeAreaView, Text, View, TouchableWithoutFeedback, Keyboard} from "react-native";
import {Button, IconButton, useTheme, TextInput} from "react-native-paper";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";


function MockAccountSetup({ navigation }) {
  // on press
  // 1 verify code
  // 2 navigate to account setup
  const customTheme = useTheme();

  // const [code, setCode] = useState("");

  const buttonClick = () => {
    // identifier validation
    // create an account
    // send verification code (part of create an account)
    // navigation.navigate('')
  }

  // temporary
  const [form, setForm] = useState()

  return (
    <SafeAreaView style={{flex:1 , backgroundColor: customTheme.colors.background}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{gap: 35, justifyContent:'center', alignItems: 'center'}}>

          {/* <TextInput 
            mode="outlined"
            // label={id}
            value={identifier}
            onChangeText={text => setIdentifier(text)}
            placeholder={id === 'UID' ? "u1234567" : ""}
            outlineColor={customTheme.colors.primary}
            textColor={customTheme.colors.primary}
            contentStyle={{width: 300}}
            keyboardType={id === 'phone number' ? "phone-pad" : "email-address"}
            autoCapitalize={false}
            maxLength={id === 'phone number' ? 10 : null}
          /> */}

          <Button
            // disabled={code === "" ? true : false}
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
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export {MockAccountSetup}