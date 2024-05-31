import {
  Text,
  View
} from 'react-native';

import DatePicker from 'react-native-date-picker';

import CustomText from '../../../components/UI/Custom/CustomText';


export default function Birthday({ theme, colors, form, setForm }) {
  return (
    <View style={{ alignItems:'center' }}>
      <DatePicker
        inlined
        date={form.birthday}
        mode={'date'}
        theme={theme}
        onDateChange={birthday => setForm({ ...form, birthday })}
      />
      <CustomText 
        style={{ 
          marginVertical:15, 
          marginHorizontal:35, 
          color:colors.tertiary ,
          fontSize:18, 
        }}
      >
        Your age will be public.
      </CustomText>
    </View>
  )
}