import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native';

import { 
  moderateScale,
  verticalScale 
} from "react-native-size-matters";

import Base from "./Components/Base";
import Label from "./Components/Label";
import CustomText from "../../components/UI/Custom/CustomText";

import useGlobal from "../../core/global";
import { colors } from "../../constants/colors";
import { interestsData } from "../../assets/Dictionary";


export default function InterestsScreen({ navigation }) {

  const form = useGlobal(state => state.form)
  const setForm = useGlobal(state => state.setForm)

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
    <Base>
      <Label 
        text="What're you into?" 
        style={{ 
          marginTop:verticalScale(50), 
          marginBottom:verticalScale(20),
          alignSelf:'center'
        }} 
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={interestsData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleOnClick(item.id, form, setForm)}
            style={[
              styles.option, 
              {
                borderColor: colors.tint,
                backgroundColor:Object.values(form.interests).includes(item.id) ? colors.accent : colors.secondary,
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
                  color:Object.values(form.interests).includes(item.id) ? colors.white : colors.tint
                }
              ]}
            >
              {item.interest}
            </CustomText>
          </TouchableOpacity>
        )}
        style={{
          flexDirection:'column', 
          marginHorizontal:moderateScale(50),
          height:'50%'
        }}
      /> 
    </Base>
  )
}

const styles = StyleSheet.create({
  option: {
    paddingVertical:10,
    paddingHorizontal:30,
    borderWidth:2,
    alignItems:'center',
    marginBottom:20,
  },
  text: { 
    fontSize:verticalScale(14),
    fontWeight:'600',
  },
})