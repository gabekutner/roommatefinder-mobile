import React from "react";
import {StyleSheet, Text, View} from "react-native";

import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";


export default function Empty({
  icon,
  emoji,
  message,
  theme,
  centered = true,
  refresh,
}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor:theme.colors.background,
        alignItems: "center",
        paddingVertical:120,
        justifyContent: centered ? "center" : "flex-start",
      }}
    >
      {icon ? (
        <FontAwesomeIcon
          icon={icon}
          size={70}
          style={{marginBottom: 14}}
        />
      ) : (
        <Text
          style={{
            fontWeight:'500',
            fontSize: 80,
            marginBottom: 14,
            color: theme.colors.primary
          }}
        >
          {emoji}
        </Text>
      )}

      <Text
        style={{
          fontSize:14,
          fontWeight:'500',
          maxWidth: 200,
          textAlign: "center",
        }}
      >
        {message}
      </Text>
      {/* {refresh ? (
        <CustomButton shadow onClick={() => refresh()} style={styles.button}>
          <Text
            // fontSize="medium"
            style={{
              fontSize:14,
              fontWeight: "600",
              color: theme.colors.primary
            }}
          >
            Refresh
          </Text>
        </CustomButton>
      ) : null} */}
    </View>
  );
};