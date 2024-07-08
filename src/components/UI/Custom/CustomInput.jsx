// Custom TextInput component
import React from "react";
import { TextInput, View } from "react-native";

import { moderateScale, verticalScale } from "react-native-size-matters";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import CustomText from "./CustomText";



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
  emoji,
  icon,
  iconColor,
  iconSize,
  iconStyle,
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
        shadowColor: '#000',
        shadowOffset: { 
          width: 1.5, 
          height: 2 
        },
        shadowOpacity: .7,
        shadowRadius: .6, 
        height:verticalScale(50),
        borderWidth:2,
        borderRadius:12,
        marginBottom:verticalScale(20),
        paddingRight:moderateScale(45),
        ...containerStyle,
      }}
    >
      { emoji 
        ? <CustomText style={{ paddingHorizontal:moderateScale(15), fontSize:verticalScale(18) }}>{emoji}</CustomText>
        : icon ? <FontAwesomeIcon icon={icon} size={iconSize ? verticalScale(iconSize) : verticalScale(16)} color={iconColor} style={{ marginHorizontal:moderateScale(12), ...iconStyle }} /> : null
      }
      
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
          fontWeight:'500',
          width:'100%',
          borderColor:colors.tint,
          paddingRight: moderateScale(10),
          paddingLeft: moderateScale(5),
          color: colors.tint,
          fontSize:verticalScale(14),
          ...inputStyle
        }}
      />
    </View>
  )
}