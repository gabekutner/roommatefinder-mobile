import {
  StyleSheet
} from 'react-native';

import useGlobal from '../core/global';
import { colors as c } from '../assets/config';

const theme = useGlobal(state => state.theme)
const colors = c[theme]


export default StyleSheet.create({
  text: {
    fontFamily: 'NotoSans_Condensed-Regular',
    color:colors.tint
  }
})