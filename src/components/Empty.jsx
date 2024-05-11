import { 
  View,
  Text,
 } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";


export default function Empty({ icon, message, centered=true, colors }) {
  return (
    <View
      style={{
        flex:1,
        justifyContent:centered?'center' : 'flex-start',
        alignItems:'center',
        paddingVertical:120,
        backgroundColor:colors.primary,
      }}
    >
      <FontAwesomeIcon 
        icon={icon}
        color={colors.tertiary}
        size={90}
        style={{
          marginBottom:16,
        }}
      />
      <Text
        style={{
          color:colors.tertiary,
          fontSize:16,
          fontFamily:'NotoSans_Condensed-Regular',
        }}
      >
        {message}
      </Text>
    </View>
  )
}