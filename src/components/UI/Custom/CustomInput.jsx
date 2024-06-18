// Custom TextInput component
import React from "react";
import { 
  TextInput,
  View
} from "react-native";
import CustomText from "./CustomText";
import { verticalScale } from "react-native-size-matters";


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
  placeholderTextColor = colors.tint, // str
  secureTextEntry, // bool
  value, 
  emoji,
  containerStyle,
  inputStyle
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.secondary,
        shadowColor: '#222',
        shadowOffset: { width: 7, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 1, 
        height:verticalScale(55),
        borderWidth:2,
        marginBottom:verticalScale(20),
        ...containerStyle,
      }}
    >
      <CustomText style={{ paddingHorizontal:15, fontSize:verticalScale(18) }}>
        {emoji}
      </CustomText>
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
          fontSize:verticalScale(18),
          fontWeight:'500',
          width:'100%',
          borderColor:colors.tint,
          paddingTop: 10,
          paddingRight: 20,
          paddingBottom: 10,
          paddingLeft: 10,
          color: colors.tint,
          ...inputStyle
        }}
      />
    </View>
  )
}