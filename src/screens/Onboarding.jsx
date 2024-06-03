import React from 'react';
import { 
  View, 
  StyleSheet, 
  Image, 
  Text,
  StatusBar,
} from 'react-native';

import { 
  moderateScale, 
  moderateVerticalScale, 
  verticalScale,
} from 'react-native-size-matters';

import CustomText from '../components/UI/Custom/CustomText';
import CustomButton from '../components/UI/Custom/CustomButton';

import useGlobal from '../core/global';
import { colors as c} from '../assets/config';


export default function Onboarding({ navigation }) {

  const theme = useGlobal(state => state.theme)
  const colors = c[theme]

  return (
    <View 
      style={{ 
        flex:1, 
      }}
    >
   
      <StatusBar barStyle='light-content' />

      <View style={{ flex:1 }} >
        <View
          style={{
            height:verticalScale(175),
            position:'absolute',
            marginTop:verticalScale(-18),
            top:0,
            left:0,
            right:0,
            backgroundColor:colors.accentDark, 
            transform: [{ skewY: '-5deg' }],
            borderBottomWidth:4,
            alignItems:'flex-end',
            justifyContent:'flex-end'
          }}
        >
          <Text
            style={{
              fontFamily:'LuckiestGuy-Regular',
              color:colors.wasatchSun,
              fontSize:verticalScale(30),
              marginRight:moderateScale(15),
              marginBottom:verticalScale(10),
              textShadowColor:'#222',
              textShadowRadius:10,
              textShadowOffset: [{ width:15, height:15 }]
            }}
          >
            RoommateFinder
          </Text>
        </View>
        <View
          style={{
            marginTop:verticalScale(40),
            backgroundColor:colors.green,
            height:40,
            flexDirection:'row',
            alignItems:'center',
            overflow:'hidden',
            borderColor:'#222',
            borderTopWidth:2,
            borderBottomWidth:2,
          }}
        >
          <Image 
            source={require('../assets/images/pnghut_halftone-comics-monochrome-polka-dot-graphic-design.png')}
            resizeMode="cover"
            style={{
              width:'40%',
              height:'600%',
              left:0,
              marginRight:3,
              transform: [{ rotate: '90deg'}]
            }}
          />
          <Text
            style={{
              fontSize:verticalScale(10),
              color:colors.constBlack,
              fontWeight:'600',
              fontFamily:'blambotcustom'
            }}
          >
            The University of Utah's
          </Text>
          <Image 
            source={require('../assets/images/pnghut_halftone-comics-monochrome-polka-dot-graphic-design.png')}
            resizeMode="cover"
            style={{
              width:'100%',
              height:'100%',
              right:0,
            }}
          />
        </View>  
      </View>

      {/*  */}
      
      <View
        style={{
          height:verticalScale(200),
          bottom:0,
          left:0,
          right:0,
          backgroundColor:colors.accentDark, 
          transform: [{ skewY: '5deg' }],
          borderTopWidth:4,
        }} 
      />
      <View 
        style={{ 
          position:'absolute', 
          bottom:0,
          left:0,
          right:0,
          backgroundColor:colors.accentDark,
          paddingBottom:verticalScale(40),
        }}
      > 
        <CustomButton
          onClick={() => navigation.navigate('signin')}
          style={{
            backgroundColor:colors.constWhite,
            padding:moderateVerticalScale(20),
            marginHorizontal:moderateScale(20),
            marginVertical:moderateVerticalScale(5),
            height:verticalScale(54),
            borderRadius:0,
            shadowColor: '#222',
            shadowOffset: { width: 7, height: 5 },
            shadowOpacity: 1,
            shadowRadius: 1,  
            borderWidth:2,
          }}
        >
          <CustomText 
            style={[
              styles.bold,
              { 
                color:colors.accentDark,
                fontSize:verticalScale(16)
              }
            ]}
          >
            Log in
          </CustomText>
        </CustomButton>
        <CustomButton
          onClick={() => navigation.navigate('signup')}
          style={{
            borderWidth:2,
            backgroundColor:colors.accentDark,
            borderColor:colors.constBlack,
            padding:moderateVerticalScale(20),
            marginHorizontal:moderateScale(20),
            marginVertical:moderateVerticalScale(5),
            height:verticalScale(54),
            borderRadius:0,
            shadowColor: '#222',
            shadowOffset: { width: 7, height: 5 },
            shadowOpacity: 1,
            shadowRadius: 1,
          }}
        >
          <CustomText 
            style={[
              styles.bold, 
              {
                color:colors.constWhite,
                fontSize:verticalScale(16)
              }
            ]}
          >
            Get Started
          </CustomText>
        </CustomButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bold: { fontWeight:'bold' },
  dot: {
    width:12,
    height:12,
    borderRadius:50,
    marginHorizontal:5, 
    borderWidth:1,
  },
})