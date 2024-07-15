import React from 'react';
import {View, ImageBackground} from 'react-native';

import Title from '../../components/Brand/Title';
import CustomText from '../../components/UI/Custom/CustomText';

import {colors} from '../../constants/colors';
import {styles} from './SplashScreen.styles';


const Container = props => {
  return (
    <ImageBackground
      source={require('../../assets/images/image_part_003.png')}
      imageStyle={{ opacity: 0.6 }}
      style={[styles.container, {backgroundColor: 'rgba(0,0,0,.6)' }]}
    >
      {props.children}
    </ImageBackground>
  );
};

const HeaderTitle = () => {
  return (
    <View style={styles.container}>
      <View>
        <View 
          style={[
            styles.wrapper, 
            styles.title,
            {backgroundColor: colors.primary}
          ]}
        >
          <Title 
            title='roommatefinder'
            color={colors.tint}
            style={{textAlign:'center'}}
          />
        </View>
      </View>
    </View>
  );
};

const Version = props => {
  return (
    <View 
      style={[
        styles.container, 
        {
          justifyContent: 'flex-end',
          marginBottom:25
        }
      ]}
    >
      <View 
        style={[
          styles.wrapper, 
          styles.version,
          {backgroundColor: colors.primary}
        ]}
      >
        <CustomText 
          fontSize="large" 
          style={[
            styles.text,
            {color: colors.tint}
          ]}
        >
          {props.version}
        </CustomText>
      </View>
    </View>
  );
};


export {Container, HeaderTitle, Version}