import React from 'react';
import { 
  View, 
  StyleSheet, 
  Image, 
  Text,
} from 'react-native';

import { 
  moderateScale, 
  moderateVerticalScale 
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
      <View 
        style={{ 
          flex:0.8, 
          backgroundColor:colors.accentDark
        }}
      >
        <View style={{
          flex:1,
          alignItems:'center',
          justifyContent:'center'
        }}>
          <CustomText
            style={{
              fontSize:20,
              color:colors.constWhite,
              fontWeight:'600'
            }}
          >
            The University of Utah's
          </CustomText>
          <Text 
            style={{ 
              fontFamily:'Acme-Regular',
              fontSize:50,
              color:colors.constWhite,
              marginVertical:20
            }}
          >
            RoommateFinder
          </Text>
          <Image 
            source={require('../assets/images/uofulogo-clear_prev_ui.png')}
            style={{
              width:300,
              height:250,
            }}
          />
        </View>
      </View>

      <View style={{ flex:0.2, marginBottom:25 }}>
        <CustomButton
          onClick={() => navigation.navigate('signin')}
          style={{
            backgroundColor:colors.constWhite,
            padding:moderateVerticalScale(20),
            marginHorizontal:moderateScale(20),
            marginVertical:moderateVerticalScale(5),
            height:60,
          }}
        >
          <CustomText 
            style={[
              styles.buttonText, 
              styles.bold,
              { 
                color:colors.accentDark
              }
            ]}
          >
            Log in
          </CustomText>
        </CustomButton>
        <CustomButton
          onClick={() => navigation.navigate('signup')}
          style={{
            borderWidth:1,
            borderColor:colors.constWhite,
            padding:moderateVerticalScale(20),
            marginHorizontal:moderateScale(20),
            marginVertical:moderateVerticalScale(5),
            height:60,
          }}
        >
          <CustomText 
            style={[
              styles.buttonText, 
              styles.bold, 
              {
                color:colors.constWhite
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
  buttonText: { fontSize:20 },
})