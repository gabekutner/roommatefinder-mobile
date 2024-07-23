import React, {useState} from "react";
import {SafeAreaView, Text, View, TouchableWithoutFeedback, Keyboard} from "react-native";
import {Button, IconButton, useTheme, TextInput} from "react-native-paper";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";


function MockIdentifier({ route, navigation }) {
  // on press
  // 1 create an account via email address,
  // 2 send verification code
  // 3 navigate to verification code page
  // button shows loading during steps 1 and 2
  const {id} = route.params
  const customTheme = useTheme();

  const [identifier, setIdentifier] = useState("");

  const buttonClick = () => {
    // identifier validation
    // create an account
    // send verification code (part of create an account)
    navigation.navigate('code')
  }

  return (
    <SafeAreaView style={{flex:1 , backgroundColor: customTheme.colors.background}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <View style={{ justifyContent:'center', alignItems:'flex-start', marginLeft:15, marginTop:15 }}>
            <IconButton 
              onPress={() => navigation.goBack()}
              icon={() => <FontAwesomeIcon icon="arrow-left" color={customTheme.colors.primary} />}
              size={22}
              mode="contained"
            />
          </View>
          <View style={{ justifyContent:'center', alignItems: 'center' }}>
            {/* header */}
            <View style={{justifyContent:'center', alignItems:'center', marginVertical:40}}>
              {/* logo */}
              <View style={{height:50, width:50, backgroundColor:'#890000', marginBottom:25}}></View>
              <View style={{height:20, width:20, backgroundColor:'#be0000', marginTop:-50, marginBottom:25}}></View>

              <View style={{ width:200, alignItems:'center', justifyContent:'center' }}>
                <Text style={{fontSize:18, fontFamily:'NotoSans_Condensed-Regular', fontWeight:'700', color:customTheme.colors.primary, textAlign:'center'}}>
                  Let's start with your {id !== 'UID' ? id.toLowerCase() : id}
                </Text>
              </View>
            </View>
            {/* content */}
            <View style={{gap: 35}}>
              <TextInput 
                mode="outlined"
                label={id}
                value={identifier}
                onChangeText={text => setIdentifier(text)}
                placeholder={id === 'UID' ? "u1234567" : ""}
                outlineColor={customTheme.colors.primary}
                textColor={customTheme.colors.primary}
                contentStyle={{width: 300}}
                keyboardType={id === 'phone number' ? "phone-pad" : "email-address"}
                autoCapitalize={false}
                maxLength={id === 'phone number' ? 10 : null}
              />
              <Button
                disabled={identifier === "" ? true : false}
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

export {MockIdentifier}