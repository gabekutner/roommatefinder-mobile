import React from "react";
import FastImage from "react-native-fast-image";
import { FastImageBackground } from "../FastImageBackground";

function Card(props) {
  return (
    <FastImageBackground
      key={props.item.id}
      containerStyle={{
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "flex-end",
        flexDirection: "row",
        justifyContent: "center",
      }}
      imageStyle={{height: "100%"}}
      resizeMode={FastImage.resizeMode.cover}
      url={props.item.thumbnail}
    >
      {/* content here */}
    </FastImageBackground>
  );
};

export {Card};