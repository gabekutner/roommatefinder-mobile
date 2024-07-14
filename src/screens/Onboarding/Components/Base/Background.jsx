import React from 'react';
import { ImageBackground } from 'react-native';
import { flex } from '../../../../styles/styles';


export default function Background({ children }) {
  return (
    <ImageBackground 
      source={require('../../../../assets/images/image_part_003.png')}
      style={{
        ...flex.flex1,
        backgroundColor:'rgba(0,0,0,.45)'
      }}
      imageStyle={{ opacity:0.6 }}
    >
      {children}
    </ImageBackground>
  )
}