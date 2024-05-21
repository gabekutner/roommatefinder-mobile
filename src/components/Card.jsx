import React, { useState } from 'react';
import {
  View,
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet,
  Modal
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';

import FastImageBackground from './UI/FastImageBackground';
import InfoCard from './InfoCard';
import SwipeProfileModal from './UI/SwipeProfileModal';

export default function CardItem({ navigation, item, colors }) {

  const [show, setShow] = useState(false)

  return (
    <View 
      style={{ 
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <FastImageBackground
        key={item.id}
        containerStyle={{
          flex: 1,
          width: '100%',
          height: '100%',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexDirection: 'row',
        }}
        imageStyle={{
          borderRadius: 10,
          height: '100%',
        }}
        resizeMode={FastImage.resizeMode.cover}
        source={{ uri:item.thumbnail }}
      >
        <InfoCard name={item.name} age={item.age} dorm={item.dorm_building} colors={colors}  />
        <TouchableOpacity
          onPress={() => setShow(true)}
          style={{
            width:50,
            height:50,
            borderRadius:100,
            justifyContent:'center',
            alignItems:'center',
            alignSelf:'flex-end',
            marginVertical:15,
            marginHorizontal:15,
            padding:10,
            backgroundColor:colors.secondary,
          }}
        >
          <FontAwesomeIcon 
            icon="arrow-up"
            size={25}
            color={colors.accent}
          />
        </TouchableOpacity>
      </FastImageBackground>

      { setShow 
        ?  
          <Modal
            animationType="slide"
            visible={show}
          >
            <SwipeProfileModal item={item} setShow={setShow} colors={colors} />
          </Modal>
        : <></> 
      }

    </View>
  )
}