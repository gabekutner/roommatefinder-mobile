import React from "react";

import {View, TouchableOpacity} from "react-native";

import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {TextInput} from "react-native-paper";

import {styles} from "./messageInput.styles";


function MessageInput(props) {
  return (
    <View style={styles.container}>
			<TextInput
        mode="outlined"
        value={props.message}
        onChangeText={props.setMessage}
      
        placeholder="Write a message"
        placeholderTextColor={props.theme.colors.surfaceVariant}
        outlineColor={props.theme.colors.surfaceVariant}
        activeOutlineColor={props.theme.colors.primary}
        textColor={props.theme.colors.primary}

        style={{flex: 1, paddingRight: 50}}
      />
      <TouchableOpacity 
        onPress={props.onSend}
        style={[
          styles.button,
          {backgroundColor: props.theme.colors.tertiary}
        ]} 
      >
        <FontAwesomeIcon 
          icon={"paper-plane"} 
          size={25} 
          color={props.theme.colors.secondary} 
        />
      </TouchableOpacity>
		</View>
  );
};

export {MessageInput};