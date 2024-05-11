import { 
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import { launchImageLibrary } from "react-native-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import Thumbnail from "../components/Thumbnail";
import useGlobal from '../core/global';
import { colors as c } from "../assets/config";


function ProfileImage({ colors, theme }) {

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
          backgroundColor: colors.tint === '#f9fafb' ? colors.secondary : colors.tertiary,
          width:40,
          height:40,
          borderRadius:20,
          alignItems:'center',
          justifyContent:'center',
          borderWidth:3,
          borderColor: colors.primary,
        }}
      >
        <FontAwesomeIcon 
          icon='pencil'
          size={15}
          color='#f9fafb'
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
        paddingHorizontal:26,
        backgroundColor:colors.accent,
        marginTop:20
      }}
    >
      <FontAwesomeIcon 
        icon='right-from-bracket'
        size={20}
        color='#fff'
        style={{ marginRight:12 }}
      />
      <Text style={{ fontWeight:'600', fontSize:18, color:'#fff', fontFamily:'NotoSans_Condensed-Regular' }}>Logout</Text>
    </TouchableOpacity>
  )
}

export default function ProfileScreen() {

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
          marginBottom:6,
          fontFamily:'NotoSans_Condensed-Regular'
        }}
      >
        {user.name}
      </Text>

      <TouchableOpacity
        style={{
          flexDirection:'row',
          height:52,
          borderRadius:26,
          alignItems:'center',
          justifyContent:'center',
          paddingHorizontal:26,
          marginTop: 20
        }}
      >
        <View style={{ marginRight:12, padding:8, backgroundColor:activeColors.secondary, borderRadius:25 }}>
          <FontAwesomeIcon 
            icon='id-badge'
            size={25}
            color={activeColors.tint}
          />
        </View>
        <Text style={{ fontWeight:'500', color:activeColors.tint, fontSize:19, fontFamily:'NotoSans_Condensed-Regular' }}>Profile</Text>
      </TouchableOpacity>

      <ProfileLogout colors={activeColors} />

    </View>
  )
} 