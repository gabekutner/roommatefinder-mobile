// custom text component
// https://www.wix.com/studio/blog/font-size
// https://www.reddit.com/r/reactnative/comments/xkre4x/do_we_need_to_use_responsive_font_size_in_react/
import React from "react";

import {verticalScale} from "react-native-size-matters";

import {Text, StyleSheet} from "react-native";

const font = {
  small: "12",
  medium: "14",
  large: "16",
  "x-large": "18",
  "xx-large": "20",
};

const withCustomFont = (WrappedComponent) => {
  const WithCustomFont = ({style, fontSize, ...props}) => {
    const fontSizeStyle = {
      fontSize: verticalScale(font[fontSize]),
    };
    const mergedStyles = [styles.text, fontSizeStyle, style];
    return <WrappedComponent style={mergedStyles} {...props} />;
  };
  return WithCustomFont;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "NotoSans_Condensed-Regular", // default font family
  },
});

const CustomText = withCustomFont(Text);
export default CustomText;
