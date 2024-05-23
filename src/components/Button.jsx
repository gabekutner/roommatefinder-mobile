import { 
  View, 
  TouchableOpacity,
  Text,
} from "react-native";

import CustomText from "./UI/Custom/CustomText";

import styles from '../styles/auth';


export default function Button(props) {
  return (
    <View style={styles.buttonWrapper}>
      <TouchableOpacity 
        onPress={props.onButtonPress}>
        <View style={[styles.button, { backgroundColor:props.colors.accent, ...props.buttonStyle }]}>
          <CustomText style={[styles.buttonText, { color:'#f9fafb' }]}>{props.buttonText}</CustomText>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop:'7%' }} onPress={props.onLinkPress}>
        <CustomText style={[styles.navigateToOppositeText, { color:props.colors.tertiary }]}>
          {props.linkQuestion}{' '}
          {/* check again, if tertiary is d1d5db (dark) then color is .tint else 405DE6 */}
          <CustomText style={{ textDecorationLine:'underline', color:props.colors.tertiary === '#d1d5db' ? props.colors.tint : '#405DE6' }}>{props.linkDirectTo}</CustomText>
        </CustomText>
      </TouchableOpacity>
    </View>
  )
}