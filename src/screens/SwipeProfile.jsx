import {
  Text,
  View,
} from 'react-native';



export default function SwipeProfile({ route, navigation }) {
  const { profile } = route.params

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text>{profile.name}</Text>
    </View>
  )
}