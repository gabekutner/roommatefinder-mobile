import { 
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import { launchImageLibrary } from "react-native-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import Thumbnail from "../components/Thumbnail";
import useGlobal from '../core/global';
import Colors from "../assets/Colors";


function ProfileImage() {

  const uploadThumbnail = useGlobal(state => state.uploadThumbnail)
  const image = useGlobal(state => state.image)
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
			/>
      <View
        style={{
          position:"absolute",
          bottom:0,
          right:0,
          backgroundColor:'#202020',
          width:40,
          height:40,
          borderRadius:20,
          alignItems:'center',
          justifyContent:'center',
          borderWidth:3,
          borderColor:'#fff'
        }}
      >
        <FontAwesomeIcon 
          icon='pencil'
          size={15}
          color="#d0d0d0"
        />
      </View>
    </TouchableOpacity>
  )
}


function ProfileLogout() {

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
        backgroundColor:Colors.utahRedRocks,
        marginTop: 20
      }}
    >
      <FontAwesomeIcon 
        icon='right-from-bracket'
        size={20}
        color={Colors.bg}
        style={{ marginRight:12 }}
      />
      <Text style={{ fontWeight:'500', color:Colors.bg }}>Logout</Text>
    </TouchableOpacity>
  )
}

export default function ProfileScreen() {

  const user = useGlobal(state => state.user)

  return (
    <View
      style={{
        flex:1,
        alignItems:'center',
        paddingTop:100,
      }}
    >
      <ProfileImage />
      <Text
        style={{
          textAlign:'center',
          color:Colors.labelBlack,
          fontSize:20,
          fontWeight:'500',
          marginBottom:6,
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
        <View style={{ marginRight:12, padding:8, backgroundColor:Colors.lightGrey, borderRadius:25 }}>
          <FontAwesomeIcon 
            icon='id-badge'
            size={25}
            color={Colors.labelBlack}
          />
        </View>
        
        <Text style={{ fontWeight:'500', color:Colors.labelBlack, fontSize:19 }}>Profile</Text>
      </TouchableOpacity>

      <ProfileLogout />
    </View>
  )
} 