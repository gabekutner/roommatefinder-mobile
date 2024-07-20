import React from "react";

import {moderateScale, verticalScale} from "react-native-size-matters";

import CustomTextInput from "../../components/UI/Custom/CustomInput";

import useStore from "../../zustand/store";
import {colors} from "../../constants/colors";

export default function GraduationYearScreen() {
  const form = useStore((state) => state.form);
  const setForm = useStore((state) => state.setForm);

  const setGradYear = (input) => {
    setForm({...form, graduation_year: input});
  };

  return (
    <CustomTextInput
      autoCorrect={false}
      placeholder={"Ex. 2028"}
      value={form.graduation_year}
      onChangeText={(input) => setGradYear(input)}
      colors={colors}
      icon={"calendar-days"}
      iconColor={colors.tertiary}
      iconSize={verticalScale(13)}
      containerStyle={{
        height: verticalScale(45),
        marginBottom: verticalScale(14),
        backgroundColor: colors.secondary,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: colors.tint,
        width: "52%",
        paddingRight: moderateScale(45),
        shadowColor: "#000",
        shadowOpacity: 0.7,
        shadowOffset: {
          width: 1.5,
          height: 2,
        },
        shadowRadius: 0.6,
      }}
      inputStyle={{color: colors.tint}}
    />
  );
}
