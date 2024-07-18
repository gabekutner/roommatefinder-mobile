import React from "react";
import {SafeAreaView, Text, View} from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";


const theme = {
  bg: '#F2F1E2', // background
  black: '#132331', // 
  white: '#ffffff', // 
  accent: '#be0000', // accent

  light_bg: '#D0D1C2', 
  _tertiary_text_on_black: '#5A6773',
  _tertiary_text_on_white: '#B8BBBD',
}

function MessagingMock(props) {
  return (
    <View style={{flex: 1, backgroundColor:theme.bg }}>
      <View 
        style={{
          flex:.4, 
          backgroundColor:theme.white, 
          flexDirection:'row', 
          borderBottomLeftRadius:35, 
          borderBottomRightRadius:35,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <View style={{ flex:.5, justifyContent:'center', alignItems:'center', marginTop:20 }}>
          <FontAwesomeIcon icon="arrow-left" size={22} color={theme.black} />
        </View>
        <View style={{ flex:1, alignItems:'center', flexDirection:'row', gap:10, marginTop:20}}>
          <View style={{ height:50, width:50, backgroundColor:theme.black, borderRadius:60 }}></View>
          <View>
            <Text style={{ fontSize:20, fontFamily:'SuezOne-Regular', color:theme.black }}>Gabe Kutner</Text>
            <Text style={{ fontSize:14, color:theme.accent }}>Online</Text>
          </View>
        </View>
        <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}>
          <FontAwesomeIcon icon="ellipsis-vertical" size={30} color={theme.black} />
        </View>
      </View>
      <View style={{ flex:1 }}></View>
      <View style={{ flex:1 }}></View>
    </View>
  );
};

export {MessagingMock};