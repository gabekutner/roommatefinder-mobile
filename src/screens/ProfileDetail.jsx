import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  SafeAreaView
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import FastImage from 'react-native-fast-image';
import { 
  verticalScale,
  moderateScale
} from 'react-native-size-matters';

import CustomText from '../components/UI/Custom/CustomText';
import CustomButton from '../components/UI/Custom/CustomButton';

import { colors } from '../constants/colors';
import { dormsData, interestsData } from '../assets/Dictionary';


export default function ProfileDetail({ route, navigation }) {

  const { item } = route.params
  
  const InfoItem = ({ emoji, text, style }) => {
    const styles = StyleSheet.create({
      text: { fontSize:verticalScale(15) }
    })
    return (
      <View
        style={{
          flexDirection:'row',
          gap:moderateScale(10),
          textAlign:'center',
          alignItems:'center',
          ...style
        }}
      >
        <CustomText style={styles.text}>
          {emoji}
        </CustomText>
        <CustomText style={{ ...styles.text, fontWeight:'500' }}>
          {text}
        </CustomText>
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
      
      <ScrollView
        style={{ 
          backgroundColor:colors.secondary,
          overflow:'hidden',
          padding:20,
          borderTopLeftRadius:20,
          borderTopRightRadius:20,
          bottom:0,
          left:0,
          right:0,
          position:'absolute',
          height:'48%',
          borderTopWidth:2,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection:'row' }}>
          <View 
            style={{ 
              backgroundColor:colors.primary,  
              paddingHorizontal:moderateScale(10),
              paddingVertical:verticalScale(5),
              borderRadius:6,
            }}
          >
            <CustomText style={{ fontSize:verticalScale(20), fontWeight:'bold' }}>
              {item.name ? item.name : null}
            </CustomText>
          </View>
          <View style={{ justifyContent:'center', marginLeft:moderateScale(8) }}>
            <CustomText style={{ fontSize:verticalScale(17), fontWeight:'600', }}>
              {item.age ? `${item.age} yo.` : null}
            </CustomText>
          </View>
        </View>
        { item.dorm 
          ? <InfoItem emoji="🏡" text={dormsData[item.dorm_building-1].dorm} style={{ marginTop:verticalScale(15) }} />
          : null
        }
        { item.major
          ? <InfoItem emoji="🎓" text={item.major} style={{ marginTop:verticalScale(10) }} />
          : null
        }
        { item.city && item.state
          ? <InfoItem emoji="📍" text={`${item.city}, ${item.state}`} style={{ marginTop:verticalScale(10) }} />
          : null
        }
        { item.graduation_year
          ? <InfoItem emoji="🏫" text={item.graduation_year} style={{ marginTop:verticalScale(10) }} />
          : null
        }
       
        <CustomButton
          onClick={() => {}}
          style={{
            marginTop:verticalScale(10),
            borderWidth:2,
            borderColor:colors.tint,
            backgroundColor:colors.accent,
            borderRadius:0,
            shadowColor: '#222',
            shadowOffset: { width: 7, height: 5 },
            shadowOpacity: 1,
            shadowRadius: 1,  
            flexDirection:'row',
            justifyContent:'space-between',
            paddingHorizontal:moderateScale(15)
          }}
        >
          <CustomText style={{ fontSize:verticalScale(15), color:colors.white, fontWeight:'500' }}>Socials</CustomText>
          <CustomText style={{ fontSize:verticalScale(15) }}>🔗</CustomText>
        </CustomButton>

        <View style={{ borderWidth:.75, marginVertical:verticalScale(10), borderColor:colors.tint }}/>

        { item.description 
          ? 
            <View 
              style={{ 
                backgroundColor:colors.primary,  
                paddingHorizontal:moderateScale(10),
                paddingVertical:verticalScale(5),
                borderRadius:6,
              }}
            >
              <CustomText style={{ fontSize:verticalScale(14), fontWeight:'500' }}>
                {item.description}
              </CustomText>
            </View>
          : null
        }

        { item.photos[0] 
          ? 
            <FastImage 
              key={item.id}
              style={{
                width:'100%',
                height:350,
                marginTop:verticalScale(10),
                borderColor:colors.tint,
                borderWidth:2,
                borderRadius:6
              }}
              source={{uri:item.photos[0].image}}
              resizeMode={FastImage.resizeMode.cover}
            />
          : null
        }

        <View 
          style={{
            flexDirection:'row',
            gap:moderateScale(12),
            marginTop:verticalScale(10),
            flexWrap:'wrap'
          }}
        >
          { item.interests 
            ? item.interests.map((item) => (
                <View 
                  style={{ 
                    paddingVertical:verticalScale(10), 
                    paddingHorizontal:moderateScale(20),
                    borderRadius:20, 
                    backgroundColor:colors.accent,
                  }}
                  key={item}
                >
                  <CustomText 
                    style={{ 
                      color:colors.white, 
                      fontSize:verticalScale(13), 
                      fontWeight:'500' 
                    }}
                  >
                    {interestsData[item-1].interest}
                  </CustomText>
                </View>
              ))
            : null
          }

        </View>

        { item.photos[1] !== undefined
          ? 
            <FastImage 
              key={item.id}
              style={{
                width:'100%',
                height:350,
                marginTop:verticalScale(10),
                borderColor:colors.tint,
                borderWidth:2,
                borderRadius:6
              }}
              source={{uri:item.photos[1].image}}
              resizeMode={FastImage.resizeMode.cover}
            />
          : null
        }

        { item.quotes.length !== 0
          ? 
            <View style={{ marginTop:verticalScale(10) }}>
              <View 
                style={{ 
                  backgroundColor:colors.primary,  
                  paddingHorizontal:moderateScale(10),
                  paddingVertical:verticalScale(5),
                  borderRadius:6,
                  paddingLeft:moderateScale(40)
                }}
              >
                <CustomText style={{ fontSize:verticalScale(16), fontWeight:'500' }}>
                  {item.quotes[0].quote}
                </CustomText>
                <CustomText style={{ fontSize:verticalScale(14), marginTop:verticalScale(5) }}>
                  - {item.quotes[0].cited}
                </CustomText>
              </View>
              <View
                style={{
                  position:'absolute',
                  top:-10,
                  left:-10,
                  padding:10,
                  backgroundColor:colors.primary,
                  borderRadius:60,
                  borderWidth:1
                }}
              >
                <FontAwesomeIcon 
                  icon='quote-left'
                  size={22}
                  color={colors.accent}
                />
              </View>
            </View>
          : null
        }
        <View style={{ height:verticalScale(150) }} />
      </ScrollView>
    </View>
  )
}