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
  const [initialState, setInitialState] = useState({
    thumbnail: user.thumbnail ? utils.thumbnail(user.thumbnail) : null,
    photo_1: user.photos[0] ? utils.thumbnail(user.photos[0].image) : null,
    photo_2: user.photos[1] ? utils.thumbnail(user.photos[1].image) : null,
    photo_3: user.photos[2] ? utils.thumbnail(user.photos[2].image) : null, 
  })
  
  const submit = () => {
    for (const [index, [key, value]] of Object.entries(Object.entries(photos))) {
      if (value !== null) {
        if (user.photos[index]) {
          if (index === '0') {
            // update thumbnail
            console.log(user.id, ' update thumbnail')
          } else {
            // update photo
            console.log(user.photos[index].id, ' update photo')
          }
        } else {
          console.log(user.id, ' create photo')
        }
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <PhotosScreen />
        {/* submit button */}
        <CustomButton shadow onClick={submit} style={styles.button}>
          <CustomText fontSize="medium" style={{ fontWeight:"500", color:colors.white }}>
            Submit
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