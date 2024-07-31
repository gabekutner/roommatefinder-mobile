import React from "react";
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text

} from "react-native"

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconButton, Button, TextInput, Snackbar } from "react-native-paper";



function Content(props) { 
  return (
    <SafeAreaView style={{flex:1 , backgroundColor: props.customTheme.colors.background}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{flex:1}}>
          <View style={{ justifyContent:'center', alignItems:'flex-start', marginLeft:15, marginTop:15 }}>
            <IconButton 
              onPress={() => props.navigation.goBack()}
              icon={() => <FontAwesomeIcon icon="arrow-left" color={props.customTheme.colors.primary} />}
              size={22}
              mode="contained"
            />
          </View>
          <View style={{ justifyContent:'center', alignItems: 'center' }}>
            {/* header */}
            <View style={{justifyContent:'center', alignItems:'center', marginVertical:40}}>
              {/* logo */}
              <View style={{height:50, width:50, backgroundColor:props.customTheme.colors.tertiaryDark, marginBottom:25}}></View>
              <View style={{height:20, width:20, backgroundColor:props.customTheme.colors.tertiary, marginTop:-50, marginBottom:25}}></View>

              <View style={{ width:200, alignItems:'center', justifyContent:'center' }}>
                <Text style={{fontSize:18, fontFamily:'NotoSans_Condensed-Regular', fontWeight:'700', color:props.customTheme.colors.primary, textAlign:'center'}}>
                  Let's start with your {props.id !== 'UID' ? props.id.toLowerCase() : props.id}
                </Text>
              </View>
            </View>
            {/* content */}
            <View style={{gap: 35}}>
              {props.id === 'Phone Number' ? (
                props.phoneInput()
              ) : (
                <TextInput 
                  mode="outlined"
                  label={props.id}
                  value={props.identifier}
                  onChangeText={text => props.setIdentifier(text)}
                  placeholder={props.id === 'UID' ? "u1234567" : ""}
                  outlineColor={props.customTheme.colors.primary}
                  textColor={props.customTheme.colors.primary}
                  contentStyle={{width: 300}}
                  keyboardType={props.id === 'phone number' ? "phone-pad" : "email-address"}
                  autoCapitalize={false}
                  maxLength={props.id === 'phone number' ? 10 : null}
                />
              )}
              
              <Button
                loading={props.loading}
                disabled={props.handleDisabled()}
                onPress={props.buttonClick}
                mode="elevated"
                buttonColor={props.customTheme.colors.tertiaryDark}
                labelStyle={{
                  fontFamily: 'NotoSans_Condensed-Regular',
                  fontSize: 16, 
                  fontWeight: '700',
                  color: props.customTheme.colors.secondary
                }}
              >
                <Text>Continue</Text>
              </Button>

            </View>
          </View>
          <Snackbar
            visible={props.visible.status}
            onDismiss={props.onDismissSnackBar}
            action={{
              label: 'Got it',
              labelStyle: {color: props.customTheme.colors.secondary}
            }}
            wrapperStyle={{backgroundColor: props.customTheme.colors.tertiaryDark}}
          >
            <Text style={{fontSize:14, color:props.customTheme.colors.secondary}}>
              {props.visible.message}
            </Text>
          </Snackbar>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export {Content};