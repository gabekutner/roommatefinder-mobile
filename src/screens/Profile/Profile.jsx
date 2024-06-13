import React from 'react';
import { 
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

import { launchImageLibrary } from "react-native-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { 
  verticalScale, 
  moderateScale, 
  scale
} from 'react-native-size-matters';

import CustomButton from '../../components/UI/Custom/CustomButton';
import CustomText from '../../components/UI/Custom/CustomText';
import Thumbnail from "../../components/Thumbnail";

import useGlobal from '../../core/global';
import { colors } from '../../constants/colors';
import { dormsData } from '../../assets/Dictionary';


function ProfileImage({ user, colors }) {

  const uploadThumbnail = useGlobal(state => state.uploadThumbnail)

  return (
    <TouchableOpacity
      style={{ marginBottom:20 }}
      onPress={() => {
        launchImageLibrary({ includeBase64:true, }, (response) => {
          if (response.didCancel) return
          const file = response.assets[0]
          uploadThumbnail(file)
        })
      }}
    >
      <Thumbnail
				url={user.thumbnail}
				size={verticalScale(123)}
        borderColor={colors.secondary}
        style={{ borderWidth:2 }}
			/>
      <View
        style={{
          position:"absolute",
          bottom:0,
          right:0,
          backgroundColor:colors.secondary, //'#E8ECF4'
          width:40,
          height:40,
          borderRadius:20,
          alignItems:'center',
          justifyContent:'center',
          borderWidth:3,
          borderColor:colors.primary,
        }}
      >
        <FontAwesomeIcon 
          icon='pencil'
          size={15}
          color={colors.tint}
        />
      </View>
    </TouchableOpacity>
  )
}

function ProfileLogout({ colors }) {
  const logout = useGlobal(state => state.logout)
  return (
    <CustomButton
      onClick={() => logout()}
      style={{
        flexDirection:'row',
        backgroundColor:colors.accent,
        paddingHorizontal:moderateScale(22),
        alignItems:'center',
        justifyContent:'center',
        marginTop:verticalScale(25),
      }}
    >
      <FontAwesomeIcon 
        icon='right-from-bracket'
        size={verticalScale(15)}
        color={colors.white}
        style={{ marginRight:moderateScale(10) }}
      />
      <CustomText 
        style={{ 
          fontWeight:'600', 
          fontSize:verticalScale(15), 
          color:colors.white 
        }}
      >
        Logout
      </CustomText>
    </CustomButton>
  )
}

export default function ProfileScreen({ navigation }) {
  const user = useGlobal(state => state.user)

  return (
    <ScrollView style={{ flex:1, backgroundColor:colors.primary }}>
      <View style={{ alignItems:'center', paddingTop:verticalScale(15) }}>
        {/* Profile Header */}
        <ProfileImage user={user} colors={colors} />
        <CustomText
          style={{
            textAlign:'center',
            color:colors.tint,
            fontSize:verticalScale(16),
            fontWeight:'bold',
            marginBottom:verticalScale(3),
          }}
        >
          {user.name}
        </CustomText>
        <CustomText
          style={{
            textAlign:'center',
            color:colors.tint,
            fontSize:verticalScale(14),
            fontWeight:'500',
            marginBottom:verticalScale(6),
          }}
        >
          🏠 {dormsData[user.dorm_building-1].dorm}
        </CustomText>

        <View style={{ ...styles.keyData, marginTop:verticalScale(6) }}>
          <View style={styles.keyDataOption}>
            <CustomText style={styles.keyDataText}>{user.age} yo</CustomText>
            <CustomText style={{ ...styles.keyDataText, fontSize:verticalScale(11) }}>Age</CustomText>
          </View>
          <View style={styles.keyDataDivider} />
          <View style={styles.keyDataOption}>
            <CustomText style={styles.keyDataText}>{user.state}</CustomText>
            <CustomText style={{ ...styles.keyDataText, fontSize:verticalScale(11) }}>State</CustomText>
          </View>
          <View style={styles.keyDataDivider} />
          <View style={styles.keyDataOption}>
            <CustomText style={styles.keyDataText}>{user.graduation_year}</CustomText>
            <CustomText style={{ ...styles.keyDataText, fontSize:verticalScale(11) }}>Grad Year</CustomText>
          </View>
        </View>

        <View style={styles.navOptions}>
          <CustomButton onClick={() => navigation.navigate('social-battery')} style={styles.navBox}>
            <CustomText style={{ fontSize:verticalScale(20) }}>🚀</CustomText>
            <CustomText style={{ fontSize:verticalScale(12), fontWeight:'bold' }}>
              Retake Quiz
            </CustomText>
          </CustomButton>
          <CustomButton onClick={() => navigation.navigate('settings')} style={styles.navBox}>
            <CustomText style={{ fontSize:verticalScale(20) }}>🕹️</CustomText>
            <CustomText style={{ fontSize:verticalScale(12), fontWeight:'bold' }}>
              Settings
            </CustomText>
          </CustomButton>
        </View>
        <View style={{ ...styles.navOptions, marginTop:verticalScale(10) }}>
          <CustomButton onClick={() => navigation.navigate('edit-profile')} style={styles.navBox}>
            <CustomText style={{ fontSize:verticalScale(20) }}>💥</CustomText>
            <CustomText style={{ fontSize:verticalScale(12), fontWeight:'bold' }}>
              Edit Profile
            </CustomText>
          </CustomButton>
          <CustomButton onClick={() => {}} style={styles.navBox}>
            <CustomText style={{ fontSize:verticalScale(20) }}>👀</CustomText>
            <CustomText style={{ fontSize:verticalScale(12), fontWeight:'bold' }}>
              Preview
            </CustomText>
          </CustomButton>
        </View>

        <ProfileLogout colors={colors} />

      </View>
    </ScrollView>
  )
} 


const styles = StyleSheet.create({
  keyData: {
    flexDirection:'row',
    gap:moderateScale(8)
  },
  keyDataOption: {
    width:scale(70),
    height:scale(50),
    alignItems:'center',
    justifyContent:'center',
  },
  keyDataDivider: {
    height:"100%",
    backgroundColor:colors.secondary,
    width:2,
    borderRadius:5
  },
  keyDataText: {
    fontSize:verticalScale(13),
    fontWeight:'500'
  },
  // navigation options
  navOptions: {
    marginTop:verticalScale(25),
    flexDirection:'row',
    gap:moderateScale(10)
  },
  navBox: {
    width:moderateScale(150),
    backgroundColor:colors.secondary,
    borderWidth:0,
    justifyContent:'space-between',
    paddingLeft:moderateScale(5),
    paddingRight:moderateScale(17)
  }
})