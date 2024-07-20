import React from "react";
import DatePicker from "react-native-date-picker";
import useStore from "../../zustand/store";

export default function AgeScreen() {
  const form = useStore((state) => state.form);
  const setForm = useStore((state) => state.setForm);

  return (
    <DatePicker
      inlined
      date={form.birthday}
      mode={"date"}
      theme={"light"}
      onDateChange={(birthday) => setForm({...form, birthday: birthday})}
    />
  );
}
