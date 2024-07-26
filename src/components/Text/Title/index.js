import React from "react";
import {Text} from "react-native";
import {vs} from "../../../libs/react-native-size-matters";


function Title(props) {
  return (
    <Text
      style={{
        fontFamily: "SuezOne-Regular",
        color: props.color,
        fontSize: vs(24),
      }}
    >
      {props.text}
    </Text>
  );
};

export {Title}