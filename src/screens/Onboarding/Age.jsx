import React from "react";
import {
  View
} from 'react-native';

import DatePicker from 'react-native-date-picker';
import {
  verticalScale
} from 'react-native-size-matters';

import CustomText from "../../components/UI/Custom/CustomText";

import Base from "./Components/Base";
import Label from "./Components/Label";

import useGlobal from "../../core/global";


export default function AgeScreen({ navigation }) {

  const form = useGlobal(state => state.form)
  const setForm = useGlobal(state => state.setForm)

  return (
    <Base>
      <View 
        style={{ 
          alignItems:'center',
          marginTop:verticalScale(30)  
        }}
      >
        <Label text="How old are you?" style={{ marginVertical:verticalScale(20) }} />
        <DatePicker
          inlined
          date={form.birthday}
          mode={'date'}
          theme={'light'}
          onDateChange={birthday => setForm({ ...form, birthday:birthday })}
        />
      </View>
      
    </Base>
  )
}