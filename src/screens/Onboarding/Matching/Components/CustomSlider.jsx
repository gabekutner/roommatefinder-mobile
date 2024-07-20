import React from "react";
import {StyleSheet, View} from "react-native";

import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {verticalScale, moderateScale} from "react-native-size-matters";
import {Slider} from "@miblanchard/react-native-slider";

import {colors} from "../../../../constants/colors";

export default function CustomSlider({
  leftIcon,
  rightIcon,
  value,
  onValueChange,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.sliderWrapper}>
        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
          <FontAwesomeIcon
            icon={leftIcon}
            size={verticalScale(22)}
            color={colors.tertiary}
          />
          <FontAwesomeIcon
            icon={rightIcon}
            size={verticalScale(22)}
            color={colors.tertiary}
          />
        </View>
        <Slider
          value={value}
          minimumValue={0}
          maximumValue={20}
          step={1}
          onValueChange={onValueChange}
          containerStyle={{width: "100%"}}
          thumbStyle={{backgroundColor: colors.accent}}
          minimumTrackStyle={{backgroundColor: colors.accent}}
          maximumTrackTintColor={colors.tertiary}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(5),
    paddingHorizontal: moderateScale(10),
    width: "100%",
  },
  sliderWrapper: {
    backgroundColor: colors.secondary,
    width: "100%",
    paddingVertical: verticalScale(10),
    paddingHorizontal: moderateScale(15),
    borderRadius: 12,
    borderWidth: 2,
  },
  icon: {fontSize: verticalScale(18)},
});
