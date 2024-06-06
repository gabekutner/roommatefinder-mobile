import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import FastImage from 'react-native-fast-image';
import { LinearGradient } from 'react-native-linear-gradient';

import CircleButton from './UI/CircleButton';
import Snackbar from './UI/SnackBar';
import FastImageBackground from './UI/FastImageBackground';
import InfoCard from './InfoCard';
import SwipeProfileModal from './UI/SwipeProfileModal';
import { verticalScale } from 'react-native-size-matters';


export default function CardItem({ item, colors }) {

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
          height:'100%',
        }}
        resizeMode={FastImage.resizeMode.cover}
        url={item.thumbnail}
      >
        <InfoCard name={item.name} age={item.age} dorm={item.dorm_building} colors={colors} />
        <CircleButton 
          backgroundColor={colors.primary} 
          iconColor={'#222'} 
          onPress={() => setShow(true)} 
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