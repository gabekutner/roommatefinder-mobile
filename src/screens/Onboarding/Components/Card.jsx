import React, { useRef, useState} from "react";
import { 
  View, 
  Animated,
  ImageBackground,
  StyleSheet
} from "react-native";

import { verticalScale, moderateScale } from 'react-native-size-matters';

import Paginator from "./Base/Paginator";
import Header from "./Base/Header";
import Carousel from "./Base/Carousel";
import CustomText from "../../../components/UI/Custom/CustomText";
import { colors } from "../../../constants/colors";


export default function BaseOnboardingCard({ navigation, route }) {

  const {data} = route.params

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

  return (
    <ImageBackground 
      source={require('../../../assets/images/image_part_002.png')}
      style={{ flex:1, backgroundColor:colors.primary }}
      imageStyle={{ opacity:0.5 }}
    >
      <Header 
        scrollBack={scrollBack} 
        scrollNext={scrollNext}
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

const styles = StyleSheet.create({
  wrapper: {
    alignItems:"center",
    flexDirection:'row',
    backgroundColor:colors.primary,
    width:'100%',
    paddingHorizontal:6,
    borderRadius:12,
    borderWidth:2,
  }
})