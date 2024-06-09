import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';

import { 
  verticalScale,
  moderateScale
} from "react-native-size-matters";
import { launchImageLibrary } from "react-native-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import FastImage from "react-native-fast-image";

import Base from "./Components/Base";
import Label from "./Components/Label";
import CustomButton from "../../components/UI/Custom/CustomButton";
import CustomText from "../../components/UI/Custom/CustomText";
// import CustomNextButton from './CustomNextButton';

// import utils from '../../core/utils';
// import useGlobal from "../../core/global";
// import { colors as c } from "../../assets/config";
import { colors } from "../../constants/colors";
import useGlobal from "../../core/global";



function PhotoNumber({ number, colors }) {
  return (
    <View
      style={{
        position:'absolute',
        top:-10,
        left:-10,
        padding:verticalScale(6),
        backgroundColor:colors.accent,
        borderRadius:0,
        borderWidth:2,
        shadowOffset: { width: 7, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 1,  
      }}
    >
      <FontAwesomeIcon 
        icon={number}
        size={verticalScale(15)}
        color={colors.white}
      />
    </View>
  )
}

export default function PhotosScreen({ navigation }) {

  // const form = useGlobal(state => state.form)
  // const setForm = useGlobal(state => state.setForm)
  // const theme = useGlobal(state => state.theme)
  // const colors = c[theme]
  const uploadPhotos = useGlobal(state => state.uploadPhotos)

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
      } else if (key === 'photo_1') {
        setPhoto({ ...photo, photo_1:file })
      } else if (key === 'photo_2') {
        setPhoto({ ...photo, photo_2:file })
      } else if (key === 'photo_3') {
        setPhoto({ ...photo, photo_3:file })
      }
    })
  }
  
  const handleImage = () => {
    // upload thumbnail
    uploadPhotos(photo)
  }
  
  return (
    <Base>
      <View 
        style={{ 
          alignItems:'center',
          flexDirection:'column',
          gap:10,
          marginVertical:verticalScale(30)
        }}
      >
        <Label text="Add a few photos!" style={{ marginVertical:verticalScale(20) }} />
        <View 
          style={{
            flexDirection:'row',
            gap:10
          }}
        >
          <View style={styles.wrapper}>
            <TouchableOpacity 
              style={{ ...styles.upload, borderColor:colors.tint, borderStyle:photo.thumbnail ? 'solid' : 'dashed' }}
              onPress={() => launchLibrary('0')}
            >
              { photo.thumbnail 
                ?
                  <Image 
                    source={{uri:photo.thumbnail.uri}}
                    style={styles.imageStyle}
                  />
                :
                  <FontAwesomeIcon 
                    icon="image"
                    size={22}
                    color={colors.tint}
                  /> 
              }
            </TouchableOpacity>
            <PhotoNumber number="1" colors={colors} />
          </View>
          <View style={styles.wrapper}>
            <TouchableOpacity 
              style={{ 
                ...styles.upload, 
                borderColor:colors.tint, 
                borderStyle:photo.photo_1 ? 'solid' : 'dashed' 
              }}
              onPress={() => launchLibrary('photo_1')}
            >
              { photo.photo_1 
                ?
                  <Image 
                    source={{uri:photo.photo_1.uri}}
                    style={styles.imageStyle}
                  />
                :
                  <FontAwesomeIcon 
                    icon="image"
                    size={22}
                    color={colors.tint}
                  /> 
              }
            </TouchableOpacity>
            <PhotoNumber number="2" colors={colors} />
          </View>
        </View>
        <View 
          style={{
            flexDirection:'row',
            gap:10
          }}
        >
          <View style={styles.wrapper}>
            <TouchableOpacity 
              style={{ 
                ...styles.upload, 
                borderColor:colors.tint, 
                borderStyle:photo.photo_2 ? 'solid' : 'dashed' 
              }}
              onPress={() => launchLibrary('photo_2')}
            >
              { photo.photo_2 
                ?
                  <Image 
                    source={{uri:photo.photo_2.uri}}
                    style={styles.imageStyle}
                  />
                :
                  <FontAwesomeIcon 
                    icon="image"
                    size={22}
                    color={colors.tint}
                  /> 
              }
            </TouchableOpacity>
            <PhotoNumber number="3" colors={colors} />
          </View>
          <View style={styles.wrapper}>
            <TouchableOpacity 
              style={{ 
                ...styles.upload, 
                borderColor:colors.tint, 
                borderStyle:photo.photo_3 ? 'solid' : 'dashed' 
              }}
              onPress={() => launchLibrary('photo_3')}
            >
              { photo.photo_3
                ?
                  <Image 
                    source={{uri:photo.photo_3.uri}}
                    style={styles.imageStyle}
                  />
                :
                  <FontAwesomeIcon 
                    icon="image"
                    size={22}
                    color={colors.tint}
                  /> 
              }
            </TouchableOpacity>
            <PhotoNumber number="4" colors={colors} />
          </View>
        </View>
      </View>
      <CustomButton
        onClick={() => handleImage()}
      >
        <CustomText>
          Submit
        </CustomText>
      </CustomButton>
    </Base>
  )
}

const styles = StyleSheet.create({
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
    height:verticalScale(110),
    width:moderateScale(130),
    justifyContent:'center',
    alignItems:'center'
  },
  imageStyle: {
    height:'100%', 
    width:'100%', 
    borderRadius:10,
  }
})