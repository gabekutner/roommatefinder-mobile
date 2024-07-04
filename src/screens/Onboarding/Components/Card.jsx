import React, { useRef, useState} from "react";
import { 
  View, 
  Animated,
  ImageBackground
} from "react-native";

import { verticalScale, moderateScale } from 'react-native-size-matters';

import Header from "./Base/Header";
import Carousel from "./Base/Carousel";
import CustomText from "../../../components/UI/Custom/CustomText";
import { colors } from "../../../constants/colors";


export default function BaseOnboardingCard({ navigation }) {

  const scrollX = useRef(new Animated.Value(0)).current
  const [currentIndex, setCurrentIndex] = useState(0)
  const dataRef = useRef(null)

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index)
  }).current

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

  const scrollNext = () => {
    if (currentIndex < data.length - 1) {
      dataRef.current.scrollToIndex({ index: currentIndex + 1 })
    } else {
      navigation.navigate('matching-prompt')
    }
  }
  const scrollBack = () => {
    if (currentIndex < data.length && currentIndex != 0) {
      dataRef.current.scrollToIndex({ index: currentIndex - 1 })
    } else {
      console.log('first item')
    }
  }
  
  const data = [
    {'id': 1, 'title': 'age', 'label': 'How old are you?'},
    {'id': 2, 'title': 'sex', 'label': 'I am a ...'},
    {'id': 3, 'title': 'hometown', 'label': 'Where are you from?'},
    {'id': 4, 'title': 'graduation_year', 'label': 'When will you graduate?'},
    {'id': 5, 'title': 'interests', 'label': "What're you into?"},
    {'id': 6, 'title': 'widgets', 'label': 'Customize your profile with prompts, quotes, and your social handles!'},
    {'id': 7, 'title': 'photos', 'label': 'Add a few photos!'},
    {'id': 8, 'title': 'dorm', 'label': 'Where will you be living next year?'},
  ]

  return (
    <ImageBackground 
      source={require('../../../assets/images/image_part_002.png')}
      style={{ flex:1, backgroundColor:colors.primary }}
      imageStyle={{ opacity:0.5 }}
    >
      <Header 
        scrollNext={scrollNext} 
        scrollBack={scrollBack} 
        data={data} 
        scrollX={scrollX} 
      />
      <Carousel 
        data={data}
        scrollX={scrollX}
        viewableItemsChanged={viewableItemsChanged}
        viewConfig={viewConfig}
        dataRef={dataRef}
      />
      <View 
        style={{ 
          position:'absolute',
          left:0,
          right:0,
          bottom:verticalScale(35),
          alignItems:'center',
          backgroundColor:colors.primary,
          marginHorizontal:moderateScale(25),
          paddingVertical:verticalScale(12),
          paddingHorizontal:6,
          borderRadius:12,
          borderWidth:2,
        }}
      >
        <CustomText 
          style={{ 
            fontSize:verticalScale(11),
            fontWeight:'500',
            textAlign:'center',
            color:colors.tertiary
          }}
        >
          No information about your account is shared with the University of Utah.
        </CustomText>
      </View>
    </ImageBackground>      
  )
}