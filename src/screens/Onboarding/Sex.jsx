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

import Base from "./Base";
import CustomText from "../../components/UI/Custom/CustomText";

import useGlobal from "../../core/global";
import { colors as c } from "../../assets/config";


export default function SexScreen({ navigation }) {

  const form = useGlobal(state => state.form)
  const setForm = useGlobal(state => state.setForm)
  const theme = useGlobal(state => state.theme)
  const colors = c[theme]

  const [selected, setSelected] = useState("")
  function toggleSelected(key) {
    setSelected(key)
    setForm({ ...form, sex:key })
  }

  const label = "I am a ..."
  const buttonLabel = "Next Step"

  return (
    <Base navigation={navigation} next={'hometown'} label={label} buttonLabel={buttonLabel} >
      <View 
        style={{ 
          flexDirection:'column', 
          gap:verticalScale(15),
          marginHorizontal:moderateScale(100),
          alignItems:'center'
        }}
      >
        <TouchableOpacity 
          onPress={() => toggleSelected("M")}
          style={[
            styles.option, 
            { 
              borderColor: colors.constBlack,
              backgroundColor: selected === "M" ? colors.wasatchSun : colors.accentDark,
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
                color: selected === "M" ? colors.constBlack : colors.constWhite
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
              backgroundColor: selected === "F" ? colors.wasatchSun : colors.accentDark,
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
                color: selected === "F" ? colors.tint : colors.constWhite
              }
            ]}
          >
            Girl
          </CustomText>
        </TouchableOpacity>
      </View>
    </Base>
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