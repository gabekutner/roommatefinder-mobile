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

import CustomText from '../../components/UI/Custom/CustomText';
import CustomButton from '../../components/UI/Custom/CustomButton';

import { colors } from '../../constants/colors';
import utils from '../../core/utils';
import { dormsData, interestsData, prompts } from '../../assets/Dictionary';


export default function ProfileDetail({ route, navigation }) {

  const { item } = route.params

  const InfoItem = ({ icon, text }) => {
    return (
      <View style={{ flexDirection:'row', gap:moderateScale(10), alignItems:"center" }}>
        <FontAwesomeIcon icon={icon} size={verticalScale(20)} color={colors.tertiary} />
        <CustomText fontSize="medium" style={{ fontWeight:'500', color:colors.tertiary }}>{text}</CustomText>
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
            source={require('../../assets/images/profile.png')}
            resizeMode={FastImage.resizeMode.cover}
          />
      }
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* title */}
        <View style={styles.wrapper}>
          <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
            <CustomText fontSize="x-large" style={styles.title}>{item.name}, {item.age}</CustomText>
            <CustomButton 
              shadow
              style={styles.button} 
              onClick={() => navigation.goBack()}
            >
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
        { item.links.length !== 0
          ?
            <View style={styles.wrapper}>
              <View style={{ flexDirection:'row', gap:moderateScale(10), marginBottom:verticalScale(8) }}>
                <FontAwesomeIcon icon="link" size={verticalScale(20)} color={colors.tertiary} />
                <CustomText style={{ fontSize:verticalScale(16), fontWeight:'600', color:colors.tint }}>Social handles</CustomText>
              </View>
              <View 
                style={{ 
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'center', 
                  justifyContent: 'flex-start',
                }}
              >
                
                {item.links.map(( link ) => (
                  <CustomButton 
                    shadow
                    key={link.link}
                    onClick={() => {
                      const url = utils.testUrl(link.link)
                      Linking.openURL(url).catch((err) =>
                        console.error('openlink err: ', err)
                      )
                    }} 
                    style={{ 
                      backgroundColor:colors.accent,
                      paddingHorizontal:moderateScale(15),
                      paddingVertical:verticalScale(10),
                      borderRadius:12,
                      margin:verticalScale(2), // Adjust spacing between items 
                    }}
                  >
                    <CustomText fontSize="medium" style={{ color:colors.white, fontWeight:'600' }}>
                      {link.title}
                    </CustomText>
                  </CustomButton>
                ))}
              </View>
            </View>
          : null 
        }
        
        {/* first photo */}
        { item.photos[0] 
          ?
            <View style={styles.wrapper}>
              <FastImage
                key={`${item.id}1`}
                style={{
                  width:'100%',
                  height:verticalScale(300),
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
              <View style={{ flexDirection:'row', gap:moderateScale(10), marginBottom:verticalScale(8) }}>
                <FontAwesomeIcon icon="quote-left" size={verticalScale(14)} color={colors.tertiary} />
                <CustomText fontSize="large" style={{ fontWeight:'600', color:colors.tint }}>About me</CustomText>
              </View>
              <CustomText fontSize="medium" style={{ fontWeight:'500', color:colors.tertiary }}>{item.description}</CustomText>
            </View>
          : null
        }

        {/* interests */}
        { item.interests.length !== 0
          ?
          <View style={styles.wrapper}>
            <View style={{ flexDirection:'row', gap:moderateScale(10), marginBottom:verticalScale(8) }}>
              <FontAwesomeIcon icon="person-hiking" size={verticalScale(20)} color={colors.tertiary} />
              <CustomText fontSize="large" style={{ fontWeight:'600', color:colors.tint }}>Interests</CustomText>
            </View>
            <View 
              style={{ 
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center', // Adjust as needed
                justifyContent: 'flex-start', // Adjust as needed
              }}
            >
              {item.interests.map((interest, index) => (
                <View 
                  key={index} 
                  style={{ 
                    backgroundColor:colors.secondary,
                    paddingHorizontal:moderateScale(12),
                    paddingVertical:verticalScale(6),
                    borderRadius:12,
                    margin:verticalScale(2), // Adjust spacing between items 
                  }}
                >
                  <CustomText fontSize="medium" style={{ color:colors.tint, fontWeight:'600' }}>
                    {interestsData[interest - 1].interest}
                  </CustomText>
                </View>
              ))}
            </View>
          </View>
          : null
        }
        
        {/* second photo */}
        { item.photos[1] 
          ?
            <View style={styles.wrapper}>
              <FastImage
                key={`${item.id}2`}
                style={{
                  width:'100%',
                  height:verticalScale(300),
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

        {/* quotes */}
        {item.quotes.length !== 0
          ? 
            <View style={styles.wrapper}>
              <View style={{ flexDirection:'row', gap:moderateScale(10), marginBottom:verticalScale(8) }}>
                <FontAwesomeIcon icon="quote-left" size={verticalScale(20)} color={colors.tertiary} />
                <CustomText fontSize="large" style={{ fontWeight:'600', color:colors.tint }}>Quotes</CustomText>
              </View>
              <View
                style={{ 
                  flexDirection: 'column',
                  flexWrap: 'wrap',
                  alignItems: 'center', // Adjust as needed
                  justifyContent: 'flex-start', // Adjust as needed
                }}
              >
                {item.quotes.map((quote, index) => (
                  <View
                    key={index}
                    style={{
                      width:'100%',
                      backgroundColor:colors.secondary,
                      paddingHorizontal:moderateScale(15),
                      paddingVertical:verticalScale(10),
                      borderRadius:12,
                      margin:verticalScale(2), // Adjust spacing between items 
                    }}
                  >
                    <CustomText fontSize="medium" style={{ color:colors.tint, fontWeight:'600' }}>
                      "{quote.quote}"
                    </CustomText>
                    <CustomText fontSize="medium" style={{ color:colors.tint, fontWeight:'500', marginTop:verticalScale(5) }}>
                      - {quote.cited}
                    </CustomText>
                  </View>
                ))}
              </View>
            </View>
          : null
        }

        {/* prompts */}
        {item.prompts.length !== 0
          ? 
            <View style={styles.wrapper}>
              <View style={{ flexDirection:'row', gap:moderateScale(10), marginBottom:verticalScale(8) }}>
                <FontAwesomeIcon icon="message" size={verticalScale(20)} color={colors.tertiary} />
                <CustomText fontSize="large" style={{ fontWeight:'600', color:colors.tint }}>Prompts</CustomText>
              </View>
              <View
                style={{ 
                  flexDirection: 'column',
                  flexWrap: 'wrap',
                  alignItems: 'center', // Adjust as needed
                  justifyContent: 'flex-start', // Adjust as needed
                }}
              >
                {item.prompts.map((prompt, index) => (
                  <View
                    key={index}
                    style={{
                      width:'100%',
                      backgroundColor:colors.secondary,
                      paddingHorizontal:moderateScale(15),
                      paddingVertical:verticalScale(10),
                      borderRadius:12,
                      margin:verticalScale(2), // Adjust spacing between items 
                    }}
                  >
                    <CustomText fontSize="medium" style={{ color:colors.tint, fontWeight:'600' }}>
                      {prompts[prompt.question-1].prompt}
                    </CustomText>
                    <CustomText fontSize="medium" style={{ color:colors.tint, fontWeight:'500', marginTop:verticalScale(5) }}>
                      {prompt.answer}
                    </CustomText>
                  </View>
                ))}
              </View>
            </View>
          : null
        }

        {/* other photos, possible : 1 */}
        { item.photos[2] 
          ?
            <View style={styles.wrapper}>
              <FastImage
                key={`${item.id}3`}
                style={{
                  width:'100%',
                  height:verticalScale(300),
                  alignItems:'flex-end',
                  flexDirection:'row',
                  borderRadius:12
                }}
                source={{ uri:item.photos[2].image }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          : null
        }

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
    height:'50%',
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
    fontWeight:'600',
    color:colors.tint
  },
  button: {
    height:scale(45),
    width:scale(45),
    backgroundColor:colors.accent,
    borderRadius:60,
    borderWidth:2,
  }
})