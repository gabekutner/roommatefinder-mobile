import React from "react";
import {
  View
} from 'react-native';

import DatePicker from 'react-native-date-picker';

import Base from "./Base";
import CustomNextButton from "./CustomNextButton";

import useGlobal from "../../core/global";
import { colors as c } from "../../assets/config";


export default function AgeScreen({ navigation }) {

  const form = useGlobal(state => state.form)
  const setForm = useGlobal(state => state.setForm)
  const theme = useGlobal(state => state.theme)
  const colors = c[theme]

  const label = "My birthday is on ... "

  return (
    <Base navigation={navigation} label={label} >
      <View style={{ alignItems:'center' }}>
        <DatePicker
          inlined
          date={form.birthday}
          mode={'date'}
          theme={'dark'}
          onDateChange={birthday => setForm({ ...form, birthday:birthday })}
        />
      </View>
      <CustomNextButton 
        colors={colors}
        onClick={() => navigation.navigate('sex')}
        text={'Next Step'}
      />
    </Base>
  )
}