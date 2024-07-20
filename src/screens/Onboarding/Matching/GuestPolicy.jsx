import React from "react";
import {View, StyleSheet} from "react-native";

import {verticalScale} from "react-native-size-matters";

import MultipleChoiceOption from "./Components/MultipleChoiceOption";

import useStore from "../../../zustand/store";
import {colors} from "../../../constants/colors";

export default function GuestPolicyScreen() {
  const matchingForm = useStore((state) => state.matchingForm);
  const setMatchingForm = useStore((state) => state.setMatchingForm);

  return (
    <View style={styles.optionsContainer}>
      <MultipleChoiceOption
        text="Guests are family—come one, come all, anytime."
        selected={matchingForm.guest_policy}
        setSelected={() =>
          setMatchingForm({
            ...matchingForm,
            guest_policy: "Guests are family—come one, come all, anytime.",
          })
        }
      />
      <MultipleChoiceOption
        text="Guests are cool, but they gotta bring snacks to share."
        selected={matchingForm.guest_policy}
        setSelected={() =>
          setMatchingForm({
            ...matchingForm,
            guest_policy:
              "Guests are cool, but they gotta bring snacks to share.",
          })
        }
      />
      <MultipleChoiceOption
        text="Guests are okay, but keep it chill, we're not running a hotel."
        selected={matchingForm.guest_policy}
        setSelected={() =>
          setMatchingForm({
            ...matchingForm,
            guest_policy:
              "Guests are okay, but keep it chill, we're not running a hotel.",
          })
        }
      />
      <MultipleChoiceOption
        text="Guests? Nah, this is our sanctuary."
        selected={matchingForm.guest_policy}
        setSelected={() =>
          setMatchingForm({
            ...matchingForm,
            guest_policy: "Guests? Nah, this is our sanctuary.",
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  optionsContainer: {
    flexDirection: "column",
    gap: verticalScale(20),
    backgroundColor: colors.secondary,
    padding: verticalScale(20),
    borderRadius: 12,
    borderWidth: 2,
    width: "100%",
    alignItems: "flex-start",
  },
});
