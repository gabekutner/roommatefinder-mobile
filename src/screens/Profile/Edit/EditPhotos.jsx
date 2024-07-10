import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { moderateScale, verticalScale } from "react-native-size-matters";

import PhotosScreen from "../../Onboarding/Photos";
import CustomButton from "../../../components/UI/Custom/CustomButton";
import CustomText from "../../../components/UI/Custom/CustomText";

import useStore from "../../../zustand/store";
import { colors } from "../../../constants/colors";
import utils from "../../../core/utils";


export default function EditPhotoScreen({ navigation }) {

  const user = useStore(state => state.user)
  const photos = useStore(state => state.photos)

  const staticUploadThumbnail = useStore(state => state.staticUploadThumbnail)
  const updatePhoto = useStore(state => state.updatePhoto)
  
  const submit = () => {
    // console.log('submit')
    // console.log(photos)
    for (const [key, value] of Object.entries(photos)) {
      if (value != null) {
        console.log(key)
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <PhotosScreen del={true} />
        {/* submit button */}
        <CustomButton shadow onClick={submit} style={styles.button}>
          <CustomText fontSize="medium" style={{ fontWeight:"500", color:colors.white }}>
            Save
          </CustomText>
        </CustomButton>
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
  },
  button: {
    backgroundColor:colors.accent,
    paddingVertical:verticalScale(15),
    paddingHorizontal:moderateScale(30),
    borderWidth:2,
    marginTop:verticalScale(15)
  }
})