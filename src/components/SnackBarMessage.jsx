import { useState, useEffect } from "react"; 
import {
  View,
  Text
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


export default function SnackBar({ colors, message, icon, type }) {

  return (
    <View 
      style={{ 
        position:'absolute', 
        top:0, 
        right:15, 
        left:15, 
        zIndex:5,
        backgroundColor:type === 'success' ? colors.green : colors.accent,
        flexDirection:'row',
        gap:15,
        padding:20,
        borderRadius:14,
        alignItems:'center',
      }}
    >
      <FontAwesomeIcon 
        icon={icon}
        size={22}
        color={type === 'error' ? activeColors.constWhite : activeColors.constBlack}
      />
      <Text style={{ fontSize:18, fontWeight:'bold', color:type === 'error' ? activeColors.constWhite : activeColors.constBlack }}>{message}</Text>
    </View>
  )
}

// ADD TO PARENT COMPONENT FOR SHOWING

// const [show, setShow] = useState(false)

// useEffect(() => {
//   if (show) {
//     const toRef = setTimeout(() => {
//       setShow(false)
//       clearTimeout(toRef)
//     }, 3000)
//   }
// }, [show])

// plus a button for setShow(false) / setShow(true)