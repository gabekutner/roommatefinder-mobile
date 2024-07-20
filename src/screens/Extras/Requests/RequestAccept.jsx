import React from "react";
import {StyleSheet} from "react-native";

import {verticalScale, moderateScale} from "react-native-size-matters";

import CustomButton from "../../../components/UI/Custom/CustomButton";
import CustomText from "../../../components/UI/Custom/CustomText";

import useStore from "../../../zustand/store";
import {colors} from "../../../constants/colors";

export default function RequestAccept({item}) {
  const requestAccept = useStore((state) => state.requestAccept);
  return (
    <CustomButton
      shadow
      onClick={() => requestAccept(item.sender.id)}
      style={styles.button}
    >
      <CustomText fontSize="medium" style={styles.text}>
        Accept
      </CustomText>
    </CustomButton>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.tint,
    backgroundColor: colors.accent,
    paddingHorizontal: moderateScale(16),
  },
  text: {
    fontWeight: "600",
    color: colors.white,
  },
});
