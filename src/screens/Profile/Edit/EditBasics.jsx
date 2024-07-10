import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { moderateScale, verticalScale } from 'react-native-size-matters';

import ProfileImage from "../Components/ProfileImage";
import CustomText from "../../../components/UI/Custom/CustomText";
import CustomButton from "../../../components/UI/Custom/CustomButton";
import CustomTextInput from "../../../components/UI/Custom/CustomInput";

import useStore from "../../../zustand/store";
import { colors } from "../../../constants/colors";
import BasicModal from "../../../components/Modals/BasicModal";
import InterestsScreen from "../../Onboarding/Interests";
import DormScreen from "../../Onboarding/Dorm";


export default function EditBasicsScreen({ navigation }) {

  const user = useStore(state => state.user)
  const form = useStore(state => state.form)
  const editProfile = useStore(state => state.editProfile)

  const [interestsVisible, setInterestsVisible] = useState(false)
  const [dormVisible, setDormVisible] = useState(false)
  
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
    editProfile(_form, form, user)
    navigation.goBack()
  }

  return (
    <SafeAreaView style={{ flex:1, backgroundColor:colors.primary }}>
      <KeyboardAvoidingView behavior="padding" style={{ flex:1 }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
              <View style={{ alignItems:'center' }}>              
              
                <ProfileImage user={user} colors={colors} bc={colors.primary} bg={colors.secondary} />

                <View style={styles.doubleInput}>
                  <CustomTextInput 
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    placeholder={'Gabe'}
                    value={_form.name}
                    onChangeText={name => _setForm({ ..._form, name })}
                    icon="signature"
                    iconColor={colors.tertiary}
                    iconSize={verticalScale(13)}
                    colors={colors}
                    containerStyle={{ ...styles.inputContainer, width:'60%' }}
                    inputStyle={styles.inputText}
                  />
                  <CustomTextInput 
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    keyboardType={'numeric'}
                    placeholder={'2028'}
                    value={_form.graduation_year}
                    onChangeText={graduation_year => _setForm({ ..._form, graduation_year })}
                    icon="calendar-days"
                    iconColor={colors.tertiary}
                    iconSize={verticalScale(13)}
                    colors={colors}
                    containerStyle={{ ...styles.inputContainer, width:'40%' }}
                    inputStyle={styles.inputText}
                  />
                </View>

                <View style={styles.doubleInput}>
                  <CustomTextInput 
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    placeholder={'San Francisco'}
                    value={_form.city}
                    onChangeText={city => _setForm({ ..._form, city })}
                    icon="city"
                    iconColor={colors.tertiary}
                    iconSize={verticalScale(13)}
                    colors={colors}
                    containerStyle={{ ...styles.inputContainer, width:'70%' }}
                    inputStyle={styles.inputText}
                  />
                  <CustomTextInput 
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    placeholder={'CA'}
                    value={_form.state}
                    onChangeText={state => _setForm({ ..._form, state })}
                    icon="globe"
                    iconColor={colors.tertiary}
                    iconSize={verticalScale(13)}
                    iconStyle={{ marginRight:moderateScale(5) }}
                    colors={colors}
                    containerStyle={{ ...styles.inputContainer, width:'30%', paddingRight:moderateScale(35) }}
                    inputStyle={styles.inputText}
                  />
                </View>

                <CustomTextInput 
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  placeholder={'Computer Engineering'}
                  value={_form.major}
                  onChangeText={major => _setForm({ ..._form, major })}
                  icon="graduation-cap"
                  iconColor={colors.tertiary}
                  iconSize={verticalScale(13)}
                  colors={colors}
                  containerStyle={{ ...styles.inputContainer, width:'102%' }}
                  inputStyle={styles.inputText}
                />

                <CustomTextInput 
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  multiline={true}
                  placeholder={'Some super interesting bio ...'}
                  value={_form.description}
                  onChangeText={description => _setForm({ ..._form, description })}
                  icon="address-book"
                  iconColor={colors.tertiary}
                  iconSize={verticalScale(13)}
                  colors={colors}
                  containerStyle={{ ...styles.inputContainer, width:'102%', height:verticalScale(100) }}
                  inputStyle={styles.inputText}
                />

                <CustomButton 
                  shadow
                  onClick={() => setDormVisible(true)} 
                  style={{ ...styles.goto, marginTop:0 }}
                >
                  { dormVisible 
                    ? <BasicModal isVisible={dormVisible} setIsVisible={setDormVisible}>
                        <DormScreen />
                      </BasicModal>
                    : null
                  }
                  <CustomText style={styles.gotoText}>
                    Dorm
                  </CustomText>
                  <FontAwesomeIcon 
                    icon="arrow-right"
                    size={verticalScale(20)}
                    color={colors.tertiary}
                  />
                </CustomButton>

                <CustomButton 
                  shadow
                  onClick={() => setInterestsVisible(true)} 
                  style={styles.goto}
                >
                  { interestsVisible 
                    ? <BasicModal isVisible={interestsVisible} setIsVisible={setInterestsVisible}>
                        <InterestsScreen />
                      </BasicModal>
                    : null
                  }
                  <CustomText style={styles.gotoText}>
                    Interests
                  </CustomText>
                  <FontAwesomeIcon 
                    icon="arrow-right"
                    size={verticalScale(20)}
                    color={colors.tertiary}
                  />
                </CustomButton>

                <CustomButton 
                  shadow
                  onClick={() => navigation.navigate('linktree')} 
                  style={styles.goto}
                >
                  <CustomText style={styles.gotoText}>
                    Links
                  </CustomText>
                  <FontAwesomeIcon 
                    icon="arrow-right"
                    size={verticalScale(20)}
                    color={colors.tertiary}
                  />
                </CustomButton>

                <CustomButton 
                  shadow
                  onClick={() => navigation.navigate('quotes')} 
                  style={styles.goto}
                >
                  <CustomText style={styles.gotoText}>
                    Quotes
                  </CustomText>
                  <FontAwesomeIcon 
                    icon="arrow-right"
                    size={verticalScale(20)}
                    color={colors.tertiary}
                  />
                </CustomButton>

                <CustomButton 
                  shadow
                  onClick={() => navigation.navigate('prompts')} 
                  style={styles.goto}
                >
                  <CustomText style={styles.gotoText}>
                    Prompts
                  </CustomText>
                  <FontAwesomeIcon 
                    icon="arrow-right"
                    size={verticalScale(20)}
                    color={colors.tertiary}
                  />
                </CustomButton>

                <CustomButton 
                  shadow
                  onClick={() => navigation.navigate('photos')} 
                  style={styles.goto}
                >
                  <CustomText style={styles.gotoText}>
                    Upload Photos
                  </CustomText>
                  <FontAwesomeIcon 
                    icon="arrow-right"
                    size={verticalScale(20)}
                    color={colors.tertiary}
                  />
                </CustomButton>

                <CustomButton 
                  shadow
                  onClick={() => submit()} 
                  style={styles.buttonStyle}
                >
                  <CustomText style={styles.buttonText}>
                    All Done!
                  </CustomText>
                </CustomButton>

              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex:1, 
    justifyContent:'center' 
  },
  scrollContainer: {
    paddingHorizontal:moderateScale(25), 
  },
  doubleInput: {
    flexDirection:'row',
    gap:10,
  },
  inputContainer: {
    marginBottom:verticalScale(14),
    backgroundColor:colors.secondary,
    borderWidth:2,
    borderColor:colors.tint,
  },
  inputText: {
    color:colors.tint,
  },
  goto: {
    marginTop:verticalScale(10),
    backgroundColor:colors.secondary,
    flexDirection:'row',
    justifyContent:'space-between',
    width:'102%',
    padding:verticalScale(10),
    alignItems:'center',
    borderWidth:2,
    // shadowColor: '#000',
    // shadowOffset: { width: 1.5, height: 2 },
    // shadowOpacity: .7,
    // shadowRadius: .6, 
  },
  gotoText: {
    fontSize:verticalScale(14),
    fontWeight:'600',
    color:colors.tertiary
  },
  buttonStyle: {
    marginTop:verticalScale(15),
    borderWidth:2,
    borderColor:colors.tint,
    backgroundColor:colors.accent,
    shadowColor:'#222',
    shadowOffset:{ width:7, height:5 },
    shadowOpacity:1,
    shadowRadius:1,  
    width:'80%',
    marginBottom:verticalScale(50)
  },
  buttonText: {
    fontSize:verticalScale(16), 
    fontWeight:'600', 
    color:colors.white,
  },
})