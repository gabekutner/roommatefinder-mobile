import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { 
  moderateScale,
  verticalScale 
} from "react-native-size-matters";

// import Base from "./Components/Base";
import Label from "./Components/Label";
import CustomText from "../../components/UI/Custom/CustomText";

import useGlobal from "../../core/global";
import { colors } from "../../constants/colors";


export default function SexScreen({ navigation }) {

  const form = useGlobal(state => state.form)
  const setForm = useGlobal(state => state.setForm)

  const [selected, setSelected] = useState("")
  function toggleSelected(key) {
    setSelected(key)
    setForm({ ...form, sex:key })
  }

  return (
    <>
      <View 
        style={{ 
          flexDirection:'column', 
          gap:verticalScale(15),
          marginHorizontal:moderateScale(100),
          alignItems:'center',
          marginVertical:verticalScale(30)
        }}
      >
        <Label text="I am a ..." style={{ marginVertical:verticalScale(20) }} />
        <TouchableOpacity 
          onPress={() => toggleSelected("M")}
          style={[
            styles.option, 
            { 
              borderColor: colors.tint,
              backgroundColor: selected === "M" ? colors.accent : colors.secondary,
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
                color: selected === "M" ? colors.white : colors.tint
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
              backgroundColor: selected === "F" ? colors.accent : colors.secondary,
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
                color: selected === "F" ? colors.white : colors.tint
              }
            ]}
          >
            Girl
          </CustomText>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  option: {
    paddingVertical:verticalScale(10),
    paddingHorizontal:moderateScale(50),
    borderWidth:2,
  },
  text: { 
    fontSize:verticalScale(14),
    fontWeight:'600',
  },
})