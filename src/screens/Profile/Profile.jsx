import React from 'react';
import { 
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import { launchImageLibrary } from "react-native-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { verticalScale, moderateScale } from 'react-native-size-matters';

import Thumbnail from "../../components/Thumbnail";
import useGlobal from '../../core/global';
import { colors as c } from "../../assets/config";


function ProfileImage({ colors }) {

  const uploadThumbnail = useGlobal(state => state.uploadThumbnail)
  const user = useGlobal(state => state.user)

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
				size={180}
        borderColor={colors.secondary}
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
    <TouchableOpacity
      onPress={logout}
      style={{
        flexDirection:'row',
        height:52,
        borderRadius:26,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:moderateScale(22),
        backgroundColor:colors.accent,
        marginTop:verticalScale(18)
      }}
    >
      <FontAwesomeIcon 
        icon='right-from-bracket'
        size={20}
        color='#fff'
        style={{ marginRight:moderateScale(10) }}
      />
      <Text style={{ fontWeight:'600', fontSize:verticalScale(15), color:'#fff', fontFamily:'NotoSans_Condensed-Regular' }}>Logout</Text>
    </TouchableOpacity>
  )
}

export default function ProfileScreen({ navigation }) {

  const user = useGlobal(state => state.user)
  const theme = useGlobal(state => state.theme)
  let activeColors = c[theme]

  return (
    <View style={{ flex:1, alignItems:'center', paddingTop:100, backgroundColor:activeColors.primary }} >
      <ProfileImage colors={activeColors} />
      <Text
        style={{
          textAlign:'center',
          color:activeColors.tint,
          fontSize:20,
          fontWeight:'500',
          marginBottom:verticalScale(6),
          fontFamily:'NotoSans_Condensed-Regular'
        }}
      >
        {user.name}
      </Text>

      <View style={{ justifyContent:'flex-start' }}>

        <TouchableOpacity
          onPress={() => navigation.navigate('edit-profile')}
          style={{
            flexDirection:'row',
            height:verticalScale(52),
            borderRadius:26,
            alignItems:'center',
            paddingHorizontal:moderateScale(26),
            marginTop:verticalScale(15)
          }}
        >
          <View style={{ marginRight:moderateScale(11), padding:verticalScale(6), backgroundColor:activeColors.secondary, borderRadius:25 }}>
            <FontAwesomeIcon 
              icon='id-badge'
              size={verticalScale(20)}
              color={activeColors.tint}
            />
          </View>
          <Text style={{ fontWeight:'500', color:activeColors.tint, fontSize:verticalScale(15), fontFamily:'NotoSans_Condensed-Regular' }}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('settings')}
          style={{
            flexDirection:'row',
            height:verticalScale(52),
            borderRadius:26,
            alignItems:'center',
            paddingHorizontal:moderateScale(26),
            marginTop: moderateScale(5)
          }}
        >
          <View style={{ marginRight:moderateScale(11), padding:verticalScale(6), backgroundColor:activeColors.secondary, borderRadius:25 }}>
            <FontAwesomeIcon 
              icon='gear'
              size={verticalScale(20)}
              color={activeColors.tint}
            />
          </View>
          <Text style={{ fontWeight:'500', color:activeColors.tint, fontSize:verticalScale(15), fontFamily:'NotoSans_Condensed-Regular' }}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          // onPress={() => navigation.navigate('settings')}
          style={{
            flexDirection:'row',
            height:verticalScale(52),
            borderRadius:26,
            alignItems:'center',
            paddingHorizontal:moderateScale(26),
            marginTop: moderateScale(5)
          }}
        >
          <View style={{ marginRight:moderateScale(11), padding:verticalScale(6), backgroundColor:activeColors.secondary, borderRadius:25 }}>
            <FontAwesomeIcon 
              icon='camera'
              size={verticalScale(20)}
              color={activeColors.tint}
            />
          </View>
          <Text style={{ fontWeight:'500', color:activeColors.tint, fontSize:verticalScale(15), fontFamily:'NotoSans_Condensed-Regular' }}>Add photos</Text>
        </TouchableOpacity>

      </View>
      <ProfileLogout colors={activeColors} />
    </View>
  )
} 