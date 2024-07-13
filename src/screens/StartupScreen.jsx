import React from 'react';
import { 
  View, 
  Text,
  StatusBar,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
} from 'react-native';

import { moderateScale, verticalScale } from 'react-native-size-matters';

import Title from '../components/Brand/Title';
import CustomText from '../components/UI/Custom/CustomText';
import CustomButton from '../components/UI/Custom/CustomButton';
import CustomButtonComponent from '../components/Button/CustomButtonComponent';

import { colors } from '../constants/colors';
import { Global, Card } from '../styles';


export default function StartupScreen({ navigation }) {
  return (
      
    <ImageBackground 
      source={require('../assets/images/image_part_001.png')}
      imageStyle={{ height: '100%' }}
      resizeMode='cover'
      style={Global.container}
    >
      <StatusBar 
        networkActivityIndicatorVisible={true}
        showHideTransition={'slide'}
      />
      <View 
        style={[
          Global.container,
          Global.justifyCenter
        ]}
      >
        <View 
          style={[
            // Card.borderWidth,
            Global.justifyCenter,
            Global.itemsCenter,
            { backgroundColor:colors.primary }
          ]}
        >

          <Title 
            title="roommatefinder"
            color={colors.accent}
          />
        </View>
      </View>
      <View style={Global.container}>

      </View>
    </ImageBackground>

    

/* 
      <View style={styles.titleWrapper}>
        <Text style={styles.universityOfUtah}>
          THE UNIVERSITY OF UTAH'S
        </Text>
        <Title 
          title="roommatefinder"
          color={colors.accent}
          style={{ alignSelf:'center' }}
        />
      </View>

      <View resizeMode='cover' style={styles.actionWrapper}>
        <CustomButton
          shadow
          onClick={() => navigation.navigate('signin')}
          style={styles.actionButton}
        >
          <CustomText fontSize='large' style={styles.actionText}>
            Sign in
          </CustomText>
        </CustomButton>
        <CustomButton
          shadow
          onClick={() => navigation.navigate('signup')}
          style={styles.actionButton}
        >
          <CustomText fontSize='large' style={styles.actionText}>
            Get Started
          </CustomText>
        </CustomButton>
      </View> */
  )
}

const styles = StyleSheet.create({
  // container: { 
  //   flex:1, 
  //   backgroundColor:colors.secondary,
  // },
  titleWrapper: {
    position:'absolute', 
    left:0, 
    right:0, 
    top:verticalScale(100) ,
    backgroundColor:colors.primary,
    borderTopWidth:2,
    borderBottomWidth:2
  },
  universityOfUtah: {
    fontFamily:'GideonRoman-Regular',
    fontSize:verticalScale(14),
    alignSelf:'center',
    marginVertical:verticalScale(10),
  },
  actionWrapper: {
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
    paddingTop:verticalScale(15),
    paddingBottom:verticalScale(20),
    flexDirection:'column',
    gap:verticalScale(14),
    paddingHorizontal:moderateScale(35),
    backgroundColor:colors.secondary,
    borderTopRightRadius:12,
    borderTopLeftRadius:12,
    borderWidth:2,
  },
  actionButton: {
    borderWidth:2,
    borderColor:colors.tint,
    backgroundColor:colors.accent,
    shadowColor: '#000',
    shadowOffset: { 
      width: 1.5, 
      height: 2
    },
    shadowOpacity: 0.7,
    shadowRadius: 0.6,  
  },
  actionText: {
    fontWeight:'600', 
    color:colors.white,
  }
})