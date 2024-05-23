// Custom TextInput component
import React from "react";
import { 
  TextInput
} from "react-native";


export default function CustomTextInput({
  colors,
  autoCapitalize, // bool
  autoComplete, // str
  autoCorrect, // bool
  defaultValue, // str
  editable, // bool
  inputMode, // str
  keyboardType, // str
  maxLength, // number
  multiline, // bool
  onChange,
  onChangeText,
  placeholder, // str
  placeholderTextColor = colors.tertiary, // str
  secureTextEntry, // bool
  value, 
  style,
}) {
  return (
    <TextInput 
      autoCapitalize={autoCapitalize}
      autoComplete={autoComplete}
      autoCorrect={autoCorrect}
      defaultValue={defaultValue}
      editable={editable}
      inputMode={inputMode}
      keyboardType={keyboardType}
      maxLength={maxLength}
      multiline={multiline}
      onChange={onChange}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      secureTextEntry={secureTextEntry}
      textAlign="left"
      value={value}
      style={{
        paddingHorizontal:20,
        height:55,
        borderRadius:12,
        fontSize:17,
        fontWeight:'500',
        borderWidth:1,
        borderColor:colors.tertiary,
        ...style
      }}
    />
  )
}