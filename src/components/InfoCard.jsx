import React from 'react';
import { 
  Dimensions,
  StyleSheet, 
  View 
} from 'react-native';

import { 
  verticalScale, 
  moderateScale 
} from 'react-native-size-matters';

import CustomText from './UI/Custom/CustomText';
import { dormsData } from '../assets/Dictionary';
const { width } = Dimensions.get('window');


export default function InfoCard(props) {
  const { name, age, dorm, colors } = props

  return (
    <View
      style={{ 
        ...styles.cardShadow, 
        backgroundColor:colors.primary, 
        maxWidth:width * .6, 
        zIndex:1,
        borderWidth:3,

      }}>
      <View style={styles.textContainer}>
        <CustomText style={[styles.name, { color:colors.tint }]}>{`${name}, ${age}`}</CustomText>
      </View>
      <View style={styles.infoContainer}>
        <CustomText style={{ fontSize: verticalScale(20) }}>🏡</CustomText>
        <CustomText style={[styles.text, { color:colors.tint }]}>{dormsData[dorm-1].dorm}</CustomText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 12,
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(6),
    marginVertical: verticalScale(13),
    marginHorizontal: moderateScale(13),
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  textContainer: {
    marginVertical: verticalScale(.5),
    padding:verticalScale(6),
  },
  name: {
    fontStyle: 'normal',
    fontSize: verticalScale(16),
    fontWeight: '600',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(1),
    justifyContent: 'flex-start',
    padding:verticalScale(6),
  },
  text: {
    fontStyle: 'normal',
    fontSize: verticalScale(15),
    marginLeft: moderateScale(8),
  },
})
