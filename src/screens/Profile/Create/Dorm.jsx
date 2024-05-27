import React, { useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

import CustomText from '../../../components/UI/Custom/CustomText';

import { dormsData } from '../../../assets/Dictionary';


export default function Dorm({ colors, form, setForm }) {

  const [selected, setSelected] = useState("")

  function toggleSelected(key) {
    setSelected(key)
    setForm({ ...form, dorm:key })
  }

  return (
    <>
      <FlatList 
        showsVerticalScrollIndicator={false}
        data={dormsData}
        style={{ 
          marginBottom:10, 
          borderBottomColor:colors.tint, 
          borderBottomWidth:.5 
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => toggleSelected(item.id)}
            style={[
              styles.option, 
              { 
                borderColor: colors.accent,
                backgroundColor: selected === item.id ? colors.accent : 'transparent'
              }
            ]}
          >
            <CustomText 
              style={[
                styles.text, 
                { 
                  color: selected === item.id ? '#f3f4f6' : colors.tint 
                }
              ]}
            >
              {item.dorm}
            </CustomText>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
      <CustomText 
        style={{ 
          marginBottom:80, 
          marginHorizontal:35, 
          color:colors.tertiary  
        }}
      >
        Not official, where you think you'll be living.
      </CustomText>
    </>
    
  )
}

const styles = StyleSheet.create({
  option: {
    paddingVertical:10,
    paddingHorizontal:30,
    borderRadius:10,
    borderWidth:1,
    alignItems:'center',
    marginBottom:20,
  },
  text: { fontSize:17 }
})