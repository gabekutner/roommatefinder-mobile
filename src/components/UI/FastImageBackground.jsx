import React from 'react';
import { 
  View,
} from 'react-native';

import FastImage from 'react-native-fast-image';


export default function FastImageBackground({ containerStyle, imageStyle, source, resizeMode, children }) {
  return (
    <View style={{ flex:1, padding:0, margin:0, ...containerStyle }}>
      <FastImage
        style={{
          position:'absolute',
          left:0,
          right:0,
          top:0,
          bottom:0,
          ...imageStyle,
        }}
        source={source}
        resizeMode={resizeMode}
      />
      {children}
    </View>
  )
}