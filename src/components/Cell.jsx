import React from "react";
import {View} from "react-native";


export default function Cell({children}) {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 0.3,
        height: 90,
      }}
    >
      {children}
    </View>
  );
};