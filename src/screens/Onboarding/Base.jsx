import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View
} from 'react-native';

import { moderateScale, verticalScale } from 'react-native-size-matters';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import CustomButton from '../../components/UI/Custom/CustomButton';
import CustomText from '../../components/UI/Custom/CustomText';

import useGlobal from '../../core/global';
import { colors as c } from '../../assets/config';


export default function Base({ 
  navigation, 
  children, 
  next, 
  label,
  buttonLabel,
  onActionPress,
}) {

  const theme = useGlobal(state => state.theme)
  const colors = c[theme]

  return (
    <SafeAreaView
      style={{
        flex:1,
        backgroundColor:colors.accentDark
      }}
    >
      <StatusBar barStyle={'light-content'}/>
      <CustomButton
        onClick={() => navigation.goBack()}
        style={{
          marginLeft:moderateScale(20),
          width:50,
          height:50,
          borderWidth:2,
          borderColor:colors.constBlack,
          borderRadius:0,
          backgroundColor:colors.accentDark,
          shadowColor: '#222',
          shadowOffset: { width: 7, height: 5 },
          shadowOpacity: 1,
          shadowRadius: 1,  
          alignSelf:'flex-start',
          marginTop:verticalScale(25)
        }}
      >
        <FontAwesomeIcon 
          icon='arrow-left'
          size={22}
          color={colors.constWhite}
        />
      </CustomButton>
      <View style={{ marginVertical:verticalScale(75) }}>
        <CustomText
          style={{
            alignSelf:'center',
            textAlign:'center',
            marginHorizontal:moderateScale(40),
            fontSize:verticalScale(16),
            fontWeight:'500',
            color:colors.wasatchSun,
            textShadowColor:'#222',
            textShadowRadius:10,
            textShadowOffset: [{ width:15, height:15 }],
            marginBottom:verticalScale(15),
          }}
        >
          {label}
        </CustomText>
        {children}
        <CustomButton
          onClick={onActionPress ? () => onActionPress(false) : () => navigation.navigate(next)}
          style={{
            marginVertical:100,
            width:200,
            borderWidth:2,
            borderColor:colors.constBlack,
            borderRadius:0,
            backgroundColor:colors.accentDark,
            shadowColor: '#222',
            shadowOffset: { width: 7, height: 5 },
            shadowOpacity: 1,
            shadowRadius: 1,  
            alignSelf:'center'
          }}
        >
          <CustomText
            style={{
              fontSize:verticalScale(15),
              fontWeight:'600',
              color:colors.constWhite,
            }}
          >
            {buttonLabel}
          </CustomText>
        </CustomButton>
      </View>
    </SafeAreaView>
  )
}