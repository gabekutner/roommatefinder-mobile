import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native';

import FastImage from 'react-native-fast-image';
import { 
  verticalScale,
  moderateScale
} from 'react-native-size-matters';

import CustomText from '../components/UI/Custom/CustomText';
import CustomButton from '../components/UI/Custom/CustomButton';

import { colors } from '../constants/colors';
import { dormsData } from '../assets/Dictionary';


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
        <CustomText style={styles.text}>
          {text}
        </CustomText>
      </View>
    )
  }

  const BoxedItem = () => {
    return (
      <View>
        
      </View>
    )
  }

  return (
    <View style={{ flex:1 }}>
      <FastImage
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
          height:'40%',
          borderTopWidth:2
        }}
        showsVerticalScrollIndicator={false}
      >
        <CustomText
          style={{
            fontSize:verticalScale(20),
            fontWeight:'bold',
          }}
        >
          {item.name}
        </CustomText>
        
        {/* Data
            - name  - email
            - birthday  - major
            - city, state 
            - description (optional)
            - dorm_building
            - interests
            - graduation_year
            - quotes  - links
            - prompts   - photos
        */}
        <InfoItem emoji="🏡" text={dormsData[item.dorm_building-1].dorm} style={{ marginTop:verticalScale(10) }} />
        <InfoItem emoji="🎓" text={item.major} style={{ marginTop:verticalScale(10) }} />
        { item.city && item.state
          ?
            <InfoItem 
              emoji="📍" 
              text={`${item.city}, ${item.state}`} 
              style={{ marginTop:verticalScale(10) }} 
            />
          : null
        }
        { item.links.length !== 0
          ? 
            <InfoItem 
              emoji="🔗" 
              text={`${item.links}`} 
              style={{ marginTop:verticalScale(10) }} 
            />
          : null
        }

        { item.quotes.length !== 0
          ?
            <InfoItem 
              emoji="🔗" 
              text={`${item.quotes[0].quote}`} 
              style={{ marginTop:verticalScale(10) }} 
            />
          : null
        }

        

      </ScrollView>
    </View>
  )
}