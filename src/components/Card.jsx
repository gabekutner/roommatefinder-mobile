import React, { useEffect, useState } from 'react';
import { 
  View, 
  StyleSheet,
} from 'react-native';

import FastImage from 'react-native-fast-image';
import { LinearGradient } from 'react-native-linear-gradient';
import { verticalScale, moderateScale, scale } from 'react-native-size-matters';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

// import CircleButton from './UI/CircleButton';
// import Title from './Brand/Title';
import FastImageBackground from './UI/FastImageBackground';
import InfoCard from './InfoCard';
import CustomText from './UI/Custom/CustomText';
import CustomButton from './UI/Custom/CustomButton';
import { dormsData } from '../assets/Dictionary';


export default function CardItem({ 
  navigation, 
  item, 
  colors, 
}) {
  return (
    <View style={styles.container}>
      <FastImageBackground
        key={item.id}
        containerStyle={styles.imageContainer}
        imageStyle={{ height:'100%', borderRadius:18 }}
        resizeMode={FastImage.resizeMode.cover}
        url={item.thumbnail}
      >
        <View style={{ ...styles.infoCard, backgroundColor:colors.primary }}>
          
          <View style={{ ...styles.box, width:'80%' }}>
            <CustomText style={styles.name}>
              {item.name}{', '}
              <CustomText style={styles.age}>{item.age}</CustomText>
            </CustomText>
            <CustomText style={{ ...styles.extra, marginBottom:verticalScale(5) }}>🏡 {dormsData[item.dorm_building-1].dorm}</CustomText>
            <CustomText style={{ ...styles.extra, marginBottom:verticalScale(6) }}>📍 {item.city}, {item.state}</CustomText>
          </View>
          <View style={{ ...styles.box, width:'20%' }}>
            <CustomButton
              onClick={() => navigation.navigate('profile-detail', { item:item })}
              style={{ ...styles.action, backgroundColor:colors.accent }}
            >
              <FontAwesomeIcon 
                icon="arrow-up"   
                size={verticalScale(20)}
                color={colors.white}
              />
            </CustomButton>
          </View>
        </View>
        <LinearGradient
          colors={['rgba(255, 255, 255, 0)', '#222']} // Transparent to black
          locations={[0, 1]} // Position stops
          style={styles.linearGradient}
        />
      </FastImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'flex-start',
    alignItems:'center',
    width:'100%',
  },
  imageContainer: {
    flex:1,
    width:'100%',
    height:'100%',
    alignItems:'flex-end',
    flexDirection:'row',
    justifyContent:'center'
  },
  linearGradient: {
    position:'absolute',
    right:0,
    left:0,
    bottom:0,
    zIndex:0,
    height:'40%',
    borderBottomRightRadius:18,
    borderBottomLeftRadius:18,
  },
  infoCard: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 12,
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(6),
    marginVertical: verticalScale(12),
    flexDirection: 'column',
    justifyContent: 'space-around',
    zIndex:1,
    width:'90%',
    borderWidth:2,
    flexDirection:'row'
  },
  box: {
    // alignItems:'center',
    justifyContent:'center'
  },
  action: {
    // borderRadius:50,
    width:scale(50),
    height:scale(50),
    borderRadius:scale(60),
    borderWidth:2,
    shadowColor: '#222',
    shadowOffset: { width:2, height:1 },
    shadowOpacity: 1,
    shadowRadius: 1,  
    borderWidth:3,
  },  
  name: {
    fontSize:verticalScale(18),
    fontWeight:'600',
    marginBottom:verticalScale(5)
  },
  extra: {
    fontSize:verticalScale(15),
    fontWeight:'500'
  },
  age: {
    fontSize:verticalScale(16),
    fontWeight:'500'
  }
})