import React from "react";

import {View, TouchableOpacity, Touchable} from "react-native";

import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {TextInput} from "react-native-paper";
import {scale} from "react-native-size-matters";

import {styles} from "./messageInput.styles";


function MessageInput(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={{ 
          height: scale(55), 
          width: scale(55), 
          backgroundColor:props.theme.colors.primary,
          borderRadius: 18,
          justifyContent: 'center',
          alignItems: 'center'
        }} 
      >
        <FontAwesomeIcon icon={"plus"} size={25} color={props.theme.colors.secondary} />
      </TouchableOpacity>

			<TextInput
        mode="outlined"
        value={props.message}
        onChangeText={props.setMessage}
        
        placeholder="Write a message"
        placeholderTextColor={props.theme.colors.surfaceVariant}
        outlineColor={props.theme.colors.surfaceVariant}
        activeOutlineColor={props.theme.colors.primary}
        textColor={props.theme.colors.primary}

        style={{ flex:1, paddingRight:50 }}
      />
      <TouchableOpacity 
        style={{ 
          position:'absolute',
          right:15,
          bottom:15,
          height: scale(45), 
          width: scale(45), 
          backgroundColor:props.theme.colors.tertiary,
          borderRadius: 18,
          justifyContent: 'center',
          alignItems: 'center',

        }} 
      >
        <FontAwesomeIcon icon={"paper-plane"} size={25} color={props.theme.colors.secondary} />
      </TouchableOpacity>
		</View>
  );
};


export {MessageInput};