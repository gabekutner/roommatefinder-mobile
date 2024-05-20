import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { moderateVerticalScale, moderateScale } from 'react-native-size-matters';

import useGlobal from '../../core/global';
import { colors as c } from '../../assets/config';
import { dormsData, interestsData } from '../../assets/Dictionary';


export default function SwipeProfile({ route, navigation }) {

  const { profile } = route.params
  const requestConnect = useGlobal(state => state.requestConnect)
  const theme = useGlobal(state => state.theme)
  const colors = c[theme]

  return (
    <ScrollView style={{ flex:1, backgroundColor:colors.primary }}>

      <Image
        source={{ uri: profile.thumbnail }}
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
        onPress={() => requestConnect(profile.id)}
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

      {/* 
      ###-- profile attrs
      #-- mandatory     #-- custom
      - name            - instagram
      - age             - snapchat
      - sex             - major
      - dorm            - city
      - interests       - state
      - thumbnail       - bio
                        - graduation year
      */}

      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: moderateVerticalScale(10) }}>
        <Text style={{ color: colors.tint, fontSize: moderateVerticalScale(17), fontWeight: 'bold' }}>{profile.name}</Text>
        <Text style={{ color: colors.tertiary, fontSize: moderateVerticalScale(14) }}>{dormsData[profile.dorm_building - 1].dorm}</Text>
        { profile.city && profile.state 
          ? <Text style={{ color: colors.tertiary, fontSize: moderateVerticalScale(14) }}>{profile.city}, {profile.state}</Text>
          : <></>  
        }
      </View>

      <View style={{ marginTop: moderateVerticalScale(25), justifyContent: 'center', alignItems: 'center' }}>
        <View style={[styles.section, { borderColor: colors.tertiary }]}>
          <FontAwesomeIcon
            icon="birthday-cake"
            size={moderateVerticalScale(22)}
            color={colors.tertiary}
          />
          <Text style={{ color: colors.tertiary, fontSize: moderateVerticalScale(14) }}>{profile.age}</Text>
        </View>

        <View style={[styles.section, { borderColor: colors.tertiary, flexWrap:'wrap' }]}>
          <FontAwesomeIcon
            icon="heart"
            size={moderateVerticalScale(22)}
            color={colors.tertiary}
          />
          {profile.interests.map((i) => (
            <View
              key={i}
              style={{
                padding: moderateScale(8),
                backgroundColor: colors.secondary,
                borderRadius: moderateScale(5),
                borderWidth: 1,
                borderColor: colors.accent,
                alignItems: 'center'
              }}
            >
              <Text style={{ color: colors.tint, fontSize: moderateVerticalScale(14), flexWrap: 'wrap' }}>{interestsData[i - 1].interest}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.section, { borderColor: colors.tertiary }]}>
          <FontAwesomeIcon
            icon="graduation-cap"
            size={moderateVerticalScale(22)}
            color={colors.tertiary}
          />
          <Text style={{ color: colors.tertiary, fontSize: moderateVerticalScale(14) }}>{profile.major}</Text>
        </View>
        
        { profile.instagram 
          ? 
            <View style={[styles.section, { borderColor: colors.tertiary }]}>
              <FontAwesomeIcon
                icon="camera"
                size={moderateVerticalScale(22)}
                color={colors.tertiary}
              />
              <Text style={{ color: colors.tertiary, fontSize: moderateVerticalScale(14) }}>{profile.instagram}</Text>
            </View>
          : <></>
        }

        { profile.snapchat 
          ? 
            <View style={[styles.section, { borderColor: colors.tertiary }]}>
              <FontAwesomeIcon
                icon="ghost"
                size={moderateVerticalScale(22)}
                color={colors.tertiary}
              />
              <Text style={{ color: colors.tertiary, fontSize: moderateVerticalScale(14) }}>{profile.snapchat}</Text>
            </View>
          : <></>
        }

        { profile.city && profile.state 
          ? 
            <View style={[styles.section, { borderColor: colors.tertiary }]}>
              <FontAwesomeIcon
                icon="location-dot"
                size={moderateVerticalScale(22)}
                color={colors.tertiary}
              />
              <Text style={{ color: colors.tertiary, fontSize: moderateVerticalScale(14) }}>{profile.city}, {profile.state}</Text>
            </View>
          : <></>
        }

        { profile.graduation_year
          ? 
            <View style={[styles.section, { borderColor: colors.tertiary }]}>
              <FontAwesomeIcon
                icon="calendar-days"
                size={moderateVerticalScale(22)}
                color={colors.tertiary}
              />
              <Text style={{ color: colors.tertiary, fontSize: moderateVerticalScale(14) }}>{profile.graduation_year}</Text>
            </View>
          : <></>
        }

        { profile.description
          ? 
            <View style={[styles.section, { borderColor: colors.tertiary }]}>
              <FontAwesomeIcon
                icon="circle-info"
                size={moderateVerticalScale(22)}
                color={colors.tertiary}
              />
              <Text style={{ color: colors.tertiary, fontSize: moderateVerticalScale(14) }}>{profile.description}</Text>
            </View>
          : <></>
        }

        
        <View style={{ borderColor:colors.tertiary, borderWidth:.5, width:'90%' }} />


        
        
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  section: {
    width: '90%',
    borderTopWidth: 0.5,
    paddingVertical: moderateVerticalScale(10),
    paddingHorizontal: moderateScale(10),
    flexDirection: 'row',
    gap: moderateScale(15),
    alignItems: 'center'
  }
})