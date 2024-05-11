import {
  View,
  Text,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import useGlobal from '../core/global';
import { colors as c } from '../assets/config';



export default function Swipe({ navigation }) {

  const theme = useGlobal(state => state.theme)
  const activeColors = c[theme]

  return (
    <SafeAreaView style={{ flex:1, backgroundColor:activeColors.primary }}>
      <Text>Swipe</Text>
    </SafeAreaView>
  )
}