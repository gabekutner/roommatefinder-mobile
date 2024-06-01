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
            borderColor: colors.constBlack,
            backgroundColor: selected === "M" ? colors.wasatchSun : colors.accentDark,
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
              color: selected === "M" ? colors.tint : colors.constWhite
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
            borderColor: colors.constBlack,
            backgroundColor: selected === "F" ? colors.wasatchSun : colors.accentDark,
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
              color: selected === "F" ? colors.tint : colors.constWhite
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
    borderWidth:2,
  },
  text: { fontSize:17 }
})