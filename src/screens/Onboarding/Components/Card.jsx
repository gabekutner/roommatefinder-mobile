import React, { useRef, useState} from "react";
import { 
  View, 
  Animated,
} from "react-native";

import { verticalScale, moderateScale } from 'react-native-size-matters';

import Background from "./Base/Background";
import Header from "./Base/Header";
import Carousel from "./Base/Carousel";
import CustomText from "../../../components/UI/Custom/CustomText";

import { colors } from "../../../constants/colors";


export default function BaseOnboardingCard({ navigation, route }) {

  const { data, next, back  } = route.params

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
      navigation.navigate(next)
    }
  }
  const scrollBack = () => {
    if (currentIndex < data.length && currentIndex != 0) {
      dataRef.current.scrollToIndex({ index: currentIndex - 1 })
    } else {
      // here, 
      if (back) {
        navigation.navigate(back)
      } else {
        console.log('first item')
      }
    }
  }

  return (
    <Background>
      <Header 
        scrollBack={scrollBack} 
        scrollNext={scrollNext}
        data={data}
        scrollX={scrollX}
      />
      <Carousel 
        navigation={navigation}
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
    </Background>      
  )
}