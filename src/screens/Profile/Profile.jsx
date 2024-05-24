import React from 'react';
import { 
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import { launchImageLibrary } from "react-native-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { verticalScale, moderateScale } from 'react-native-size-matters';

import CustomButton from '../../components/UI/Custom/CustomButton';
import CustomText from '../../components/UI/Custom/CustomText';
import Thumbnail from "../../components/Thumbnail";

import useGlobal from '../../core/global';
import { colors as c } from "../../assets/config";


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
    <CustomButton
      onClick={() => logout()}
      style={{
        flexDirection:'row',
        backgroundColor:colors.accent,
        paddingHorizontal:moderateScale(22),
        alignItems:'center',
        justifyContent:'center',
        marginTop:verticalScale(18)
      }}
    >
      <FontAwesomeIcon 
        icon='right-from-bracket'
        size={20}
        color='#fff'
        style={{ marginRight:moderateScale(10) }}
      />
      <CustomText 
        style={{ 
          fontWeight:'600', 
          fontSize:verticalScale(15), 
          color:colors.constWhite 
        }}
      >
        Logout
      </CustomText>
    </CustomButton>
  )
}

export default function ProfileScreen({ navigation }) {

  const user = useGlobal(state => state.user)
  const theme = useGlobal(state => state.theme)
  const colors = c[theme]

  return (
    <View 
      style={{ 
        flex:1, 
        alignItems:'center', 
        paddingTop:100, 
        backgroundColor:colors.primary 
      }} 
    >
      <ProfileImage user={user} colors={colors} />
      <CustomText
        style={{
          textAlign:'center',
          color:colors.tint,
          fontSize:20,
          fontWeight:'500',
          marginBottom:verticalScale(6),
        }}
      >
        {user.name}
      </CustomText>

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
          <View 
            style={{ 
              marginRight:moderateScale(11), 
              padding:verticalScale(6), 
              backgroundColor:colors.secondary, 
              borderRadius:25 
            }}
          >
            <FontAwesomeIcon 
              icon='id-badge'
              size={verticalScale(20)}
              color={colors.tint}
            />
          </View>
          <CustomText
            style={{
              fontWeight:'500', 
              color:colors.tint, 
              fontSize:verticalScale(15)
            }}
          >
            Profile
          </CustomText>
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
          <View 
            style={{ 
              marginRight:moderateScale(11), 
              padding:verticalScale(6), 
              backgroundColor:colors.secondary, 
              borderRadius:25 
            }}
          >
            <FontAwesomeIcon 
              icon='gear'
              size={verticalScale(20)}
              color={colors.tint}
            />
          </View>
          <CustomText
            style={{
              fontWeight:'500', 
              color:colors.tint, 
              fontSize:verticalScale(15)
            }}
          >
            Settings
          </CustomText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('photo-upload')}
          style={{
            flexDirection:'row',
            height:verticalScale(52),
            borderRadius:26,
            alignItems:'center',
            paddingHorizontal:moderateScale(26),
            marginTop: moderateScale(5)
          }}
        >
          <View 
            style={{ 
              marginRight:moderateScale(11), 
              padding:verticalScale(6), 
              backgroundColor:colors.secondary, 
              borderRadius:25 
            }}
          >
            <FontAwesomeIcon 
              icon='camera'
              size={verticalScale(20)}
              color={colors.tint}
            />
          </View>
          <CustomText
            style={{
              fontWeight:'500', 
              color:colors.tint, 
              fontSize:verticalScale(15)
            }}
          >
            Add Photos
          </CustomText>
        </TouchableOpacity>
      </View>
      <ProfileLogout colors={colors} />
    </View>
  )
} 