import React from "react";
import { StyleSheet, View } from 'react-native';

import { launchImageLibrary } from "react-native-image-picker";
import { verticalScale } from "react-native-size-matters";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import Thumbnail from "../../../components/Thumbnail";
import CustomButton from "../../../components/UI/Custom/CustomButton";

import useStore from "../../../zustand/store";


export default function ProfileImage({ user, colors, bc, bg }) {
  const uploadThumbnail = useStore(state => state.uploadThumbnail)
  return (
    <CustomButton
      shadow
      style={styles.container}
      onClick={() => {
        launchImageLibrary({ includeBase64:true, }, (response) => {
          if (response.didCancel) return
          const file = response.assets[0]
          uploadThumbnail(file)
        })
      }}
    >
      <Thumbnail
				url={user.thumbnail}
				size={verticalScale(123)}
        borderColor={colors.tint}
        style={{ borderWidth:2 }}
			/>
      <View
        style={{
          ...styles.wrapper,
          backgroundColor:bg, //'#E8ECF4'
          borderColor:bc
        }}
      >
        <FontAwesomeIcon 
          icon='pencil'
          size={verticalScale(12)}
          color={colors.tint}
        />
      </View>
    </CustomButton>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom:verticalScale(14),
    // override
    borderWidth:0,
    paddingVertical:0,
  },
  wrapper: {
    position:"absolute",
    bottom:0,
    right:0,
    width:40,
    height:40,
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:2,
  }
})