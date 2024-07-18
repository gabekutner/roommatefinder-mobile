import React from "react";
import {View, Text, TouchableOpacity} from "react-native";

import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

import {styles} from "./messageHeader.styles";


function MessageHeader(props) {
  return (
    <View 
      style={[
        styles.container,
        {backgroundColor: props.theme.colors.secondary}
      ]}
    >
      <TouchableOpacity onPress={() => props.navigation.goBack()} style={[styles.wrapper, styles.mt]}>
        <FontAwesomeIcon icon="arrow-left" size={22} color={props.theme.colors.primary} />
      </TouchableOpacity>
      <View style={[styles.mt, { flex:4, alignItems:'center', flexDirection:'row', gap:10}]}>
        <View style={{height:50, width:50, backgroundColor:props.theme.colors.primary, borderRadius:60}} />
        <View>
          <Text style={{fontSize: 20, fontFamily: 'SuezOne-Regular', color: props.theme.colors.primary}}>
            {props.friend.name}
          </Text>
          <Text style={{fontSize: 14, color: props.theme.colors.tertiary}}>
            {/* maybe, add a status online status for user and include in whatever consumer this is */}
            Online
          </Text>
        </View>
      </View>
    </View>
  );
};

export {MessageHeader}