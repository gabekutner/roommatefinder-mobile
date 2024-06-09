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


export default function QuotesScreen({ navigation }) {

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
        <Label text="Add your favorite quotes!" style={{ marginVertical:verticalScale(20) }} />
        <CustomButton 
          onClick={() => {}}
          style={{ 
            ...styles.addLink, 
            borderColor:colors.tint
          }}
        >
          <CustomText style={[styles.linkedText, { color:colors.tint }]}>+ Add a quote</CustomText>
        </CustomButton>
        
        <FlatList 
          showsVerticalScrollIndicator={false}
          data={form.quotes}
          keyExtractor={item => item.quote}
          renderItem={({ item }) => (
            <View 
              style={{
                ...styles.linked, 
                borderColor: colors.tint,
                backgroundColor: colors.secondary,
              }}
            >
              <View style={{ ...styles.quoteBox, flexDirection:'column', gap:4 }}>
                <FontAwesomeIcon 
                  icon="quote-left"
                  size={22}
                  color={colors.tint}
                />
                <CustomText style={{ ...styles.quote, color:colors.tint }}>{item.quote}</CustomText>
              </View>
              <CustomText style={{ ...styles.person, color:colors.tint }}>
                - {item.cited}
              </CustomText>
            </View>
          )}
        />
      </View>
    </Base>
  )
}

const styles = StyleSheet.create({
  linked: {
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
  },
  quoteBox: {
    width:'100%',
    padding:verticalScale(15),
    paddingBottom:verticalScale(8),
    paddingLeft:verticalScale(8),
    paddingTop:verticalScale(8),
  },
  quote: {
    fontSize:verticalScale(14),
    fontWeight:'600',
    textShadowColor:'#222',
    textShadowRadius:10,
    textShadowOffset: [{ width:15, height:15 }],
  },
  person: {
    fontSize:verticalScale(12),
    fontWeight:'500',
    padding:verticalScale(10),
  }
})