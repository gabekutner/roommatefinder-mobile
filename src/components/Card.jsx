import React, { useState } from 'react';
import {
  View,
} from 'react-native';

import FastImage from 'react-native-fast-image';
import { LinearGradient } from 'react-native-linear-gradient';

import CircleButton from './UI/CircleButton';
import Snackbar from './UI/SnackBar';
import FastImageBackground from './UI/FastImageBackground';
import InfoCard from './InfoCard';
import SwipeProfileModal from './UI/SwipeProfileModal';
import { verticalScale } from 'react-native-size-matters';


export default function CardItem({ 
  navigation, 
  item, 
  colors, 
}) {
  return (
    <View 
      style={{ 
        flex: 1,
        justifyContent:'flex-start',
        alignItems:'center',
        width:'100%',
      }}
    >
      <FastImageBackground
        key={item.id}
        containerStyle={{
          flex:1,
          width:'100%',
          height:'100%',
          justifyContent:'space-between',
          alignItems:'flex-end',
          flexDirection:'row',
        }}
        imageStyle={{
          height:'100%',
        }}
        resizeMode={FastImage.resizeMode.cover}
        url={item.thumbnail}
      >
        <InfoCard name={item.name} age={item.age} dorm={item.dorm_building} colors={colors} />
        <CircleButton 
          backgroundColor={colors.primary} 
          iconColor={'#222'} 
          onPress={() => navigation.navigate('profile-detail', { item:item })} 
          size={verticalScale(24)}
          icon={'arrow-up'}
        />
        <LinearGradient
          colors={['rgba(255, 255, 255, 0)', '#222']} // Transparent to black
          locations={[0, 1]} // Position stops
          style={{
            position: 'absolute',
            right: 0,
            left: 0,
            bottom: 0,
            zIndex: 0,
            height: '40%',
          }}
        />
      </FastImageBackground>
    </View>
  )
}