import React from 'react';
import { 
  View, 
  StatusBar,
  ImageBackground,
} from 'react-native';

import Title from '../components/Brand/Title';
import CustomText from '../components/UI/Custom/CustomText';
import CustomButtonComponent from '../components/Button/CustomButtonComponent';

import { colors } from '../constants/colors';
import { flex, position, spacing } from '../styles/styles';


export default function StartupScreen({ navigation }) {
  return (
    <ImageBackground 
      source={require('../assets/images/image_part_001.png')}
      imageStyle={[
        flex.flex1,
        position.pAbsolute,
        { opacity:.6, top:-100 }
      ]}
      resizeMode='cover'
      style={[
        flex.flex1,
        { backgroundColor:'rgba(0,0,0,.45)' }
      ]}
    >
      <StatusBar
        networkActivityIndicatorVisible={true}
        showHideTransition={'slide'}
      />
      <View 
        style={[
          flex.flex1,
          flex.justifyContentCenter,
          flex.alignItemsCenter
        ]}
      >
        <Title 
          title="roommatefinder"
          color={colors.accent}
        />
      </View>

      <View 
        style={[
          flex.flex2, 
          flex.justifyContentEnd,
          spacing.gap2
        ]}
      >
        <CustomButtonComponent 
          variant='standard' 
          shadow 
          animated 
          style={spacing.mh5}
          onClick={() => navigation.navigate('signup')}
        >
          <CustomText fontSize="large" style={{ fontWeight:'bold', color:colors.white }}>Get Started</CustomText>
        </CustomButtonComponent>
        <CustomButtonComponent 
          animated 
          style={{
            ...spacing.mb5,
            ...spacing.mh5,
            backgroundColor:'rgba(0,0,0,.6)'
          }}
          onClick={() => navigation.navigate('signin')}
        >
          <CustomText fontSize="large" style={{ fontWeight:'bold', color:colors.white }}>Already have an account? Log In</CustomText>
        </CustomButtonComponent>
      </View>
    </ImageBackground>

  )
}