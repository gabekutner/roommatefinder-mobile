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

import Base from "./Base";
import CustomText from "../../components/UI/Custom/CustomText";

import useGlobal from "../../core/global";
import { colors as c } from "../../assets/config";
import { dormsData } from "../../assets/Dictionary";


export default function DormScreen({ navigation }) {

  const form = useGlobal(state => state.form)
  const setForm = useGlobal(state => state.setForm)
  const theme = useGlobal(state => state.theme)
  const colors = c[theme]

  const [selected, setSelected] = useState("")
  function toggleSelected(key) {
    setSelected(key)
    // setForm({ ...form, dorm:key })
  }

  const label = "I'll be living in ..."
  const buttonLabel = "Next Step"

  return (
    <Base navigation={navigation} next={'done'} label={label} buttonLabel={buttonLabel} >
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
                borderColor: colors.constBlack,
                backgroundColor: selected === item.id ? colors.wasatchSun : colors.accentDark,
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
                  color: selected === item.id ? colors.constBlack : colors.constWhite,
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
  text: { fontSize:17 },
})