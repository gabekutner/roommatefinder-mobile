import React, { useEffect, useRef } from 'react';
import { 
  Animated,
  Easing,
  View,
} from 'react-native';

// react-native-image-progress is a bridge between the image component,
// or react-native-fast-image, and the progress views in react-native-progress. 
// Or you can use it to render a custom progress indicator.
import FastImage from 'react-native-fast-image';
import { createImageProgress } from 'react-native-image-progress';
// Wrap FastImage with react-native-image-progress.
const Image = createImageProgress(FastImage);


const LoadingIndicator = () => {

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startAnimation()
  }, [])

  const startAnimation = () => {
    Animated.loop(
      Animated.timing(
        animatedValue,
        {
          toValue: 1,
          duration: 1800, // 1.8 seconds in milliseconds
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }
      )
    ).start()
  }

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 255, 255, 0)', '#F0F0F0'],
  })

  return (
    <Animated.View 
      style={{ 
        backgroundColor, 
        width:'100%',
        height:'100%',
        borderRadius:10
      }} 
    />
  )
}


export default function FastImageBackground({ 
  containerStyle, 
  imageStyle, 
  url, 
  resizeMode, 
  children
}) {
  return (
    <View 
      style={{ 
        flex:1, 
        padding:0, 
        margin:0, 
        ...containerStyle 
      }}
    >
      <Image
        style={{
          overflow:'hidden',
          position:'absolute',
          left:0,
          right:0,
          top:0,
          bottom:0,
          ...imageStyle,
        }}
        source={{uri:url}}
        resizeMode={resizeMode}
        indicator={() => <LoadingIndicator />}
      />
      {children}
    </View>
  )
}