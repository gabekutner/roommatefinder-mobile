import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import useGlobal from '../core/global';
import { colors as c } from '../assets/config';

height = Dimensions.get('window').height
width = Dimensions.get('window').width



export default function Swipe({ navigation }) {

  const theme = useGlobal(state => state.theme)
  const activeColors = c[theme]


  return (
    <SafeAreaView style={{ backgroundColor:activeColors.primary }}>

      {/* card */}
      <View style={[styles.card, { borderColor:activeColors.tint, backgroundColor:activeColors.secondary }]}>
        <Text style={{ color:activeColors.tint, fontSize:20 }}>gabe</Text>
      </View>

      {/* buttons */}
      <View style={[styles.buttonContainer]}>
        
        <TouchableOpacity style={[styles.button, { backgroundColor:activeColors.accent }]}>
          <FontAwesomeIcon 
            icon="arrow-left-long"
            size={25}
            color={activeColors.tint}
          />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor:activeColors.accent }]}>
          <FontAwesomeIcon 
            icon="arrow-right-long"
            size={25}
            color={activeColors.tint}
          />
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  card: {
    height:height * .65, 
    // width:width,
    margin:5,
    borderRadius:12,
    borderWidth:1,

    // temp
    justifyContent:'center',
    alignItems:'center'
  },
  buttonContainer: {
    marginTop:5,
    flexDirection:'row',
    gap:15,
    justifyContent:'center',
    alignItems:'center'
  },
  button: {
    padding:10,
    borderRadius:12,
    width:'45%',
    alignItems:'center',
    justifyContent:'center'
  }
})