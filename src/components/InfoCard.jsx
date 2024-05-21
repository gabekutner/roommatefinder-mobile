import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';

import { verticalScale, moderateScale } from 'react-native-size-matters';

import { dormsData } from '../assets/Dictionary';



export default function InfoCard(props) {
  const { name, age, dorm, colors } = props

  return (
    <View style={{ ...styles.cardShadow, backgroundColor:colors.secondary }}>
      <View style={styles.textContainer}>
        <Text style={[styles.name, { color:colors.tint }]}>{`${name}, ${age}`}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={{ fontSize: 16 }}>🏡</Text>
        <Text style={[styles.text, { color:colors.tertiary }]}>{dormsData[dorm-1].dorm}</Text>
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
    borderRadius: 20,
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
    fontSize: verticalScale(14),
    marginLeft: moderateScale(8),
  },
})