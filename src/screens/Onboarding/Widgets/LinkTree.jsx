import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';

import { 
  verticalScale,
  moderateScale 
} from "react-native-size-matters";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import Base from "../Components/Base";
import Label from "../Components/Label";
import CustomButton from "../../../components/UI/Custom/CustomButton";
import CustomText from "../../../components/UI/Custom/CustomText";
import CustomTextInput from '../../../components/UI/Custom/CustomInput'

import useGlobal from "../../../core/global";
import { colors } from "../../../constants/colors";


export default function LinkTreeScreen({ navigation }) {

  const form = useGlobal(state => state.form)
  const setForm = useGlobal(state => state.setForm)

  const [link, setLink] = useState({
    title:"",
    link:"",
  })

  const handleForm = () => {
    if (link.title && link.link) {
      const arr = [...form.links]
      arr.push({ title:link.title, link:link.link })
      setForm({ ...form, links:arr })
      setLink({ ...link, title:'', link:'' })
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
          <Label text="Add your social handles!" style={{ marginVertical:verticalScale(20) }} />

          <Label 
            text="Title" 
            style={{ 
              fontSize:verticalScale(14), 
              alignSelf:'flex-start',
              marginLeft:moderateScale(42)
            }} 
          />
          <CustomTextInput 
            autoCorrect={false}
            autoCapitalize={false}
            placeholder={'Ex. insta'}
            value={link.title}
            onChangeText={input => setLink({ ...link, title:input })}
            colors={colors}
            emoji={'🤖'}
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

          <Label 
            text="Link" 
            style={{ 
              fontSize:verticalScale(14), 
              alignSelf:'flex-start',
              marginLeft:moderateScale(42)
            }} 
          />
          <CustomTextInput 
            autoCorrect={false}
            autoCapitalize={false}
            placeholder={'Ex. instagram.com/gabekutner'}
            value={link.link}
            onChangeText={input => setLink({ ...link, link:input })}
            colors={colors}
            emoji={'🔗'}
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
            <CustomText style={[styles.linkedText, { color:colors.white }]}>+ Add a link</CustomText>
          </CustomButton>
          
          { form.links
            ?
              <FlatList 
                showsVerticalScrollIndicator={false}
                data={form.links}
                keyExtractor={item => item.link}
                style={{ marginBottom:verticalScale(320) }}
                numColumns={2}
                renderItem={({ item }) => (
                  <View 
                    style={{
                      ...styles.linked, 
                      borderColor: colors.tint,
                      backgroundColor: colors.secondary,
                      flexDirection:'row',
                      gap:15,
                      marginHorizontal:moderateScale(5)
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