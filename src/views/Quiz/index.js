import React from "react";
import {SafeAreaView, View, Text, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, ScrollView} from "react-native"
import { useTheme, IconButton } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";


function QuizView({ navigation }) {
  const customTheme = useTheme()
  return (
    <SafeAreaView style={{flex:1 , backgroundColor: customTheme.colors.background}}>
      <View style={{ justifyContent:'center', alignItems:'flex-start', marginLeft:15, marginTop:5 }}>
        <IconButton 
          onPress={() => navigation.goBack()}
          icon={() => <FontAwesomeIcon icon="arrow-left" color={customTheme.colors.primary} />}
          size={22}
          mode="contained"
        />
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // Adjust the value as needed
      >
        <TouchableWithoutFeedback style={{flex:1}} onPress={() => Keyboard.dismiss()}> 
          <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
            <View style={{gap: 10, justifyContent:'center', alignItems: 'center', paddingHorizontal:25}}>
              <View style={{ width:200, alignItems:'center', justifyContent:'center', marginBottom:25 }}>

                <Text style={{fontSize:18, fontFamily:'NotoSans_Condensed-Regular', fontWeight:'700', color:customTheme.colors.primary, textAlign:'center'}}>
                  Roommate Matching Quiz
                </Text>

              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export {QuizView}