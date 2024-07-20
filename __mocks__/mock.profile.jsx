/**
 * @description new card desigm
 */

import React from "react";
import {View, Text, ImageBackground, SafeAreaView} from "react-native";
import {useTheme} from "react-native-paper";

function MockProfile() {
  const theme = useTheme();

  return (
    // title - Your Profile... keep edit profile button (basically stays the same)
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
      <View
        style={{
          flex: 0.9,
          backgroundColor: theme.colors.primary,
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,

          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      ></View>

      <View style={{flex: 1}}></View>
    </SafeAreaView>
  );
}

export {MockProfile};
