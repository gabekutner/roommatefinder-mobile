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

  const Button = ({onPress, text}) => {
    return (
      <CustomButton
        onClick={onPress}
        style={{
          height:55,
          width:55,
          backgroundColor:colors.primary,
        }}
      >
        <CustomText style={{ fontSize:verticalScale(15) }}>
          {text}
        </CustomText>
      </CustomButton>
    )
  }
  
  const InfoItem = ({ emoji, text, style }) => {

    const styles = StyleSheet.create({
      text: {
        fontSize:verticalScale(15),
      }
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

        <InfoItem emoji="🏡" text={dormsData[item.dorm_building-1].dorm} style={{ marginTop:verticalScale(10) }} />
        {/* <InfoItem emoji="🏡" text={dormsData[item.dorm_building-1].dorm} />
        <InfoItem emoji="🏡" text={dormsData[item.dorm_building-1].dorm} /> */}


        {/* <CustomButton
          onClick={() => navigation.goBack()}
        >
          <CustomText>back</CustomText>
        </CustomButton> */}
      </ScrollView>

      {/* Action Buttons (swipe left / right) */}
      <View
        style={{
          position:'absolute',
          bottom:0,
          right:0,
          left:0,
          flexDirection:'row',
          justifyContent:'space-between',
          paddingHorizontal:30,
          paddingVertical:30
        }}
      >
        <Button onPress={() => {}} text="❌" />
        <Button onPress={() => {}} text="✔️" />
      </View>
    </View>
  )
}