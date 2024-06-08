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
  keyboardAppearance, // str
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
      keyboardAppearance={keyboardAppearance}
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
        fontSize:18,
        fontWeight:'500',
        // borderWidth:1,
        borderColor:colors.tint,
        shadowColor: '#222',
        shadowOffset: { width: 7, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 1,  
        ...style
      }}
    />
  )
}