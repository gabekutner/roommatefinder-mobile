import React, { useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';

import {
  verticalScale,
  moderateScale,
} from 'react-native-size-matters';

import BaseWidgetModal from "./BaseWidgetModal";
import CustomText from "../../../components/UI/Custom/CustomText";
import CustomLabel from "../../../components/UI/Label";
import CustomTextInput from "../../../components/UI/Custom/CustomInput";

import { prompts } from "../../../assets/Dictionary";


export default function PromptsModal({
  colors,
  label,
  buttonLabel,
  navigation,
  onActionPress,
}) {

  const [selected, setSelected] = useState("")
  function toggleSelected(key) {
    setSelected(key)
    // setForm({ ...form, sex:key })
  }

  return (
    <BaseWidgetModal
      colors={colors}
      label={label}
      buttonLabel={buttonLabel}
      navigation={navigation}
      onActionPress={onActionPress}
    >

      <View style={{ alignItems:'center' }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={prompts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => toggleSelected(item.prompt)}
              style={[
                styles.option, 
                {
                  borderColor: colors.constBlack,
                  backgroundColor:selected === item.prompt ? colors.wasatchSun : colors.accentDark,
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
                    color:selected === item.prompt ? colors.tint : colors.constWhite
                  }
                ]}
              >
                {item.prompt}
              </CustomText>
            </TouchableOpacity>
          )}
          style={{
            flexDirection:'column', 
            marginHorizontal:moderateScale(50),
            height:'30%',
            marginBottom:verticalScale(10)
          }}
        /> 
        <CustomLabel color={colors.constWhite} label={'Answer here!'} />
        <CustomTextInput 
          autoCorrect={false}
          placeholder={'Ex. '}
          // value={form.graduation_year}
          // onChangeText={graduation_year => setForm({ ...form, graduation_year:graduation_year })}
          colors={colors}
          multiline={true}
          style={{
            marginTop:verticalScale(5),
            height:verticalScale(45),
            marginBottom:verticalScale(-30),
            backgroundColor:colors.secondary,
            color:colors.tint,
            borderRadius:0,
            borderWidth:2,
            borderColor:colors.constBlack,
            fontSize:verticalScale(14),
            width:moderateScale(240),
            height:verticalScale(150),
            paddingTop:verticalScale(10)
          }}
        />
      </View>
    </BaseWidgetModal>
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