import { 
  View, 
  TouchableOpacity,
  Text,
} from "react-native";

import styles from '../styles/auth';


export default function Button(props) {
  return (
    <View style={styles.buttonWrapper}>
      <TouchableOpacity 
        onPress={props.onButtonPress}>
        <View style={[styles.button, { backgroundColor:props.colors.accent }]}>
          <Text style={[styles.buttonText, { fontFamily:'NotoSans_Condensed-Regular', color:'#f9fafb' }]}>{props.buttonText}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop:30 }} onPress={props.onLinkPress}>
        <Text style={[styles.navigateToOppositeText, { fontFamily:'NotoSans_Condensed-Regular', color:props.colors.tertiary }]}>
          {props.linkQuestion}{' '}
          {/* check again, if tertiary is d1d5db (dark) then color is .tint else 405DE6 */}
          <Text style={{ textDecorationLine:'underline', color:props.colors.tertiary === '#d1d5db' ? props.colors.tint : '#405DE6', fontFamily:'NotoSans_Condensed-Regular' }}>{props.linkDirectTo}</Text>
        </Text>
      </TouchableOpacity>
    </View>
  )
}