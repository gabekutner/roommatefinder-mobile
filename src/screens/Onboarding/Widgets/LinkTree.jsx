import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
} from 'react-native';

import { verticalScale } from "react-native-size-matters";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import Base from "../Components/Base";
import Label from "../Components/Label";
import CustomButton from "../../../components/UI/Custom/CustomButton";
import CustomText from "../../../components/UI/Custom/CustomText";

import useGlobal from "../../../core/global";
import { colors } from "../../../constants/colors";


export default function LinkTreeScreen({ navigation }) {

  const form = useGlobal(state => state.form)
  const setForm = useGlobal(state => state.setForm)

  return (
    <Base>
      <View 
        style={{ 
          alignItems:'center',
          flexDirection:'column',
          gap:10,
          marginVertical:verticalScale(30)
        }}
      >
        <Label text="Add your social handles!" style={{ marginVertical:verticalScale(20) }} />
        <CustomButton 
          onClick={() => {}}
          style={{ 
            ...styles.addLink, 
            borderColor:colors.tint
          }}
        >
          <CustomText style={[styles.linkedText, { color:colors.tint }]}>+ Add a link</CustomText>
        </CustomButton>
        <FlatList 
          showsVerticalScrollIndicator={false}
          data={form.links}
          keyExtractor={item => item.link}
          renderItem={({ item }) => (
            <View 
              style={{
                ...styles.linked, 
                borderColor: colors.tint,
                backgroundColor: colors.secondary,
                flexDirection:'row',
                gap:15
              }}
            >
              <FontAwesomeIcon 
                icon="link"
                size={22}
                color={colors.tint}
              />
              <CustomText style={[styles.linkedText, { color:colors.tint }]}>{item.title}</CustomText>
            </View>
          )}
        />
      </View>
    </Base>
  )
}

const styles = StyleSheet.create({
  linked: {
    padding:verticalScale(15),
    borderWidth:1,
    borderRadius:0,
    marginBottom:verticalScale(10),
    shadowColor: '#222',
    shadowOffset: { width: 7, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 1,  
  },
  linkedText: {
    fontSize:verticalScale(12),
    fontWeight:'500',
  },
  addLink: {
    padding:verticalScale(15),
    marginBottom:verticalScale(10)
  }
})