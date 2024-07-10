import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { moderateScale, verticalScale } from "react-native-size-matters";

import PhotosScreen from "../../Onboarding/Photos";
import CustomButton from "../../../components/UI/Custom/CustomButton";
import CustomText from "../../../components/UI/Custom/CustomText";

import useStore from "../../../zustand/store";
import { colors } from "../../../constants/colors";


export default function EditPhotoScreen({ navigation }) {

  const user = useStore(state => state.user)
  const photos = useStore(state => state.photos)

  const staticUploadThumbnail = useStore(state => state.staticUploadThumbnail)
  const updatePhoto = useStore(state => state.updatePhoto)
  const deletePhoto = useStore(state => state.deletePhoto)
  const uploadOnePhoto = useStore(state => state.uploadOnePhoto)
  
  const submit = () => {
    for (const [key, value] of Object.entries(photos)) {
      // if value is not null, then edit / create photo
      if (value != null) {
        // check if photo already exits
        if (key === 'thumbnail') {
          if (user.thumbnail) {
            staticUploadThumbnail(photos, user)
          }
        } else if (key === 'photo_1') {
          if (user.photo_1) {
            // update if exists
            updatePhoto(photos.photo_1, user.photo_1.id, user)
          } else {
            // create if doesn't exist
            uploadOnePhoto(photos.photo_1, user)
          }
        } else if (key === 'photo_2') {
          if (user.photo_2) {
            // update if exists
            updatePhoto(photos.photo_2, user.photo_2.id, user)
          } else {
            // create if doesn't exist
            uploadOnePhoto(photos.photo_2, user)
          }
        } else if (key === 'photo_3') {
          if (user.photo_3) {
            // update if exists
            updatePhoto(photos.photo_3, user.photo_3.id, user)
          } else {
            // create if doesn't exist
            uploadOnePhoto(photos.photo_3, user)
          }
        }
      } else {
        // photo is null, check is user.[photo] exists
        // if exists then delete user.[photo]
        // NOTE: handle error, when photo with id doesn't exist
        // this happens if a user tries to delete a photo they just uploaded
        if (key === 'photo_1') {
          if (user.photos[0]) {
            deletePhoto(user.photos[0].id, user)
          }
        } else if (key === 'photo_2') {
          if (user.photos[1]) {
            deletePhoto(user.photos[1].id, user)
          }
        } else if (key === 'photo_3') {
          if (user.photos[2]) {
            deletePhoto(user.photos[2].id, user)
          }
        }
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