import React from "react";
import {View} from "react-native";
import {styles} from "./fastImageBackground.styles";
import {LoadingIndicator} from "./LoadingIndicator";
// react-native-image-progress is a bridge between the image component,
// or react-native-fast-image, and the progress views in react-native-progress.
// Or you can use it to render a custom progress indicator.
import FastImage from "react-native-fast-image";
import {createImageProgress} from "react-native-image-progress";
// Wrap FastImage with react-native-image-progress.
const Image = createImageProgress(FastImage);


function FastImageBackground(props) {
  return (
    <View
      style={[
        styles.container,
        props.containerStyle
      ]}
    >
      <Image
        style={[
          styles.image,
          props.imageStyle
        ]}
        source={{uri: props.url}}
        resizeMode={props.resizeMode}
        indicator={() => <LoadingIndicator />}
      />
      {props.children}
    </View>
  );
};

export {FastImageBackground};