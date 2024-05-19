import {
  Text,
  View
} from 'react-native';

import DatePicker from 'react-native-date-picker';


export default function Birthday({ form, setForm }) {
  return (
    <View style={{ alignItems:'center' }}>
      <DatePicker
        inlined
        date={form.birthday}
        mode={'date'}
        onDateChange={birthday => setForm({ ...form, birthday })}
      />
      <Text style={{ marginVertical:15, marginHorizontal:35, color:activeColors.tertiary  }}>
        Your age will be public.
      </Text>
    </View>
  )
}