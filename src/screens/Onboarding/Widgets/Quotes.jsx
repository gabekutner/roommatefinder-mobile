import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
} from 'react-native';

import { verticalScale } from "react-native-size-matters";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import Base from "../Base";
import CustomButton from "../../../components/UI/Custom/CustomButton";
import CustomText from "../../../components/UI/Custom/CustomText";
import QuotesModal from "./QuotesModal";
import CustomNextButton from "../CustomNextButton";

import useGlobal from "../../../core/global";
import { colors as c } from "../../../assets/config";


export default function QuotesScreen({ navigation }) {

  const form = useGlobal(state => state.form)
  const setForm = useGlobal(state => state.setForm)
  const theme = useGlobal(state => state.theme)
  const colors = c[theme]

  const [show, setShow] = useState(false)
  const label = "Add your favorite quotes!"
  const modalLabel = "Add a quote!"

  // get users quotes and populate them here
  // temporary
  const userQuotes = [
    {
      id: "1",
      quote: "Think not those faithful who praise all thy words and actions; but those who kindly reprove thy faults.",
      person: "Socrates"
    },
  ]

  return (
    <Base navigation={navigation} label={label} >
      <View 
        style={{ 
          alignItems:'center',
          flexDirection:'column',
          gap:10,
        }}
      >
        <CustomButton 
          onClick={() => setShow(true)}
          style={{ 
            ...styles.addLink, 
            borderColor:colors.constWhite
          }}
        >
          <CustomText style={[styles.linkedText, { color:colors.constWhite }]}>+ Add a quote</CustomText>
        </CustomButton>
        
        <FlatList 
          showsVerticalScrollIndicator={false}
          data={form.quotes}
          keyExtractor={item => item.quote}
          renderItem={({ item }) => (
            <View 
              style={{
                ...styles.linked, 
                borderColor: colors.constBlack,
                backgroundColor: colors.accentDark,
              }}
            >
              <View style={{ ...styles.quoteBox, flexDirection:'column', gap:4 }}>
                <FontAwesomeIcon 
                  icon="quote-left"
                  size={22}
                  color={colors.constWhite}
                />
                <CustomText style={{ ...styles.quote, color:colors.constWhite }}>{item.quote}</CustomText>
              </View>
              <CustomText style={{ ...styles.person, color:colors.constWhite }}>
                - {item.cited}
              </CustomText>
            </View>
          )}
        />
      </View>
      { show
        ?
          <QuotesModal 
            colors={colors}
            label={modalLabel}
            navigation={navigation}
          />
        : null
      }
      <CustomNextButton 
        colors={colors}
        onClick={() => navigation.navigate('widgets')}
        text={'All Done'}
      />
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