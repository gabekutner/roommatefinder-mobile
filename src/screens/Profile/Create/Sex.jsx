import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import CustomText from '../../../components/UI/Custom/CustomText';


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
            borderColor: selected === "M" ? colors.tint : colors.accent,
            backgroundColor: selected === "M" ? colors.secondary : colors.accentDark,
            shadowColor: '#222',
            shadowOffset: { width: 7, height: 5 },
            shadowOpacity: 1,
            shadowRadius: 1,  
          }
        ]}
      >
        <CustomText 
          style={[
            styles.text, 
            { 
              color: selected === "M" ? '#f3f4f6' : colors.tint 
            }
          ]}
        >
          Guy
        </CustomText>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => toggleSelected("F")}
        style={[
          styles.option, 
          { 
            borderColor: selected === "F" ? colors.tint : colors.accent,
            backgroundColor: selected === "F" ? colors.secondary : colors.accentDark,
            shadowColor: '#222',
            shadowOffset: { width: 7, height: 5 },
            shadowOpacity: 1,
            shadowRadius: 1,  
          }
        ]}
      >
        <CustomText 
          style={[
            styles.text, 
            { 
              color: selected === "F" ? '#f3f4f6' : colors.tint 
            }
          ]}
        >
          Girl
        </CustomText>
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
  text: { fontSize:17 }
})