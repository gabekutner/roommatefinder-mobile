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

import Base from "./Base";
import CustomText from "../../components/UI/Custom/CustomText";
import CustomNextButton from "./CustomNextButton";

import useGlobal from "../../core/global";
import { colors as c } from "../../assets/config";
import { interestsData } from "../../assets/Dictionary";


export default function InterestsScreen({ navigation }) {

  const form = useGlobal(state => state.form)
  const setForm = useGlobal(state => state.setForm)
  const theme = useGlobal(state => state.theme)
  const colors = c[theme]

  const label = "I'm into ..."

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
    <Base navigation={navigation} label={label} >
      
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
                borderColor: colors.constBlack,
                backgroundColor:Object.values(form.interests).includes(item.id) ? colors.wasatchSun : colors.accentDark,
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
                  color:Object.values(form.interests).includes(item.id) ? colors.tint : colors.constWhite
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
      <CustomText
        style={{
          fontSize:verticalScale(12),
          alignSelf:'center',
          color:colors.constWhite,
          marginVertical:verticalScale(10),
          fontWeight:'500',
        }}
      >
        Choose 1 to 5 interests!
      </CustomText>  
      <CustomNextButton 
        colors={colors}
        onClick={() => navigation.navigate('widgets')}
        text={'Next Step'}
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