import React from "react";
import { StyleSheet, FlatList } from 'react-native';

import { moderateScale, verticalScale } from "react-native-size-matters";

import CustomText from "../../components/UI/Custom/CustomText";
import CustomButton from "../../components/UI/Custom/CustomButton";

// import useGlobal from "../../core/global";
import { colors } from "../../constants/colors";
import useStore from "../../zustand/store";
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
          onClick={() => handleOnClick(item.id, form, setForm)}
          style={{
            ...styles.option, 
            backgroundColor:Object.values(form.interests).includes(item.id) ? colors.accent : colors.secondary,
          }}
        >
          <CustomText 
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
    shadowColor: '#222',
    shadowOffset: { width: 7, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 1,  
    borderColor: colors.tint,
  },
  text: { 
    fontSize:verticalScale(14),
    fontWeight:'bold',
  },
  flatlist: {
    flexDirection:'column', 
    marginHorizontal:moderateScale(50),
    height:'50%'
  }
})