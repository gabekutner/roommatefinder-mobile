import React from "react";

import CustomSlider from "./Components/CustomSlider";

import useStore from "../../../zustand/store";

export default function HotColdScreen() {
  const matchingForm = useStore((state) => state.matchingForm);
  const setMatchingForm = useStore((state) => state.setMatchingForm);

  return (
    <CustomSlider
      leftIcon={"snowflake"}
      rightIcon={"temperature-high"}
      value={matchingForm.hot_cold}
      onValueChange={(value) =>
        setMatchingForm({...matchingForm, hot_cold: value})
      }
    />
  );
}
