import React from "react";
import DatePicker from 'react-native-date-picker';
import useGlobal from "../../core/global";


export default function AgeScreen() {

  const form = useGlobal(state => state.form)
  const setForm = useGlobal(state => state.setForm)

  return(
    <DatePicker
      inlined
      date={form.birthday}
      mode={'date'}
      theme={'light'}
      onDateChange={birthday => setForm({ ...form, birthday:birthday })}
    /> 
  )
}