import {
  View,
  Text
} from 'react-native';



export default function Interests({ route, navigation }) {
  const { form, setForm } = route.params

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text>Interests</Text>
    </View>
  )
}