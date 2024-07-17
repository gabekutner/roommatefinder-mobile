import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import {
  View, 
  SafeAreaView,
  Text,
  StatusBar
} from "react-native";

import {verticalScale, moderateScale, scale} from "react-native-size-matters";

import { fab } from "@fortawesome/free-brands-svg-icons"
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(fab);

const theme = {
  bg: '#F2F1E2', // background
  black: '#132331', // 
  white: '#ffffff', // 
  accent: '#be0000', // accent

  light_bg: '#D0D1C2', 
  _tertiary_text_on_black: '#5A6773',
  _tertiary_text_on_white: '#B8BBBD',
}


function OnboardingMock(props) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor:theme.bg }}>
      <StatusBar />
      <View style={{ flex:.2, justifyContent:'center', paddingLeft:15 }}>
        <Text style={{ fontSize:verticalScale(20), fontFamily:'SuezOne-Regular', color:theme.black }}>RoommateFinder®</Text>
      </View>
      <View style={{ flex:1, backgroundColor: 'green' }}></View>
      <View style={{ paddingHorizontal:20, flex:.7, flexDirection:'row', flexWrap:'wrap' }}>
        <Text style={{ fontSize:verticalScale(35), fontFamily:'SuezOne-Regular', color:theme.black }}>
          WITH{' '}
          <View style={{ borderRadius:12, backgroundColor:theme.accent, }}>
            <Text 
              style={{ 
                fontSize:verticalScale(35), 
                fontFamily:'SuezOne-Regular', 
                color:theme.white, 
                marginHorizontal:5
              }}
            >
              PEOPLE
            </Text>
          </View>
          {' '}ALL OVER THE WORLD
        </Text>
        <Text
          style={{  
            fontSize:14,
            color: theme._tertiary_text_on_black,
            fontWeight:'600',
          }}
        >
          Talk to strangers about my candid remarks that I've never told anyone.</Text>
      </View>
      <View style={{ flex:.3, flexDirection:'row', alignItems:'center', paddingHorizontal:scale(20), gap:scale(7) }}>
        <View style={{ width:scale(55), height:scale(55), backgroundColor:theme.black, borderRadius:18, justifyContent:'center', alignItems:'center' }}>
          <FontAwesomeIcon icon={["fab", "apple"]} size={verticalScale(25)} color={theme.white} />
        </View>
        <View style={{ width:scale(250), height:scale(55), backgroundColor:theme.accent, borderRadius:18, flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:20 }}>
          <Text style={{ fontSize:16, fontWeight:'500', color:theme.white,  }}>Get Started</Text>
          <FontAwesomeIcon icon="arrow-up-right-from-square" size={verticalScale(18)} color={theme.white} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export {OnboardingMock};