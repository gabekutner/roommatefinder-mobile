import React from "react";

import DatePicker from 'react-native-date-picker';
import { verticalScale } from 'react-native-size-matters';

import Label from "./Components/Label";
import Card from "./Components/Card";
import useGlobal from "../../core/global";


export default function AgeScreen({ navigation }) {

  const form = useGlobal(state => state.form)
  const setForm = useGlobal(state => state.setForm)

  return (
    <Card navigation={navigation} screen={"sex"} style={{ marginTop:verticalScale(30) }}>
      <Label text="How old are you?" style={{ marginVertical:verticalScale(20) }} />
      <DatePicker
        inlined
        date={form.birthday}
        mode={'date'}
        theme={'light'}
        onDateChange={birthday => setForm({ ...form, birthday:birthday })}
      />
    </Card>
  )
}