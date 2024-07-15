import React from 'react';
import {
  Animated, 
  ImageBackground
} from 'react-native';

import Title from '../../components/Brand/Title';
import CustomText from '../../components/UI/Custom/CustomText';

import {colors} from '../../constants/colors';
import {styles} from './SplashScreen.styles';


const Container = props => {
  return (
    <ImageBackground
      source={require('../../assets/images/image_part_003.png')}
      style={styles.container}
    >
      {...props}
    </ImageBackground>
  );
};

const Title = props => {
  return (
    <View style={styles.wrapper}>
      <Animated.View style={{transform: [{ translateY: props.translateY }]}}>
        <View style={[styles.title, { backgroundColor: colors.primary }]}>
          <Title 
            title='roommatefinder'
            color={colors.tint}
            style={{textAlign:'center'}}
          />
        </View>
      </Animated.View>
    </View>
  );
};

const Version = props => {
  return (
    <View style={styles.wrapper}>
      <View 
        styles={[
          styles.versionContainer, 
          { backgroundColor:colors.primary }
        ]}
      >
        <CustomText 
          fontSize="large" 
          style={[
            styles.versionText,
            { color: colors.tint }
          ]}
        >
          {props.version}
        </CustomText>
      </View>
    </View>
  );
};


export default {Container, Title, Version}