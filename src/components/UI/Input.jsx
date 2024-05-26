import React from "react";
import { 
  View, 
  TextInput,
} from "react-native";

import CustomText from "./Custom/CustomText";
import styles from '../../styles/auth';


export default function Input(props) {
  return (
    <View style={styles.inputFieldWrapper}>
      <CustomText style={[styles.inputFieldLabel, { color:props.colors.tint }]}>
        { props.label }
      </CustomText>
      <TextInput 
        editable={props.editable}
        secureTextEntry={props.secureTextEntry}
        autoCapitalize={props.autoCapitalize}
        autoCorrect={props.autoCorrect}
        keyboardType={props.keyboardType}
        placeholder={props.placeholder}
        placeholderTextColor={props.colors.tertiary}
        style={[styles.inputField, { 
          fontFamily:'NotoSans_Condensed-Regular', 
          color:props.colors.tint, 
          backgroundColor:props.colors.secondary, 
          borderColor:props.colors.tertiary,
          width:props.width,
          height:props.height,
          paddingTop:props.paddingTop
        }]}
        value={props.value}
        onChangeText={props.onChangeText}
        onPress={props.onPress}
        multiline={props.multiline}
        keyboardAppearance={props.keyboardAppearance}
      />
    </View>
  )
}