import React from "react";
import { StyleSheet, FlatList } from 'react-native';

import { moderateScale, verticalScale } from "react-native-size-matters";

import CustomText from "../../components/UI/Custom/CustomText";
import CustomButton from "../../components/UI/Custom/CustomButton";

import useStore from "../../zustand/store";
import { colors } from "../../constants/colors";
import { interestsData } from "../../assets/Dictionary";


export default function InterestsScreen() {

  const form = useStore(state => state.form)
  const setForm = useStore(state => state.setForm)

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
    <FlatList
      showsVerticalScrollIndicator={false}
      data={interestsData}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <CustomButton
          shadow
          onClick={() => handleOnClick(item.id, form, setForm)}
          style={{
            ...styles.option, 
            backgroundColor:Object.values(form.interests).includes(item.id) ? colors.accent : colors.secondary,
          }}
        >
          <CustomText 
            fontSize="medium"
            style={{
              ...styles.text, 
              color:Object.values(form.interests).includes(item.id) ? colors.white : colors.tint
            }}
          >
            {item.interest}
          </CustomText>
        </CustomButton>
      )}
      style={styles.flatlist}
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
    // shadowColor: '#000',
    // shadowOpacity: 0.7,
    // shadowOffset: { 
    //   width: 1.5, 
    //   height: 2 
    // },
    // shadowRadius: 0.6,
  },
  text: { 
    // fontSize:verticalScale(14),
    fontWeight:'bold',
  },
  flatlist: {
    flexDirection:'column', 
    marginHorizontal:moderateScale(50),
    height:'50%'
  }
})