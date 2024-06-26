import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import { launchImageLibrary } from "react-native-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import FastImage from 'react-native-fast-image';

import CustomButton from "../components/UI/Custom/CustomButton";
import CustomText from "../components/UI/Custom/CustomText";
import Snackbar from "../components/UI/SnackBar";

import utils from "../core/utils";
import useGlobal from "../core/global";
import { colors as c } from "../assets/config";


function PhotoNumber({ number, colors }) {
  return (
    <View
      style={{
        position:'absolute',
        top:-10,
        left:-10,
        padding:10,
        backgroundColor:colors.secondary,
        borderRadius:60
      }}
    >
      <FontAwesomeIcon 
        icon={number}
        size={22}
        color={colors.accent}
      />
    </View>
  )
}

export default function PhotoUpload({}) {

  const uploadImage = useGlobal(state => state.uploadImage)
  const user = useGlobal(state => state.user)
  const theme = useGlobal(state => state.theme)
  const colors = c[theme]
  
  const keys = user.photos.map(photo => photo.key)
  
  const [form, setForm] = useState({
    picture_one: keys.includes(1) ? user.photos.find(photo => photo.key === 1).image : null,
    picture_two: keys.includes(2) ? user.photos.find(photo => photo.key === 2).image : null,
    picture_three: keys.includes(3) ? user.photos.find(photo => photo.key === 3).image : null,
    picture_four: keys.includes(4) ? user.photos.find(photo => photo.key === 4).image : null,

    picture_one_uri: null,
    picture_two_uri: null,
    picture_three_uri: null,
    picture_four_uir: null,
  })

  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  return (
    <SafeAreaView 
      style={{ 
        flex:1, 
        backgroundColor:colors.primary 
      }}
    >
      <View style={{ marginVertical:30 }}>
        
        <View style={styles.wrapper}>
          <View>
            <TouchableOpacity 
              style={[
                styles.upload, 
                { 
                  borderColor:colors.tertiary 
                }
              ]}
              onPress={() => {
                launchImageLibrary({ includeBase64:true, }, (response) => {
                  if (response.didCancel) return
                  const file = response.assets[0]
                  setForm({ ...form, picture_one:file })
                })
              }}
            >
              { form.picture_one 
                ? <FastImage
                    source={utils.thumbnail(form.picture_one)}
                    style={styles.imageStyle}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                : <FontAwesomeIcon 
                    icon="image"
                    size={22}
                    color={colors.tertiary}
                  /> 
              }
            </TouchableOpacity>
            <PhotoNumber number="1" colors={colors} />
          </View>
          <View>
          <TouchableOpacity 
              style={[
                styles.upload, 
                { 
                  borderColor:colors.tertiary 
                }
              ]}
              onPress={() => {
                launchImageLibrary({ includeBase64:true, }, (response) => {
                  if (response.didCancel) return
                  const file = response.assets[0]
                  setForm({ ...form, picture_two:file })
                })
              }}
            >
              { form.picture_two 
                ? <FastImage
                    source={utils.thumbnail(form.picture_two)}
                    style={styles.imageStyle}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                : <FontAwesomeIcon 
                    icon="image"
                    size={22}
                    color={colors.tertiary}
                  /> 
              }
            </TouchableOpacity>
            <PhotoNumber number="2" colors={colors} />
          </View>
        </View>

        <View style={styles.wrapper}>
          <View>
            <TouchableOpacity 
              style={[
                styles.upload, 
                { 
                  borderColor:colors.tertiary 
                }
              ]}
              onPress={() => {
                launchImageLibrary({ includeBase64:true, }, (response) => {
                  if (response.didCancel) return
                  const file = response.assets[0]
                  setForm({ ...form, picture_three:file })
                })
              }}
            >
              { form.picture_three 
                ? <FastImage
                    source={utils.thumbnail(form.picture_three)}
                    style={styles.imageStyle}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                : <FontAwesomeIcon 
                    icon="image"
                    size={22}
                    color={colors.tertiary}
                  /> 
              }
            </TouchableOpacity>
            <PhotoNumber number="3" colors={colors} />
          </View>
          <View>
            <TouchableOpacity 
              style={[
                styles.upload, 
                { 
                  borderColor:colors.tertiary 
                }
              ]}
              onPress={() => {
                launchImageLibrary({ includeBase64:true, }, (response) => {
                  if (response.didCancel) return
                  const file = response.assets[0]
                  setForm({ ...form, picture_four:file })
                })
              }}
            >
              { form.picture_four 
                ? <FastImage
                    source={utils.thumbnail(form.picture_four)}
                    style={styles.imageStyle}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                : <FontAwesomeIcon 
                    icon="image"
                    size={22}
                    color={colors.tertiary}
                  /> 
              }
            </TouchableOpacity>
            <PhotoNumber number="4" colors={colors} />
          </View>
        </View>
      </View>
      
      <View 
        style={{ 
          flex:1, 
          alignItems:'center', 
          justifyContent:'center' 
        }}
      >  
        <CustomButton 
          onClick={() => {
            // handle button press
            for (var prop in form) {
              if (form[prop] !== null) {
                const match = prop.match(/_(\w+)$/);
                const keys = {one:"1", two:"2", three:"3", four:"4"}
                let key = keys[match[1]]
                uploadImage(form[prop], key, user)
              }
            }
            // show snackbar
            setShowSuccess(true)
          }}
          style={{
            width:200,
            marginBottom:10,
            backgroundColor:colors.accent
          }}
        >
          <CustomText 
            style={{ 
              fontSize:20, 
              fontWeight:'600', 
              color:colors.constWhite 
            }}
          >
            All Done
          </CustomText>
        </CustomButton>
      </View>

      { showSuccess
        ? 
          <Snackbar
            message="Successfully uploaded photos"
            actionText="Dismiss"
            onActionPress={() => {
              setShowSuccess(false)
            }}
            duration={5000} // customize duration
            position="top" // change the position to 'top'/'bottom'
            backgroundColor={colors.accent} // customize background color
            textColor={colors.constWhite} // change text color
            actionTextColor={colors.constWhite} // customize action text color
            containerStyle={{ marginHorizontal:12 }} // apply additional styling
            messageStyle={{ fontWeight:'bold' }} // adjust message text styling
            actionTextStyle={{ }} // customize action text styling
          />
        : null
      }
      { showError 
        ?
          <Snackbar
            message="Error uploading photos"
            actionText="Dismiss"
            onActionPress={() => {
              setShowError(false)
            }}
            duration={5000} // customize duration
            position="top" // change the position to 'top'/'bottom'
            backgroundColor={colors.accent} // customize background color
            textColor={colors.constWhite} // change text color
            actionTextColor={colors.constWhite} // customize action text color
            containerStyle={{ marginHorizontal:12 }} // apply additional styling
            messageStyle={{ fontWeight:'bold' }} // adjust message text styling
            actionTextStyle={{ }} // customize action text styling
          /> 
        : null
      }
    </SafeAreaView>
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
    borderWidth:.5,
    borderStyle:'dashed',
    borderRadius:10,
    height:160,
    width:160,
    justifyContent:'center',
    alignItems:'center'
  },
  imageStyle: {
    height:'100%', 
    width:'100%', 
    borderRadius:10
  }
})