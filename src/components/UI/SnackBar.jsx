import React, {useState, useEffect} from "react";
import {View, TouchableOpacity, StyleSheet} from "react-native";

import CustomText from "./Custom/CustomText";

export default function Snackbar({
  message,
  actionText,
  onActionPress,
  duration = 3000, // default duration in milliseconds
  position = "bottom", // default position
  containerStyle,
  messageStyle,
  actionTextStyle,
  backgroundColor,
  textColor,
  actionTextColor,
}) {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [isVisible, duration]);

  return isVisible ? (
    <View
      style={[
        styles.container,
        position === "top" ? styles.topContainer : styles.bottomContainer,
        containerStyle,
        {backgroundColor: backgroundColor},
      ]}
    >
      <CustomText
        style={[styles.messageText, messageStyle, {color: textColor}]}
      >
        {message}
      </CustomText>
      {actionText && (
        <TouchableOpacity onPress={onActionPress}>
          <CustomText
            style={[
              styles.actionText,
              actionTextStyle,
              {color: actionTextColor},
            ]}
          >
            {actionText}
          </CustomText>
        </TouchableOpacity>
      )}
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    left: 0,
    right: 0,
  },
  topContainer: {top: 15},
  bottomContainer: {bottom: 15},
  messageText: {
    fontSize: 16,
    maxWidth: "80%",
  },
  actionText: {
    marginLeft: 8,
    fontSize: 14,
  },
});
