import { 
  View, 
  Text, 
  TextInput,
} from "react-native";

import Colors from "../assets/Colors";
import styles from '../styles/auth';


export default function Input(props) {
  return (
    <View style={styles.inputFieldWrapper}>
      <Text style={[styles.inputFieldLabel, { fontFamily:'NotoSans_Condensed-Regular' }]}>
        { props.label }
      </Text>
      <TextInput 
        editable={props.editable}
        secureTextEntry={props.secureTextEntry}
        autoCapitalize={props.autoCapitalize}
        autoCorrect={props.autoCorrect}
        keyboardType={props.keyboardType}
        placeholder={props.placeholder}
        placeholderTextColor={Colors.lightGrey}
        style={[styles.inputField, { fontFamily:'NotoSans_Condensed-Regular' }]}
        value={props.value}
        onChangeText={props.onChangeText}
        onPress={props.onPress}
      />
    </View>
  )
}