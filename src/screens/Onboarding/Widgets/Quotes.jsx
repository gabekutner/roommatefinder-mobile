import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { verticalScale, moderateScale } from "react-native-size-matters";

import Label from "../Components/Label";
import CustomButton from "../../../components/UI/Custom/CustomButton";
import CustomText from "../../../components/UI/Custom/CustomText";
import CustomTextInput from "../../../components/UI/Custom/CustomInput";

import useStore from "../../../zustand/store";
import { colors } from "../../../constants/colors";


export default function QuotesScreen({ navigation }) {

  const form = useStore(state => state.form)
  const setForm = useStore(state => state.setForm)

  const [quote, setQuote] = useState({
    quote:"",
    cited:"",
  })

  const handleForm = () => {
    if (quote.quote && quote.cited) {
      const arr = [...form.quotes]
      arr.push({ quote:quote.quote, cited:quote.cited })
      setForm({ ...form, quotes:arr })
      setQuote({ ...quote, quote:'', cited:'' })
    } else {
      return
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <>  
        <View 
          style={{ 
            alignItems:'center',
            flexDirection:'column',
            gap:10,
            marginVertical:verticalScale(30)
          }}
        >
          <Label text="Add your favorite quotes!" style={{ marginVertical:verticalScale(20) }} />

          <Label 
            text="Quote" 
            style={{ 
              fontSize:verticalScale(14), 
              alignSelf:'flex-start',
              marginLeft:moderateScale(42)
            }} 
          />
          <CustomTextInput 
            autoCorrect={false}
            autoCapitalize={false}
            multiline={true}
            placeholder={'Ex. If you want to make the world a better place, take a look at yourself and make a change. Hooo'}
            value={quote.quote}
            onChangeText={input => setQuote({ ...quote, quote:input })}
            colors={colors}
            emoji={'🥸'}
            containerStyle={{
              height:verticalScale(75),
              marginBottom:verticalScale(14),
              backgroundColor:colors.secondary,
              borderRadius:0,
              borderWidth:2,
              borderColor:colors.tint,
              width:'90%',
              paddingRight:moderateScale(45)
            }}
            inputStyle={{
              fontSize:verticalScale(14),
              color:colors.tint,
            }}
          />

          <Label 
            text="Always cite your sources ;)" 
            style={{ 
              fontSize:verticalScale(14), 
              alignSelf:'flex-start',
              marginLeft:moderateScale(42)
            }} 
          />
          <CustomTextInput 
            autoCorrect={false}
            autoCapitalize={false}
            placeholder={'Ex. Lego Batman'}
            value={quote.cited}
            onChangeText={input => setQuote({ ...quote, cited:input })}
            colors={colors}
            emoji={'🏇'}
            containerStyle={{
              height:verticalScale(45),
              marginBottom:verticalScale(14),
              backgroundColor:colors.secondary,
              borderRadius:0,
              borderWidth:2,
              borderColor:colors.tint,
              width:'90%',
              paddingRight:moderateScale(45)
            }}
            inputStyle={{
              fontSize:verticalScale(14),
              color:colors.tint,
            }}
          />

          <CustomButton 
            onClick={() => handleForm()}
            style={{ 
              ...styles.addLink, 
              borderColor:colors.tint,
              backgroundColor:colors.accent,
              shadowColor:'#222',
              shadowOffset: { width:5, height:3 },
              shadowOpacity:1,
              shadowRadius:1, 
              borderRadius:0,
              borderWidth:2
            }}
          >
            <CustomText style={[styles.linkedText, { color:colors.white }]}>+ Add a quote</CustomText>
          </CustomButton>
          
          { form.quotes
            ?
              <FlatList 
                showsVerticalScrollIndicator={false}
                data={form.quotes}
                keyExtractor={item => item.quote}
                style={{ marginBottom:verticalScale(360) }}
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
            : null
          }
          
        </View>
      </>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
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
  },
  person: {
    fontSize:verticalScale(12),
    fontWeight:'500',
    padding:verticalScale(10),
  }
})