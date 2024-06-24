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

  // const Button = ({ onPress, text }) => {
  //   return (
  //     <CustomButton
  //       onClick={onPress}
  //       style={{
  //         alignSelf:'center',
  //         width:'80%',
  //         backgroundColor:colors.accent
  //       }}
  //     >
  //       <CustomText
  //         style={{
  //           fontSize:verticalScale(16),
  //           color:colors.white
  //         }}
  //       >
  //         {text}
  //       </CustomText>
  //     </CustomButton>
  //   )
  // }

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

      {/* something here... */}

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
          backgroundColor:colors.secondary,
          paddingHorizontal:moderateScale(35)
        }}
      >
        <CustomButton
          onClick={() => navigation.navigate('signin')}
          style={{ 
            borderWidth:2,
            borderColor:colors.tint,
            backgroundColor:colors.accent,
            borderRadius:0,
            shadowColor: '#222',
            shadowOffset: { width: 7, height: 5 },
            shadowOpacity: 1,
            shadowRadius: 1,  
          }}
        >
          <CustomText 
            style={{ 
              fontSize:verticalScale(16), 
              fontWeight:'600', 
              color:colors.white,
            }}
          >
            Sign in
          </CustomText>
        </CustomButton>
        <CustomButton
          onClick={() => navigation.navigate('signup')}
          style={{ 
            borderWidth:2,
            borderColor:colors.tint,
            backgroundColor:colors.accent,
            borderRadius:0,
            shadowColor: '#222',
            shadowOffset: { width: 7, height: 5 },
            shadowOpacity: 1,
            shadowRadius: 1,  
          }}
        >
          <CustomText 
            style={{ 
              fontSize:verticalScale(16), 
              fontWeight:'600', 
              color:colors.white,
            }}
          >
            Get Started
          </CustomText>
        </CustomButton>
      </View>
    </SafeAreaView>
  )
}