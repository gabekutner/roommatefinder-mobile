import React, { useState } from "react";
import {
 View,
 StyleSheet,
 Image
} from 'react-native';

import { verticalScale, scale } from "react-native-size-matters";
import { launchImageLibrary } from "react-native-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import Card from "./Components/Card";
import Label from "./Components/Label";
import CustomButton from "../../components/UI/Custom/CustomButton";
import CustomText from "../../components/UI/Custom/CustomText";

import { colors } from "../../constants/colors";
import useGlobal from "../../core/global";


export default function PhotosScreen({ navigation }) {

 const photos = useGlobal(state => state.photos)
 const setPhotos = useGlobal(state => state.setPhotos)

 const [photo, setPhoto] = useState({
   thumbnail: null,
   photo_1: null,
   photo_2: null,
   photo_3: null,
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

  return (
    <Card
      navigation={navigation} 
      screen={"photos"} 
      style={{ marginTop:verticalScale(30) }}
    >
        <Label text="Add a few photos!" style={{ marginTop:verticalScale(20) }} />
        <CustomText
          style={{
            fontSize:verticalScale(12),
            fontWeight:'500',
            marginTop:verticalScale(5),
            marginBottom:verticalScale(20),
            alignSelf:'center'
          }}
        >
          (P.S. Add at least 2 photos)
        </CustomText>

        <View style={styles.rowWrapper}>
          <View style={styles.wrapper}>
            <CustomButton
              onClick={() => launchLibrary('0')}
              style={{ 
                ...styles.upload, 
                borderStyle:photo.thumbnail ? 'solid' : 'dashed'
              }}
            >
              { photo.thumbnail
                ?
                  <Image
                    source={{uri:photo.thumbnail.uri}}
                    style={styles.imageStyle}
                    resizeMode="cover"
                  />
                :
                  <FontAwesomeIcon
                    icon="image"
                    size={22}
                    color={colors.tint}
                  />
              }
            </CustomButton>
            {/* <PhotoNumber number="1" colors={colors} /> */}
          </View>

          <View style={styles.wrapper}>
            <CustomButton
              onClick={() => launchLibrary('photo_1')}
              style={{
                ...styles.upload,
                borderStyle:photo.photo_1 ? 'solid' : 'dashed'
              }}
            >
              { photo.photo_1
                ?
                  <Image
                    source={{uri:photo.photo_1.uri}}
                    style={styles.imageStyle}
                    resizeMode="cover"
                  />
                :
                  <FontAwesomeIcon
                    icon="image"
                    size={22}
                    color={colors.tint}
                  />
              }
            </CustomButton>
          </View>
        </View>

        <View style={styles.rowWrapper}>
          <View style={styles.wrapper}>
            <CustomButton
              onClick={() => launchLibrary('photo_2')}
              style={{
                ...styles.upload,
                borderStyle:photo.photo_2 ? 'solid' : 'dashed'
              }}
            >
              { photo.photo_2
                ?
                  <Image
                    source={{uri:photo.photo_2.uri}}
                    style={styles.imageStyle}
                    resizeMode="cover"
                  />
                :
                  <FontAwesomeIcon
                    icon="image"
                    size={22}
                    color={colors.tint}
                  />
              }
            </CustomButton>
          </View>

          <View style={styles.wrapper}>
            <CustomButton
              onClick={() => launchLibrary('photo_3')}
              style={{
                ...styles.upload,
                borderStyle:photo.photo_3 ? 'solid' : 'dashed'
              }}
            >
              { photo.photo_3
                ?
                  <Image
                    source={{uri:photo.photo_3.uri}}
                    style={styles.imageStyle}
                    resizeMode="cover"
                  />
                :
                  <FontAwesomeIcon
                    icon="image"
                    size={22}
                    color={colors.tint}
                  />
              }
            </CustomButton>
          </View>
        </View>
      </Card>
  )
}

const styles = StyleSheet.create({
  rowWrapper: {
    flexDirection:'row',
    gap:10
  },
  wrapper: {
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
    gap:15,
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
  }
})