import { 
  View,
  Text,
 } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";


export default function Empty({ icon, message, centered=true }) {
  return (
    <View
      style={{
        flex:1,
        justifyContent:centered?'center' : 'flex-start',
        alignItems:'center',
        paddingVertical:120,
      }}
    >
      <FontAwesomeIcon 
        icon={icon}
        color='#d0d0d0'
        size={90}
        style={{
          marginBottom:16,
        }}
      />
      <Text
        style={{
          color:'#c3c3c3',
          fontSize:16,
        }}
      >
        {message}
      </Text>
    </View>
  )
}