import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback
} from 'react-native';

import { verticalScale, moderateScale } from "react-native-size-matters";

import CustomButton from "../../../components/UI/Custom/CustomButton";
import CustomText from "../../../components/UI/Custom/CustomText";
import CustomTextInput from '../../../components/UI/Custom/CustomInput'

import useStore from "../../../zustand/store";
import { colors } from "../../../constants/colors";


export default function LinkTreeScreen({ navigation }) {

  const form = useState(state => state.form)
  const setForm = useStore(state => state.setForm)

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
    <SafeAreaView style={{ flex:1, backgroundColor:colors.primary }}>
      <KeyboardAvoidingView behavior="padding" style={{ flex:1 }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <View style={styles.wrapper}>
              <View style={{ marginBottom:verticalScale(20) }}>

                <CustomText style={{ fontSize:verticalScale(15), fontWeight:'500', alignSelf:'center', marginBottom:verticalScale(20) }}>
                  Add your social handles!
                </CustomText>

                <CustomTextInput 
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  // keyboardType={'email-address'}
                  placeholder={'gabe@example.com'}
                  value={form.email}
                  onChangeText={email => setForm({ ...form, email })}
                  icon="envelope"
                  iconColor={colors.tertiary}
                  colors={colors}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.inputText}
                />

                <CustomTextInput 
                  secureTextEntry={true}
                  placeholder={'********'}
                  value={form.password}
                  onChangeText={password => setForm({ ...form, password })}
                  colors={colors}
                  icon='lock'
                  iconColor={colors.tertiary}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.inputText}
                />

                <CustomButton onClick={() => onSignIn()} style={styles.buttonStyle}>
                  <CustomText style={styles.buttonText}>
                    Log in
                  </CustomText>
                </CustomButton>

              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )

  // return (
    // <KeyboardAvoidingView style={styles.container} behavior="padding">
    //   <>  
    //     <View 
    //       style={{ 
    //         alignItems:'center',
    //         flexDirection:'column',
    //         gap:10,
    //         marginVertical:verticalScale(30)
    //       }}
    //     >
    //       <Label text="Add your social handles!" style={{ marginVertical:verticalScale(20) }} />

    //       <Label 
    //         text="Title" 
    //         style={{ 
    //           fontSize:verticalScale(14), 
    //           alignSelf:'flex-start',
    //           marginLeft:moderateScale(42)
    //         }} 
    //       />
    //       <CustomTextInput 
    //         autoCorrect={false}
    //         autoCapitalize={false}
    //         placeholder={'Ex. insta'}
    //         value={link.title}
    //         onChangeText={input => setLink({ ...link, title:input })}
    //         colors={colors}
    //         emoji={'🤖'}
    //         containerStyle={{
    //           height:verticalScale(45),
    //           marginBottom:verticalScale(14),
    //           backgroundColor:colors.secondary,
    //           borderRadius:0,
    //           borderWidth:2,
    //           borderColor:colors.tint,
    //           width:'90%',
    //           paddingRight:moderateScale(45)
    //         }}
    //         inputStyle={{
    //           fontSize:verticalScale(14),
    //           color:colors.tint,
    //         }}
    //       />

    //       <Label 
    //         text="Link" 
    //         style={{ 
    //           fontSize:verticalScale(14), 
    //           alignSelf:'flex-start',
    //           marginLeft:moderateScale(42)
    //         }} 
    //       />
    //       <CustomTextInput 
    //         autoCorrect={false}
    //         autoCapitalize={false}
    //         placeholder={'Ex. instagram.com/gabekutner'}
    //         value={link.link}
    //         onChangeText={input => setLink({ ...link, link:input })}
    //         colors={colors}
    //         emoji={'🔗'}
    //         containerStyle={{
    //           height:verticalScale(45),
    //           marginBottom:verticalScale(14),
    //           backgroundColor:colors.secondary,
    //           borderRadius:0,
    //           borderWidth:2,
    //           borderColor:colors.tint,
    //           width:'90%',
    //           paddingRight:moderateScale(45)
    //         }}
    //         inputStyle={{
    //           fontSize:verticalScale(14),
    //           color:colors.tint,
    //         }}
    //       />

    //       <CustomButton 
    //         onClick={() => handleForm()}
    //         style={{ 
    //           ...styles.addLink, 
    //           borderColor:colors.tint,
    //           backgroundColor:colors.accent,
    //           shadowColor:'#222',
    //           shadowOffset: { width:5, height:3 },
    //           shadowOpacity:1,
    //           shadowRadius:1, 
    //           borderRadius:0,
    //           borderWidth:2
    //         }}
    //       >
    //         <CustomText style={[styles.linkedText, { color:colors.white }]}>+ Add a link</CustomText>
    //       </CustomButton>
          
    //       { form.links
    //         ?
    //           <FlatList 
    //             showsVerticalScrollIndicator={false}
    //             data={form.links}
    //             keyExtractor={item => item.link}
    //             style={{ marginBottom:verticalScale(320) }}
    //             numColumns={2}
    //             renderItem={({ item }) => (
    //               <View 
    //                 style={{
    //                   ...styles.linked, 
    //                   borderColor: colors.tint,
    //                   backgroundColor: colors.secondary,
    //                   flexDirection:'row',
    //                   gap:15,
    //                   marginHorizontal:moderateScale(5)
    //                 }}
    //               >
    //                 <FontAwesomeIcon 
    //                   icon="link"
    //                   size={22}
    //                   color={colors.tint}
    //                 />
    //                 <CustomText style={[styles.linkedText, { color:colors.tint }]}>{item.title}</CustomText>
    //               </View>
    //             )}
    //           />
    //         : null
    //       }
          
    //     </View>
    //   </>
    // </KeyboardAvoidingView>
  // )
}

const styles = StyleSheet.create({
  container: {
    flex:1, 
    justifyContent:'center',
    width:'95%',
    alignSelf:'center',        
  },
  wrapper: {
    backgroundColor:colors.primary, 
    paddingVertical:verticalScale(10), 
    paddingHorizontal:moderateScale(25),
    borderRadius:12,
    borderWidth:2,
    shadowColor: '#222',
    shadowOffset: { width: 5, height: 3 },
    shadowOpacity: .7,
    shadowRadius: 1,  
  },
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  // },
  // linked: {
  //   padding:verticalScale(15),
  //   borderWidth:1,
  //   borderRadius:0,
  //   marginBottom:verticalScale(10),
  //   shadowColor: '#222',
  //   shadowOffset: { width: 7, height: 5 },
  //   shadowOpacity: 1,
  //   shadowRadius: 1,  
  // },
  // linkedText: {
  //   fontSize:verticalScale(12),
  //   fontWeight:'500',
  // },
  // addLink: {
  //   padding:verticalScale(15),
  //   marginBottom:verticalScale(10)
  // }
})