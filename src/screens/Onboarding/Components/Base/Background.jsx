import React from 'react';
import { ImageBackground } from 'react-native';

import { colors } from '../../../../constants/colors';


export default function Background({ children }) {
  return (
    <ImageBackground 
      source={require('../../../../assets/images/image_part_002.png')}
      style={{ flex:1, backgroundColor:colors.primary }}
      imageStyle={{ opacity:0.5 }}
    >
      {children}
    </ImageBackground>
  )
}