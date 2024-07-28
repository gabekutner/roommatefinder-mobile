import React from "react";
import {Text, View} from "react-native";

import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";


export default function Empty({
  icon,
  emoji,
  message,
  theme,
  refresh,
}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor:theme.colors.background,
        alignItems: "center",
        paddingVertical:120,
      }}
    >
      <View 
        style={{
          alignItems:'center',
          padding:20,
          borderRadius:12,
          backgroundColor:theme.colors.background,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}
      >
        {icon ? 
          <FontAwesomeIcon
            icon={icon}
            size={70}
            style={{marginBottom: 14}}
          />
        : null }

        {emoji !== null ? 
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
        : null }

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
      </View>
      
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