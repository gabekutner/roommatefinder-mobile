import React from "react";
import {
  Dimensions,
  View,
  StyleSheet,
  ImageBackground
} from 'react-native';

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { verticalScale, moderateScale } from 'react-native-size-matters';

import CustomText from "../../components/UI/Custom/CustomText";
import CustomButton from "../../components/UI/Custom/CustomButton";

import useStore from "../../zustand/store";
import { colors } from "../../constants/colors";


export default function PromptScreen({ route, navigation }) {

  const {
    title, 
    subtitle, 
    text, 
    screen,
    screen2,
    icon
  } = route.params

  const user = useStore(state => state.user)
  const form = useStore(state => state.form)
  const photos = useStore(state => state.photos)
  const matchingForm = useStore(state => state.matchingForm)

  const createProfile = useStore(state => state.createProfile)
  const uploadPhotos = useStore(state => state.uploadPhotos)
  const staticUploadThumbnail = useStore(state => state.staticUploadThumbnail)
  const submitMatchingForm = useStore(state => state.submitMatchingForm)

  const buttonClick = async() => {
    if (screen != '' && screen != 'update') {
      navigation.navigate(screen)
    } else if (screen === 'update') {
      submitMatchingForm(matchingForm, user)
      navigation.navigate('profile')
    } else {
      // submit all forms here 
      createProfile(form, user)
      uploadPhotos(photos, user)
      staticUploadThumbnail(photos, user)
      submitMatchingForm(matchingForm, user)
    }
  }

  return (
    <ImageBackground
      source={require('../../assets/images/image_part_003.png')}
      style={{ flex:1, backgroundColor:colors.primary }}
      imageStyle={{ opacity:0.5 }}
    >
      <View style={styles.container}> 
        <View style={styles.card}>

          <View style={styles.titleWrapper}>
            <CustomText style={styles.title}>
              {title}
            </CustomText>
            <CustomText style={styles.subtitle}>
              {subtitle}
            </CustomText>
          </View>

          { screen2 
            ? <CustomButton onClick={() => navigation.navigate(screen2)} style={{ borderWidth:0 }}>
                <CustomText 
                  style={{
                    fontSize:verticalScale(12),
                    fontWeight:'bold',
                    color:colors.tint,
                    textDecorationLine:'underline'
                  }}
                >
                  No thanks, I'll do it later
                </CustomText>
              </CustomButton>
            : null 
          }

          <CustomButton 
            onClick={() => buttonClick()} 
            style={styles.button}
          >
            <CustomText style={styles.text}>
              {text}
            </CustomText>
            { icon 
              ? <FontAwesomeIcon icon={icon} size={verticalScale(20)} color={colors.white} />
              : null
            }
          </CustomButton>

        </View>
      </View> 
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    width:Dimensions.get('window').width,
    alignItems:'center',
    marginVertical:verticalScale(125)
  },
  card: {
    width:'85%',
    backgroundColor:colors.primary,
    borderRadius:12,
    borderWidth:2,
    borderColor:colors.tint,
    alignItems:'center',
    paddingHorizontal:moderateScale(15),
    paddingBottom:verticalScale(20)
  },

  titleWrapper: { marginTop:verticalScale(20), marginBottom:verticalScale(50) },
  title: {
    textAlign:'center',
    fontSize:verticalScale(17),
    marginBottom:verticalScale(15),
    fontWeight:'600',
  },
  subtitle: {
    textAlign:'center',
    fontSize:verticalScale(13),
    marginHorizontal:moderateScale(35)
  },
  button: {
    backgroundColor:colors.accent,
    paddingVertical:verticalScale(15),
    paddingHorizontal:moderateScale(30),
    flexDirection:'row',
    gap:moderateScale(20),
    shadowColor:'#222',
    shadowOffset: { width:5, height:3 },
    shadowOpacity:1,
    shadowRadius:1, 
    // borderRadius:0,
    borderWidth:2
  },
  text: {
    fontSize:verticalScale(16),
    fontWeight:'600',
    color:colors.white,
  }
})