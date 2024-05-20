import {
  View,
  Text
} from 'react-native';

import Interests from '../Create/Interests';

import useGlobal from '../../../core/global';
import { colors as c } from '../../../assets/config';


export default function InterestsPage({ route, navigation }) {

  const { form, setForm } = route.params
  const theme = useGlobal(state => state.theme)
  const colors = c[theme]

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Interests colors={colors} form={form} setForm={setForm} />
    </View>
  )
}