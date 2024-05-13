import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';


export default function Sex({ colors, form, setForm }) {
  return (
    <View style={{ flexDirection:'column', gap:20 }}>

      <TouchableOpacity 
        onPress={() => setForm({...form, sex:"M" })}
        style={[styles.option, { borderColor:colors.accent }]}
      >
        <Text style={[styles.text, { color:colors.tint }]}>Guy</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => setForm({...form, sex:"F" })}
        style={[styles.option, { borderColor:colors.accent }]}
      >
        <Text style={[styles.text, { color:colors.tint }]}>Girl</Text>
      </TouchableOpacity>
      
    </View>
  )
}

const styles = StyleSheet.create({
  option: {
    paddingVertical:10,
    paddingHorizontal:100,
    borderRadius:10,
    borderWidth:1,
  },
  text: {
    fontFamily:'NotoSans_Condensed-Regular',
    fontSize:17,
  }
})