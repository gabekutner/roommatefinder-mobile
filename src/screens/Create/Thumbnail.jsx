import {
  TouchableOpacity
} from 'react-native';

import { launchImageLibrary } from "react-native-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";



export default function Thumbnail({ colors }) {
  return (
    <TouchableOpacity
      style={{
        width:180, 
        height:180, 
        borderRadius:90,
        backgroundColor:'transparent',
        borderWidth:1,
        borderColor:colors.tertiary,
        borderStyle:'dashed',
        justifyContent:'center'
      }}
      onPress={() => {
        launchImageLibrary({ includeBase64:true, }, (response) => {
          if (response.didCancel) return
          const file = response.assets[0]
          // set thumbnail here
        })
      }}
    >
      <FontAwesomeIcon 
        icon="image"
        size={25}
        color={colors.tertiary}
        style={{ alignSelf:'center' }}
      />
    </TouchableOpacity>
  )
}