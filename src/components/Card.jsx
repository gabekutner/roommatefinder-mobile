import React, { useEffect } from 'react';
import { 
  View,
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';

import useGlobal from '../core/global';
import { interestsData, dormsData } from '../assets/Dictionary';


export default function CardItem({ navigation, item, colors }) {

  const requestConnect = useGlobal(state => state.requestConnect)

  useEffect(() => {
    console.log(item.id)
  }, [item])

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{ uri: item.thumbnail }}
        style={{
          height: moderateVerticalScale(250),
          width: '100%',
          resizeMode: 'cover',
          borderRadius: moderateScale(10),
          borderBottomWidth: 1,
          borderColor: colors.tertiary
        }}
      />
      <TouchableOpacity 
        onPress={() => requestConnect(item.id)}
        style={{ 
          position:'absolute',
          top:10,
          right:10,
          backgroundColor:colors.primary,
          width:42,
          height:42,
          borderRadius:21,
          justifyContent:'center',
          alignItems:'center'
        }}
      >
        <FontAwesomeIcon 
          icon="plus"
          size={22}
          color={colors.accent}
        />
      </TouchableOpacity>

      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: moderateVerticalScale(10) }}>
        <Text style={{ color: colors.tint, fontSize: moderateVerticalScale(17), fontWeight: 'bold' }}>{item.name}</Text>
        <Text style={{ color: colors.tertiary, fontSize: moderateVerticalScale(14) }}>{dormsData[item.dorm_building - 1].dorm}</Text>
        <Text style={{ color: colors.tertiary, fontSize: moderateVerticalScale(14) }}>San Francisco, CA</Text>
      </View>

      <View style={{ marginTop: moderateVerticalScale(10), justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <View style={[styles.section, { borderColor: colors.tertiary }]}>
          <FontAwesomeIcon
            icon="birthday-cake"
            size={moderateVerticalScale(22)}
            color={colors.tertiary}
          />
          <Text style={{ color: colors.tertiary, fontSize: moderateVerticalScale(14) }}>{item.age}</Text>
        </View>

        <View style={[styles.section, { borderBottomWidth: 0.5, borderColor: colors.tertiary }]}>
          <FontAwesomeIcon
            icon="heart"
            size={moderateVerticalScale(22)}
            color={colors.tertiary}
          />
          {item.interests.slice(0, 2).map((i) => (
            <View
              key={i}
              style={{
                padding: moderateScale(8),
                backgroundColor: colors.secondary,
                borderRadius: moderateScale(5),
                borderWidth: 1,
                borderColor: colors.accent,
                width: '40%',
                alignItems: 'center'
              }}
            >
              <Text style={{ color: colors.tint, fontSize: moderateVerticalScale(14), flexWrap: 'wrap' }}>{interestsData[i - 1].interest}</Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('swipe-profile', { profile: item })}
        style={{
          paddingVertical: moderateVerticalScale(10),
          paddingHorizontal: moderateScale(25),
          backgroundColor: colors.accent,
          borderRadius: moderateScale(12),
          marginHorizontal: moderateScale(30),
          marginBottom: moderateVerticalScale(20), // Adjusted margin bottom
          alignItems: 'center'
        }}
      >
        <Text style={{ fontSize: moderateVerticalScale(16), color: colors.constWhite, fontWeight: 'bold' }}>View Full Profile</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    width: '90%',
    borderTopWidth: 0.5,
    paddingVertical: moderateVerticalScale(7),
    paddingHorizontal: moderateScale(7),
    flexDirection: 'row',
    gap: moderateScale(15),
    alignItems: 'center'
  }
})
