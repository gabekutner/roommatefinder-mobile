import React from 'react';
import { 
  View, 
  Text,
  StatusBar,
  StyleSheet,
  ImageBackground,
} from 'react-native';

import { moderateScale, verticalScale } from 'react-native-size-matters';

import Title from '../components/Brand/Title';
import CustomText from '../components/UI/Custom/CustomText';
import CustomButton from '../components/UI/Custom/CustomButton';
import { colors } from '../constants/colors';


export default function StartupScreen({ navigation }) {
  return (
    <ImageBackground 
      source={require('../assets/images/image_part_001.png')}
      imageStyle={{ height: '83%' }}
      borderWidth={4}
      borderRadius={20}
      resizeMode='cover'
      style={styles.container}
    >
      <StatusBar 
        networkActivityIndicatorVisible={true}
        showHideTransition={'slide'}
      />
      <View style={styles.titleWrapper}>
        <Text style={styles.universityOfUtah}>
          THE UNIVERSITY OF UTAH'S
        </Text>
        <Title 
          title="RoommateFinder"
          color={colors.accent}
          fontSize={verticalScale(28)}
          style={{ alignSelf:'center' }}
        />
      </View>

      <View 
        resizeMode='cover'
        // imageStyle={{ 
        //   marginRight:100, 
        //   marginTop:100,
        //   // transform: [{rotate: '180deg'}] 
        // }}
        style={styles.actionWrapper}
      >
        <CustomButton
          onClick={() => navigation.navigate('signin')}
          style={styles.actionButton}
        >
          <CustomText style={styles.actionText}>
            Sign in
          </CustomText>
        </CustomButton>
        <CustomButton
          onClick={() => navigation.navigate('signup')}
          style={styles.actionButton}
        >
          <CustomText style={styles.actionText}>
            Get Started
          </CustomText>
        </CustomButton>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: { 
    flex:1, 
    backgroundColor:colors.secondary 
    // backgroundColor:'#ADA852'
  },
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
    fontSize:verticalScale(15),
    alignSelf:'center',
    marginVertical:verticalScale(10),
  },
  actionWrapper: {
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
    paddingTop:verticalScale(15),
    // borderTopLeftRadius:20,
    // borderTopRightRadius:20,
    // borderRadius:20,
    paddingBottom:verticalScale(35),
    flexDirection:'column',
    gap:verticalScale(14),
    // backgroundColor:colors.secondary,
    paddingHorizontal:moderateScale(35),
    // borderWidth:2,
    // alignItems:'center'
    // opacity:0.8
  },
  actionButton: {
    borderWidth:2,
    borderColor:colors.tint,
    backgroundColor:colors.accent,
    borderRadius:0,
    shadowColor: '#222',
    shadowOffset: { width: 7, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 1,  
  },
  actionText: {
    fontSize:verticalScale(16), 
    fontWeight:'600', 
    color:colors.white,
  }
})