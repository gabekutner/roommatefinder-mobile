import React from 'react';
import { 
  View, 
  Text,
  StatusBar,
  SafeAreaView,
} from 'react-native';

import { 
  moderateScale, 
  verticalScale,
} from 'react-native-size-matters';

import Title from '../components/Brand/Title';
import CustomText from '../components/UI/Custom/CustomText';
import CustomButton from '../components/UI/Custom/CustomButton';

import { colors } from '../constants/colors';


export default function StartupScreen({ navigation }) {

  const Button = ({ onPress, text }) => {
    return (
      <CustomButton
        onClick={onPress}
        style={{
          alignSelf:'center',
          width:'80%',
          backgroundColor:colors.accent
        }}
      >
        <CustomText
          style={{
            fontSize:verticalScale(16),
            color:colors.white
          }}
        >
          {text}
        </CustomText>
      </CustomButton>
    )
  }

  return (
    <SafeAreaView style={{ flex:1, backgroundColor:colors.primary }}>
      <StatusBar />
      <Text
        style={{
          fontFamily:'GideonRoman-Regular',
          fontSize:verticalScale(15),
          alignSelf:'center',
          marginVertical:verticalScale(10)
        }}
      >
        THE UNIVERSITY OF UTAH'S
      </Text>
      <Title 
        title="RoommateFinder"
        color={colors.accent}
        fontSize={verticalScale(28)}
        style={{
          alignSelf:'center'
        }}
      />

      <View
        style={{
          position:'absolute',
          bottom:0,
          left:0,
          right:0,
          paddingTop:verticalScale(15),
          borderTopLeftRadius:20,
          borderTopRightRadius:20,
          paddingBottom:verticalScale(60),
          flexDirection:'column',
          gap:verticalScale(14),
          backgroundColor:colors.secondary
        }}
      >
        <Button onPress={() => navigation.navigate('signin')} text="Login" />
        <Button onPress={() => navigation.navigate('signup')} text="Get Started" />
      </View>
    </SafeAreaView>
  )
}