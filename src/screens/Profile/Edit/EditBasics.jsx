import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Pressable,
  View,
  StyleSheet,
} from 'react-native';

import {
  verticalScale,
  moderateScale
} from 'react-native-size-matters';

import CustomLabel from "../../../components/UI/Label";
import CustomTextInput from "../../../components/UI/Custom/CustomInput";
import Title from "../../../components/Brand/Title";

import useGlobal from "../../../core/global";
import { colors } from "../../../constants/colors";
import CustomButton from "../../../components/UI/Custom/CustomButton";
import CustomText from "../../../components/UI/Custom/CustomText";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";


export default function EditBasicsScreen({ navigation }) {

  const form = useGlobal(state => state.form)
  const [_form, _setForm] = useState({
    name: '',
    city: '',
    state: '',
    major: '',
    graduation_year: '',
    description: '',
    dorm_building: '',
    interests: [],
  })

  const submit = () => {
    _setForm({ ..._form, dorm_building:form.dorm_building })
    _setForm({ ..._form, interests:form.interests })
    console.log(_form)
  }

  return (
    <SafeAreaView 
      style={{ 
        flex:1, 
        backgroundColor:colors.primary 
      }}
    >
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View 
            style={{ 
              flex:1, 
              paddingHorizontal:25, 
              justifyContent:'center' 
            }}
          >

            <View style={{ marginBottom:verticalScale(20) }}>
              <CustomLabel color={colors.tint} label={'Name'} />
              <CustomTextInput 
                autoCapitalize={'none'}
                autoCorrect={false}
                placeholder={'Ex. Gabe'}
                value={_form.name}
                onChangeText={name => _setForm({ ..._form, name })}
                emoji={'👤'}
                colors={colors}
                containerStyle={{
                  height:verticalScale(45),
                  marginBottom:verticalScale(14),
                  backgroundColor:colors.secondary,
                  borderRadius:0,
                  borderWidth:2,
                  borderColor:colors.tint,
                }}
                inputStyle={{
                  fontSize:verticalScale(14),
                  color:colors.tint,
                }}
              />

              <CustomLabel color={colors.tint} label={'Password'} />
              <CustomTextInput 
                secureTextEntry={true}
                placeholder={'********'}
                
                colors={colors}
                emoji={'🔑'}
                containerStyle={{
                  height:verticalScale(45),
                  marginBottom:verticalScale(14),
                  backgroundColor:colors.secondary,
                  borderRadius:0,
                  borderWidth:2,
                  borderColor:colors.tint,
                }}
                inputStyle={{
                  fontSize:verticalScale(14),
                  color:colors.tint,
                }}
              />

              <CustomButton
                // onClick={() => onSignIn()}
                style={{ 
                  borderWidth:2,
                  borderColor:colors.tint,
                  backgroundColor:colors.accent,
                  borderRadius:0,
                  shadowColor: '#222',
                  shadowOffset: { width: 7, height: 5 },
                  shadowOpacity: 1,
                  shadowRadius: 1,  
                }}
              >
                <CustomText 
                  style={{ 
                    fontSize:verticalScale(16), 
                    fontWeight:'600', 
                    color:colors.white,
                  }}
                >
                  Log in
                </CustomText>
              </CustomButton>

              <Pressable 
                // onPress={() => navigation.navigate('signup')}
                style={{
                  flexDirection:'row',
                  gap:5,
                  marginTop:20,
                  justifyContent:'center',
                }}
              >
                <CustomText 
                  style={[
                    styles.text,
                    { 
                      color:colors.tint
                    }
                  ]}
                >
                  Don't have an account?{' '}
                  <CustomText 
                    style={[
                      styles.text, 
                      { 
                        color:colors.tint, 
                        textDecorationLine:'underline' 
                      }
                    ]}
                  >
                    Sign up
                  </CustomText>
                </CustomText>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  text: {
    fontSize:verticalScale(14), 
    fontWeight:'600',
    textAlign:'center',
    letterSpacing:0.15,
  }
})


//   return (
//     <SafeAreaView style={{ flex:1, backgroundColor:colors.primary }}>
//       <View style={{ marginHorizontal:moderateScale(25), marginTop:verticalScale(15) }}> 
//         <CustomLabel color={colors.tint} label="Name" />
//         <CustomTextInput 
//           autoCapitalize={'none'}
//           autoCorrect={false}
//           placeholder={'Ex. Gabe'}
//           value={_form.name}
//           onChangeText={name => _setForm({ ..._form, name })}
//           colors={colors}
//           emoji={'👤'}
//           containerStyle={{
//             height:verticalScale(45),
//             marginBottom:verticalScale(14),
//             backgroundColor:colors.secondary,
//             borderRadius:0,
//             borderWidth:2,
//             borderColor:colors.tint,
//           }}
//           inputStyle={{
//             fontSize:verticalScale(14),
//             color:colors.tint,
//           }}
//         />

//         <CustomLabel color={colors.tint} label="Major" />
//         <CustomTextInput 
//           autoCapitalize={'none'}
//           autoCorrect={false}
//           placeholder={'Ex. Business'}
//           value={_form.major}
//           onChangeText={major => _setForm({ ..._form, major })}
//           colors={colors}
//           emoji={'🎓'}
//           containerStyle={{
//             height:verticalScale(45),
//             marginBottom:verticalScale(14),
//             backgroundColor:colors.secondary,
//             borderRadius:0,
//             borderWidth:2,
//             borderColor:colors.tint,
//           }}
//           inputStyle={{
//             fontSize:verticalScale(14),
//             color:colors.tint,
//           }}
//         />

//         <CustomLabel color={colors.tint} label="Grad Year" />
//         <CustomTextInput 
//           autoCapitalize={'none'}
//           autoCorrect={false}
//           placeholder={'Ex. 2028'}
//           value={_form.graduation_year}
//           onChangeText={graduation_year => _setForm({ ..._form, graduation_year })}
//           colors={colors}
//           emoji={'🏫'}
//           containerStyle={{
//             height:verticalScale(45),
//             marginBottom:verticalScale(14),
//             backgroundColor:colors.secondary,
//             borderRadius:0,
//             borderWidth:2,
//             borderColor:colors.tint,
//           }}
//           inputStyle={{
//             fontSize:verticalScale(14),
//             color:colors.tint,
//           }}
//         />

//         <CustomLabel color={colors.tint} label="City, State" />
//         <View style={{ flexDirection:'row', gap:moderateScale(5) }}>
//           <CustomTextInput 
//             autoCapitalize={'none'}
//             autoCorrect={false}
//             placeholder={'Ex. San Francisco'}
//             value={_form.city}
//             onChangeText={city => _setForm({ ..._form, city })}
//             colors={colors}
//             emoji={'📍'}
//             containerStyle={{
//               height:verticalScale(45),
//               marginBottom:verticalScale(14),
//               backgroundColor:colors.secondary,
//               borderRadius:0,
//               borderWidth:2,
//               borderColor:colors.tint,
//               width:'75%'
//             }}
//             inputStyle={{
//               fontSize:verticalScale(14),
//               color:colors.tint,
//             }}
//           />
//           <CustomTextInput 
//             autoCapitalize={'none'}
//             autoCorrect={false}
//             placeholder={'Ex. CA'}
//             value={_form.state}
//             onChangeText={state => _setForm({ ..._form, state })}
//             colors={colors}
//             emoji={''}
//             containerStyle={{
//               height:verticalScale(45),
//               marginBottom:verticalScale(14),
//               backgroundColor:colors.secondary,
//               borderRadius:0,
//               borderWidth:2,
//               borderColor:colors.tint,
//               width:'25%'
//             }}
//             inputStyle={{
//               fontSize:verticalScale(14),
//               color:colors.tint,
//               marginLeft:moderateScale(-20)
//             }}
//           />
//         </View>

//         <CustomButton
//           onClick={() => navigation.navigate('dorm')}
//           style={{
//             flexDirection:'row',
//             justifyContent:'space-between',
//             borderWidth:2,
//             borderColor:colors.tint,
//             backgroundColor:colors.secondary,
//             borderRadius:0,
//             shadowColor: '#222',
//             shadowOffset: { width: 7, height: 5 },
//             shadowOpacity: 1,
//             shadowRadius: 1, 
//             paddingHorizontal:moderateScale(15)
//           }}
//         >
//           <CustomText style={{ fontSize:verticalScale(13), fontWeight:'600', color:colors.tint }}>
//             Change Dorm
//           </CustomText>
//           <FontAwesomeIcon 
//             icon='arrow-right'
//             size={verticalScale(22)}
//             color={colors.tint}
//           />
//         </CustomButton>

//         <CustomButton
//           onClick={() => navigation.navigate('interests')}
//           style={{
//             flexDirection:'row',
//             justifyContent:'space-between',
//             borderWidth:2,
//             borderColor:colors.tint,
//             backgroundColor:colors.secondary,
//             borderRadius:0,
//             shadowColor: '#222',
//             shadowOffset: { width: 7, height: 5 },
//             shadowOpacity: 1,
//             shadowRadius: 1, 
//             paddingHorizontal:moderateScale(15),
//             marginTop:verticalScale(10)
//           }}
//         >
//           <CustomText style={{ fontSize:verticalScale(13), fontWeight:'600', color:colors.tint }}>
//             Change Interests
//           </CustomText>
//           <FontAwesomeIcon 
//             icon='arrow-right'
//             size={verticalScale(22)}
//             color={colors.tint}
//           />
//         </CustomButton>

//         <CustomButton
//           onClick={() => submit()}
//           style={{
//               width:'80%',
//               alignSelf:'center',
//               marginTop:verticalScale(25),
//               backgroundColor:colors.accent,
//               paddingVertical:verticalScale(15),
//               paddingHorizontal:moderateScale(30),
//               shadowColor:'#222',
//               shadowOffset: { width:5, height:3 },
//               shadowOpacity:1,
//               shadowRadius:1, 
//               borderRadius:0,
//               borderWidth:2
//           }}
//         >
//           <CustomText
//             style={{
//               fontSize:verticalScale(14),
//               color:colors.white,
//               fontWeight:'bold'
//             }}
//           >
//             Submit
//           </CustomText>
//         </CustomButton>
//       </View>
//     </SafeAreaView>
//   )
// }