import React, { useState } from "react";
import {
 View,
 StyleSheet,
 Image
} from 'react-native';

import { launchImageLibrary } from "react-native-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { scale, verticalScale } from "react-native-size-matters";

import CustomButton from "../../components/UI/Custom/CustomButton";
import CustomText from "../../components/UI/Custom/CustomText";

import useStore from "../../zustand/store";
import { colors } from "../../constants/colors";
import utils from "../../core/utils";


export default function PhotosScreen({ del }) {

  const user = useStore(state => state.user)
  const photos = useStore(state => state.photos)
  const setPhotos = useStore(state => state.setPhotos)

  const [photo, setPhoto] = useState({
    thumbnail: user.thumbnail ? utils.thumbnail(user.thumbnail) : null,
    photo_1: user.photos[0] ? utils.thumbnail(user.photos[0].image) : null,
    photo_2: user.photos[1] ? utils.thumbnail(user.photos[1].image) : null,
    photo_3: user.photos[2] ? utils.thumbnail(user.photos[2].image) : null, 
  })

  const launchLibrary = (key) => {
    launchImageLibrary({ includeBase64:true, }, (response) => {
      if (response.didCancel) return
      const file = response.assets[0]
      if (key === '0') {
        setPhoto({ ...photo, thumbnail:file })
        setPhotos({ ...photos, thumbnail:file })
      } else if (key === 'photo_1') {
        setPhoto({ ...photo, photo_1:file })
        setPhotos({ ...photos, photo_1:file })
      } else if (key === 'photo_2') {
        setPhoto({ ...photo, photo_2:file })
        setPhotos({ ...photos, photo_2:file })
      } else if (key === 'photo_3') {
        setPhoto({ ...photo, photo_3:file })
        setPhotos({ ...photos, photo_3:file })
      }
    })
  }

  const _deletePhoto = (id) => {
    // to delete a photo on submit
    // set photos.[photo] to null
    // in EditPhotoScreen, check if user.[photo] exists
    // if exists, delete photo on submit
    if (id === 'photo_1') {
      if (photo.photo_1 != null) {
        setPhotos({ ...photos, photo_1:null })
        // displayed photos
        setPhoto({ ...photo, photo_1:null })
      }  
    } else if (id === 'photo_2') {
      if (photo.photo_2 != null) {
        setPhotos({ ...photos, photo_2:null })
        // displayed photos
        setPhoto({ ...photo, photo_2:null })
      } 
    } else if (id === 'photo_3') {
      if (photo.photo_3 != null) {
        setPhotos({ ...photos, photo_3:null })
        // displayed photos
        setPhoto({ ...photo, photo_3:null })
      } 
    }
  }

  return (
    <>
      <CustomText fontSize="medium" style={{ marginVertical:verticalScale(10), fontWeight:'500' }}>Add at least 2 photos.</CustomText>
      <View style={styles.rowWrapper}>
        <View style={styles.wrapper}>
          <CustomButton onClick={() => launchLibrary('0')} style={{ ...styles.upload, borderStyle:photo.thumbnail ? 'solid' : 'dashed' }}>
            { photo.thumbnail 
              ? <Image source={photo.thumbnail} style={styles.imageStyle} resizeMode="cover" />
              : <FontAwesomeIcon icon="image" size={verticalScale(18)} color={colors.tint} />
            }
          </CustomButton>
        </View>

        <View style={styles.wrapper}>
          <CustomButton onClick={() => launchLibrary('photo_1')} style={{ ...styles.upload, borderStyle:photo.photo_1 ? 'solid' : 'dashed' }}>
            { photo.photo_1
              ? <Image source={photo.photo_1} style={styles.imageStyle} resizeMode="cover" />
              : <FontAwesomeIcon icon="image" size={verticalScale(18)} color={colors.tint} />
            }
          </CustomButton>
          {del 
            ? <CustomButton shadow onClick={() => _deletePhoto('photo_1')} style={styles.deleteContainer}>
                <FontAwesomeIcon icon="xmark" size={verticalScale(20)} color={colors.accent} />
              </CustomButton>
            : null
          }
        </View>
      </View>

      <View style={styles.rowWrapper}>
        <View style={styles.wrapper}>
          <CustomButton onClick={() => launchLibrary('photo_2')} style={{ ...styles.upload, borderStyle:photo.photo_2 ? 'solid' : 'dashed' }}>
            { photo.photo_2
              ? <Image source={photo.photo_2} style={styles.imageStyle} resizeMode="cover" />
              : <FontAwesomeIcon icon="image" size={verticalScale(18)} color={colors.tint} />
            }
          </CustomButton>
          {del 
            ? <CustomButton shadow onClick={() => _deletePhoto('photo_2')} style={styles.deleteContainer}>
                <FontAwesomeIcon icon="xmark" size={verticalScale(20)} color={colors.accent} />
              </CustomButton>
            : null
          }
        </View>

        <View style={styles.wrapper}>
          <CustomButton onClick={() => launchLibrary('photo_3')} style={{ ...styles.upload, borderStyle:photo.photo_3 ? 'solid' : 'dashed' }}>
            { photo.photo_3
              ? <Image source={photo.photo_3} style={styles.imageStyle} resizeMode="cover" />
              : <FontAwesomeIcon icon="image" size={verticalScale(18)} color={colors.tint} />
            }
          </CustomButton>
          {del 
            ? <CustomButton shadow onClick={() => _deletePhoto('photo_3')} style={styles.deleteContainer}>
                <FontAwesomeIcon icon="xmark" size={verticalScale(20)} color={colors.accent} />
              </CustomButton>
            : null
          }
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  rowWrapper: { flexDirection:'row' },
  wrapper: {
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
    padding:10,
  }, 
  upload: {
    borderWidth:2,
    borderRadius:10,
    height:scale(130),
    width:scale(130),
    justifyContent:'center',
    alignItems:'center',
    borderColor:colors.tint, 
  },
  imageStyle: {
    height:scale(130),
    width:scale(130),
    borderRadius:10,
    borderWidth:2
  },
  deleteContainer: {
    backgroundColor:colors.primary, 
    position:'absolute',
    top:0,
    left:0,
    borderRadius:12,
    padding:verticalScale(6),
    paddingVertical:verticalScale(6),
    borderWidth:2
  }
})