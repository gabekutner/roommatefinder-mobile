import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Linking,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import FastImage from 'react-native-fast-image';
import { verticalScale, moderateScale, scale } from 'react-native-size-matters';

import CustomText from '../components/UI/Custom/CustomText';
import CustomButton from '../components/UI/Custom/CustomButton';

import { colors } from '../constants/colors';
import { dormsData, interestsData } from '../assets/Dictionary';


export default function ProfileDetail({ route, navigation }) {

  const { item } = route.params

  const InfoItem = ({ icon, text }) => {
    return (
      <View style={{ flexDirection:'row', gap:moderateScale(10), alignItems:"center" }}>
        <FontAwesomeIcon icon={icon} size={verticalScale(20)} color={colors.tertiary} />
        <CustomText style={{ fontSize:verticalScale(15), fontWeight:'500', color:colors.tertiary }}>{text}</CustomText>
      </View>
    )
  }

  return (
    <View style={{ flex:1 }}>
      { item.thumbnail
        ? <FastImage
            key={item.id}
            style={{
              width:'100%',
              height:'75%',
              alignItems:'flex-end',
              flexDirection:'row',
            }}
            source={{ uri:item.thumbnail }}
            resizeMode={FastImage.resizeMode.cover}
          />
        : <FastImage
            key={item.id}
            style={{
              width:'100%',
              height:'75%',
              alignItems:'flex-end',
              flexDirection:'row',
            }}
            source={require('../assets/images/profile.png')}
            resizeMode={FastImage.resizeMode.cover}
          />
      }
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
            <CustomText style={styles.title}>{item.name}, {item.age}</CustomText>
            <CustomButton style={styles.button} onClick={() => navigation.goBack()}>
              <FontAwesomeIcon 
                icon="arrow-down" 
                size={verticalScale(20)} 
                color={colors.white} 
              />
            </CustomButton>
          </View>
        </View>
        {/* basics */}
        <View style={styles.wrapper}>
          <InfoItem icon="building" text={dormsData[item.dorm_building-1].dorm} />
          <View style={{ borderWidth:.5, marginVertical:verticalScale(10), borderColor:colors.tertiary }}/>
          <InfoItem icon="location-dot" text={`${item.city}, ${item.state}`} />
          <View style={{ borderWidth:.5, marginVertical:verticalScale(10), borderColor:colors.tertiary }}/>
          <InfoItem icon="graduation-cap" text={item.major} />
        </View>
        {/* socials */}
        <View style={{ ...styles.wrapper, flexDirection:'column', gap:verticalScale(10) }}>
          { item.links.map(( link ) => {
            return (
              <CustomButton 
                key={link.link}
                onClick={() => Linking.openURL(link.link)} 
                style={{ backgroundColor:colors.accent }}
              >
                <CustomText style={{ fontSize:verticalScale(15), color:colors.white }}>{link.title}</CustomText>
              </CustomButton>
            )
          })}
        </View>
        {/* first photo */}
        { item.photos[0] 
          ?
            <View style={styles.wrapper}>
              <FastImage
                key={`${item.id}1`}
                style={{
                  width:'100%',
                  height:verticalScale(250),
                  alignItems:'flex-end',
                  flexDirection:'row',
                  borderRadius:12
                }}
                source={{ uri:item.photos[0].image }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          : null
        }
        {/* description */}
        { item.description 
          ? 
            <View style={styles.wrapper}>
              <CustomText style={{ fontSize:verticalScale(16), fontWeight:'600' }}>Description</CustomText>
              <CustomText style={{ fontSize:verticalScale(13), fontWeight:'500', color:colors.tertiary }}>{item.description}</CustomText>
            </View>
          : null
        }
        {/* interests */}
        <View style={{ ...styles.wrapper, flexDirection:'column', gap:verticalScale(4) }}>
          { item.interests.map((interest) => {
            return (
              <View 
                style={{ 
                  backgroundColor:colors.accent, 
                  
                }}>
                <CustomText style={{ color:colors.white, fontSize:verticalScale(14) }} key={interest}>{interestsData[interest-1].interest}</CustomText>
              </View>
            )
          })}
        </View>
        {/* second photo */}
        { item.photos[1] 
          ?
            <View style={styles.wrapper}>
              <FastImage
                key={`${item.id}2`}
                style={{
                  width:'100%',
                  height:verticalScale(250),
                  alignItems:'flex-end',
                  flexDirection:'row',
                  borderRadius:12
                }}
                source={{ uri:item.photos[1].image }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          : null
        }
        {/* quotes, prompts */}

        {/* other photos, possible : 1 */}

        <View style={{ marginVertical:verticalScale(20) }} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:colors.secondary,
    overflow:'hidden',
    padding:verticalScale(15),
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    bottom:0,
    left:0,
    right:0,
    position:'absolute',
    height:'48%',
    borderTopWidth:2,
  },
  wrapper: {
    backgroundColor:colors.primary,
    paddingHorizontal:moderateScale(15),
    paddingVertical:verticalScale(10),
    borderRadius:12,
    marginBottom:verticalScale(10)
  },
  title: {
    fontSize:verticalScale(18),
    fontWeight:'600',
    color:colors.tint
  },
  button: {
    height:scale(45),
    width:scale(45),
    backgroundColor:colors.accent,
    borderRadius:6,
    borderWidth:2,
  }
})