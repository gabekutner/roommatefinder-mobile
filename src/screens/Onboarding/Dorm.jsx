import React, { useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { 
  verticalScale, 
  moderateScale 
} from "react-native-size-matters";

// import Base from "./Components/Base";
import Label from "./Components/Label";
import CustomText from "../../components/UI/Custom/CustomText";

import useGlobal from "../../core/global";
import { colors } from "../../constants/colors";
import { dormsData } from "../../assets/Dictionary";


export default function DormScreen({ navigation }) {

  const form = useGlobal(state => state.form)
  const setForm = useGlobal(state => state.setForm)

  const [selected, setSelected] = useState("")
  function toggleSelected(key) {
    setSelected(key)
    setForm({ ...form, dorm_building:key })
  }

  return (
    <>
      <Label 
        text="Where will you be living next year?" 
        style={{ 
          marginTop:verticalScale(50), 
          marginBottom:verticalScale(20),
          alignSelf:'center',
          marginHorizontal:moderateScale(25),
          textAlign:'center'
        }} 
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={dormsData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => toggleSelected(item.id)}
            style={[
              styles.option, 
              {
                backgroundColor: selected === item.id ? colors.accent : colors.secondary,
              }
            ]}
          >
            <CustomText 
              style={[
                styles.text, 
                { 
                  color: selected === item.id ? colors.white : colors.tint,
                }
              ]}
            >
              {item.dorm}
            </CustomText>
          </TouchableOpacity>
        )}
        style={{
          flexDirection:'column', 
          marginHorizontal:moderateScale(50),
        }}
      /> 
    </>
  )
}

const styles = StyleSheet.create({
  option: {
    paddingVertical:verticalScale(8),
    paddingHorizontal:moderateScale(30),
    borderWidth:2,
    alignItems:'center',
    marginBottom:verticalScale(20),
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