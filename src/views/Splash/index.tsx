import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import appJSON from "../../../app.json";


const SplashView: React.FC = () => {
  /**
   * SplashView Component
   * @props
   *    - none
   */
  const theme = useTheme();
  const fill = {flex: 1};

  return (
    <SafeAreaView style={[fill, { backgroundColor:theme.colors.onTertiary }]}>
      {/* Logo container */}
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <View style={{height:50, width:50, backgroundColor:theme.colors.tertiary}}/>
      </View>
      {/* Version information container */}
      <View style={[fill, styles.version]}> 
        <Text style={[styles.text, {color:theme.colors.secondary}]}>
          {appJSON.version}
        </Text>
      </View>
    </SafeAreaView>
  );  
};

const styles = StyleSheet.create({
  version: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 25,
  },
  text: {
    fontFamily:'NotoSans_Condensed-Regular', 
    fontSize:16, 
    fontWeight:'500'
  }
});

export {SplashView};