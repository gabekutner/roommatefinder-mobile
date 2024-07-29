import React from "react";
import {View, TouchableOpacity, Text} from "react-native";

import Cell from "../../../../components/Cell";
import FastImage from "react-native-fast-image";
import {styles} from "./friendRow.styles";
import {appendFullUrl} from "../../../../libs/utils/appendFullUrl";
import {formatTime} from "../../../../libs/utils/formatTime";


function Row(props) {
  return (
    <Cell>
      <TouchableOpacity>
        <FastImage
          key={props.item.id}
          style={{
            width: 70,
            height: 70,
            borderRadius: 70 / 2,
            backgroundColor: props.theme.colors.background,
            borderWidth: 1,
            borderColor: props.theme.colors.primary,
          }}
          source={appendFullUrl(props.item.friend.thumbnail)}
          resizeMode={FastImage.resizeMode.cover}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate("message", props.item)}>
        <View style={styles.container}>
          <Text 
            style={{
              fontSize:16,
              fontWeight: "600",
              marginBottom: 4,
              color: props.theme.colors.primary
            }}
          >
            {props.item.friend.name}
          </Text>
          <View style={styles.wrapper}>
            <Text
              style={{
                fontSize:14,
                fontWeight:'400',
                color: props.theme.colors.primary,
              }}
            >
              {props.item.preview}
            </Text>
            <Text
              style={{
                fontSize:14,
                fontWeight:'500',
                color: props.theme.colors._tint_primary,
              }}
            >
              {formatTime(props.item.updated)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Cell>
  );
}

export {Row};
