import React from 'react';
import { 
  View, 
  StyleSheet, 
  Image, 
  Text,
  SafeAreaView,
  StatusBar,
  ImageBackground
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
        backgroundColor:colors.accentDark
      }}
    >
   
      <StatusBar barStyle='light-content' />

      <View
        style={{
          flex:1,
          marginTop:verticalScale(40)
        }}
      >
        <View
          style={{
            backgroundColor:colors.green,
            height:40,
            top:15,
            flexDirection:'row',
            alignItems:'center',
            overflow:'hidden',
            borderColor:'#222',
            borderWidth:2
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
              fontSize:14,
              color:'#222',
              fontWeight:'600',
              fontFamily:'blambotcustom'
            }}
          >
            The University of Utah's
          </Text>
          {/* possibly replace with swoop or something cooler */}
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

        <View
          style={{
            position:'absolute',
            top:0,
            left:20,
            width:65,
            backgroundColor:colors.constWhite,
            borderColor:'#222',
            borderWidth:2,
          }}
        >
          <Image 
            source={require('../assets/images/uofulogo-clear_prev_ui.png')}
            resizeMode='cover'
            style={{
              top:-15,
              width:100,
              height:85,
              marginBottom:-10,
            }}
          />
          <View style={{ width:'100%', height:2, backgroundColor:'#222' }} />
          <Text
            style={{
              fontFamily:'blambotcustom',
              alignSelf:'center',
              marginVertical:10
            }}
          >
            v. 1.0.0
          </Text>
        </View>

        <View
          style={{
            position:'absolute',
            right:15,
            top:100
          }}
        >
          <Text
            style={{
              fontFamily:'Acme-Regular',
              fontSize:verticalScale(40),
              color:colors.wasatchSun,
              transform: [{ rotate: '353deg'}],
              textShadowColor:'#222',
              textShadowRadius:10,
              textShadowOffset: [{ width:15, height:15 }]
            }}
          >
            RoommateFinder
          </Text>
        </View>
      </View> 

      <View 
        style={{ 
          position:'absolute', 
          bottom:verticalScale(60), 
          left:0,
          right:0,
        }}
      > 
        <Image 
          source={require('../assets/images/swoop-removebg-preview.png')}
          style={{
            marginLeft:15,
            width:moderateScale(160),
            height:verticalScale(265),
          }}
        />
        <CustomButton
          onClick={() => navigation.navigate('signin')}
          style={{
            backgroundColor:colors.constWhite,
            padding:moderateVerticalScale(20),
            marginHorizontal:moderateScale(20),
            marginVertical:moderateVerticalScale(5),
            height:63,
            borderRadius:0,
            shadowColor: '#222',
            shadowOffset: { width: 7, height: 5 },
            shadowOpacity: 1,
            shadowRadius: 1,  
            borderWidth:2,
          }}
        >
          <Text 
            style={[
              styles.buttonText, 
              styles.bold,
              { 
                color:colors.accentDark,
                fontFamily:'Acme-Regular',
              }
            ]}
          >
            Log in
          </Text>
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
            height:60,
            borderRadius:0,
            shadowColor: '#222',
            shadowOffset: { width: 7, height: 5 },
            shadowOpacity: 1,
            shadowRadius: 1,
          }}
        >
          <Text 
            style={[
              styles.buttonText, 
              styles.bold, 
              {
                color:colors.constWhite,
                fontFamily:'Acme-Regular',
              }
            ]}
          >
            Get Started
          </Text>
        </CustomButton>
      </View>
      {/* </ImageBackground> */}
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
  buttonText: { fontSize:24 },
})