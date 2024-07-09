import React from "react";
import { StyleSheet, View } from "react-native";

import PhotosScreen from "../../Onboarding/Photos";

import { colors } from "../../../constants/colors";
import { verticalScale } from "react-native-size-matters";


export default function EditPhotoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <PhotosScreen />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:colors.primary
  },
  wrapper: {
    backgroundColor:colors.secondary,
    borderWidth:2,
    alignItems:'center',
    borderWidth:2,
    borderRadius:12,
    padding:verticalScale(12),
    marginBottom:verticalScale(100)

  }
})