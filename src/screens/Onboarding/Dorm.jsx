import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
} from 'react-native';

import { verticalScale, moderateScale } from "react-native-size-matters";

import CustomText from "../../components/UI/Custom/CustomText";
import useGlobal from "../../core/global";
import { colors } from "../../constants/colors";
import { dormsData } from "../../assets/Dictionary";
import CustomButton from "../../components/UI/Custom/CustomButton";
import useStore from "../../zustand/store";

export default function DormScreen() {

  const form = useStore(state => state.form)
  const setForm = useStore(state => state.setForm)

  const [selected, setSelected] = useState("")
  function toggleSelected(key) {
    setSelected(key)
    setForm({ ...form, dorm_building:key })
  }

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={dormsData}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <CustomButton
          onClick={() => toggleSelected(item.id)}
          style={{
            ...styles.option, 
            backgroundColor: selected === item.id ? colors.accent : colors.secondary,
          }}
        >
          <CustomText 
            style={{
              ...styles.text, 
              color: selected === item.id ? colors.white : colors.tint,
            }}
          >
            {item.dorm}
          </CustomText>
        </CustomButton>
      )}
      style={{
        flexDirection:'column', 
        marginHorizontal:moderateScale(50),
        height:'50%'
      }}
    /> 
  )
}

const styles = StyleSheet.create({
  option: {
    paddingVertical:verticalScale(8),
    paddingHorizontal:moderateScale(30),
    borderWidth:2,
    alignItems:'center',
    marginBottom:verticalScale(10),
    borderColor: colors.tint,
    shadowColor:'#222',
    shadowOffset:{ width: 7, height: 5 },
    shadowOpacity:1,
    shadowRadius:1, 
  },
  text: { 
    fontSize:verticalScale(14),
    fontWeight:'bold',
  },
})