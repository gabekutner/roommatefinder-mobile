import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useTheme } from "react-native-paper";



function SplashView() {
  const customTheme = useTheme()
  return (
    <SafeAreaView style={{flex:1, backgroundColor:customTheme.colors.tertiaryDark}}>
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <View style={{height:50, width:50, backgroundColor:customTheme.colors.tertiary}}/>
      </View>
      <View
        style={{
          flex: 1, 
          justifyContent: "center",
          alignItems: "center",
          justifyContent: "flex-end",
          marginBottom: 25,
        }}
      > 
        <Text style={{fontFamily:'NotoSans_Condensed-Regular', fontSize:14, color:customTheme.colors.secondary, fontWeight:'600'}}>
          1.0.0
        </Text>
      </View>
    </SafeAreaView>
  );  
};

export {SplashView};