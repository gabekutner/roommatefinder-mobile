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
        <View style={styles.button}>
          <Text style={[styles.buttonText, { fontFamily:'NotoSans_Condensed-Regular' }]}>{props.buttonText}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop:30 }} onPress={props.onLinkPress}>
        <Text style={[styles.navigateToOppositeText, { fontFamily:'NotoSans_Condensed-Regular' }]}>
          {props.linkQuestion}{' '}
          <Text style={{ textDecorationLine:'underline', color:'#405DE6', fontFamily:'NotoSans_Condensed-Regular' }}>{props.linkDirectTo}</Text>
        </Text>
      </TouchableOpacity>
    </View>
  )
}