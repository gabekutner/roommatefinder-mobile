import React from "react";
import { View, TouchableOpacity } from 'react-native';

import { launchImageLibrary } from "react-native-image-picker";
import { verticalScale } from "react-native-size-matters";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import Thumbnail from "../../../components/Thumbnail";
// import useGlobal from "../../../core/global";
import useStore from "../../../zustand/store";


export default function ProfileImage({ user, colors, bc, bg }) {
  const uploadThumbnail = useStore(state => state.uploadThumbnail)
  return (
    <TouchableOpacity
      style={{ marginBottom:verticalScale(14) }}
      onPress={() => {
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
          position:"absolute",
          bottom:0,
          right:0,
          backgroundColor:bg, //'#E8ECF4'
          width:40,
          height:40,
          borderRadius:20,
          alignItems:'center',
          justifyContent:'center',
          borderWidth:3,
          borderColor:bc
        }}
      >
        <FontAwesomeIcon 
          icon='pencil'
          size={verticalScale(12)}
          color={colors.tint}
        />
      </View>
    </TouchableOpacity>
  )
}