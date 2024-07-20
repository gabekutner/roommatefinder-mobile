import React from "react";

import {moderateScale, verticalScale} from "react-native-size-matters";

import CustomTextInput from "../../components/UI/Custom/CustomInput";

import useStore from "../../zustand/store";
import {colors} from "../../constants/colors";

export default function MajorScreen({navigation}) {
  const form = useStore((state) => state.form);
  const setForm = useStore((state) => state.setForm);

  const setMajor = (input) => {
    setForm({...form, major: input});
  };

  return (
    <CustomTextInput
      autoCorrect={false}
      placeholder={"Ex. Business"}
      value={form.major}
      onChangeText={(input) => setMajor(input)}
      colors={colors}
      icon={"graduation-cap"}
      iconColor={colors.tertiary}
      iconSize={verticalScale(13)}
      containerStyle={{
        height: verticalScale(45),
        marginBottom: verticalScale(14),
        backgroundColor: colors.secondary,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: colors.tint,
        width: "90%",
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
