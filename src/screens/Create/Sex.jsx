import { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';


export default function Sex({ colors, form, setForm }) {

  const [selected, setSelected] = useState("")

  function toggleSelected(key) {
    setSelected(key)
    setForm({ ...form, sex:key })
  }

  return (
    <View style={{ flexDirection:'column', gap:20 }}>

      <TouchableOpacity 
        onPress={() => toggleSelected("M")}
        style={[
          styles.option, 
          { 
            borderColor: colors.accent,
            backgroundColor: selected === "M" ? colors.accent : 'transparent'
          }
        ]}
      >
        <Text style={[styles.text, { color: selected === "M" ? '#f3f4f6' : colors.tint }]}>Guy</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => toggleSelected("F")}
        style={[
          styles.option, 
          { 
            borderColor:colors.accent,
            backgroundColor: selected === "F" ? colors.accent : 'transparent'
          }
        ]}
      >
        <Text style={[styles.text, { color: selected === "F" ? '#f3f4f6' : colors.tint }]}>Girl</Text>
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