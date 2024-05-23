import React, { useState } from 'react';
import {
  View,
  TouchableOpacity, 
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import FastImage from 'react-native-fast-image';

import Snackbar from './UI/SnackBar';
import FastImageBackground from './UI/FastImageBackground';
import InfoCard from './InfoCard';
import SwipeProfileModal from './UI/SwipeProfileModal';

import useGlobal from '../core/global';


export default function CardItem({ navigation, item, colors }) {

  const requestConnect = useGlobal(state => state.requestConnect)

  const [show, setShow] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)

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
          borderRadius:10,
          height:'100%',
        }}
        resizeMode={FastImage.resizeMode.cover}
        source={{ uri:item.thumbnail }}
      >
        <TouchableOpacity
          onPress={() => {
            // send friend req
            requestConnect(item.id)
            // show snackbar
            setShowSnackbar(true)
          }}
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
            position:'absolute',
            right:0,
            top:0
          }}
        >
          <FontAwesomeIcon 
            icon="plus"
            size={25}
            color={colors.accent}
          />
        </TouchableOpacity>
        <InfoCard name={item.name} age={item.age} dorm={item.dorm_building} colors={colors} />
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

      { show
        ?
          <SwipeProfileModal 
            item={item}
            colors={colors}
            isVisible={show}
            setIsVisible={setShow}
          />
        : null
      }

      { showSnackbar
        ? 
          <Snackbar
            message="Sent message request"
            actionText="Dismiss"
            onActionPress={() => {
              setShowSnackbar(false)
            }}
            duration={3000} // customize duration
            position="top" // change the position to 'top'/'bottom'
            backgroundColor={colors.accent} // customize background color
            textColor={colors.constWhite} // change text color
            actionTextColor={colors.constWhite} // customize action text color
            containerStyle={{ marginHorizontal:12 }} // apply additional styling
            messageStyle={{ fontWeight:'bold' }} // adjust message text styling
            actionTextStyle={{ }} // customize action text styling
          />
        : null
      }

    </View>
  )
}