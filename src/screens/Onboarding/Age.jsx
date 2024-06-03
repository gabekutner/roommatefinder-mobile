import React from "react";
import {
  View
} from 'react-native';

import DatePicker from 'react-native-date-picker';

import Base from "./Base";

import useGlobal from "../../core/global";


export default function AgeScreen({ navigation }) {

  const form = useGlobal(state => state.form)
  const setForm = useGlobal(state => state.setForm)
  const label = "My birthday is on ... "

  return (
    <Base navigation={navigation} next={'sex'} label={label} >
      <View style={{ alignItems:'center' }}>
        <DatePicker
          inlined
          date={form.age}
          mode={'date'}
          theme={'dark'}
          onDateChange={age => setForm({ ...form, age:age })}
        />
      </View>
    </Base>
  )
}