import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

import CustomText from '../../../components/UI/Custom/CustomText';

import { interestsData } from '../../../assets/Dictionary';


export default function Interests({ colors, form, setForm }) {

  function handleOnClick(id, form, setForm) {
    const arr = [...form.interests]
    if (arr.length < 5) {
      if (arr.includes(id)) {
        const index = arr.indexOf(id)
        arr.splice(index, 1)
      } else {
        arr.push(id)
      } 
      setForm({ ...form, interests:arr})
    } else {
      return
    }
  }

  return (
    <>
      <FlatList 
        showsVerticalScrollIndicator={false}
        data={interestsData}
        style={{ marginBottom:10, borderBottomColor:colors.tint, borderBottomWidth:.5 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleOnClick(item.id, form, setForm)}
            style={[
              styles.option, 
              {
                borderColor:colors.accent,
                backgroundColor:Object.values(form.interests).includes(item.id) ? colors.accent : 'transparent'
              }
            ]}
          >
            <CustomText style={[styles.text, { color:Object.values(form.interests).includes(item.id) ? '#f3f4f6' : colors.tint }]}>{item.interest}</CustomText>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
      <CustomText style={{ marginBottom:80, marginHorizontal:35, color:colors.tertiary  }}>
        Pick 1 to 5.
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
  text: { fontSize:17 },
})