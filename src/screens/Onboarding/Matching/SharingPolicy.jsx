import React, { useState } from "react";
import {
  View,
  StyleSheet,
} from 'react-native';

import {
  moderateScale,
  verticalScale
} from 'react-native-size-matters';

// import Base from "../Components/Base";
import Label from "../Components/Label";
import CustomButton from "../../../components/UI/Custom/CustomButton";
import CustomText from "../../../components/UI/Custom/CustomText";
import MultipleChoiceOption from "./Components/MultipleChoiceOption";

import useGlobal from "../../../core/global";
import { colors } from "../../../constants/colors";


export default function SharingPolicyScreen({ route, navigation }) {

  // const { navTo, action } = route.params

  const user = useGlobal(state => state.user)
  const matchingForm = useGlobal(state => state.matchingForm)
  const setMatchingForm = useGlobal(state => state.setMatchingForm)
  const submitMatchingForm = useGlobal(state => state.submitMatchingForm)
  const editMatchingForm = useGlobal(state => state.editMatchingForm)

  // const handleQuiz = () => {
  //   if (action === 'create') {
  //     submitMatchingForm(matchingForm, user)
  //   } else {
  //     editMatchingForm(matchingForm, user)
  //   }
  // }

  return (
    <View style={styles.optionsContainer}>
      <MultipleChoiceOption 
        text="I'm cool with sharing everything - food, clothes, you name it … just maybe not my underwear."
        selected={matchingForm.sharing_policy}
        setSelected={() => setMatchingForm({ ...matchingForm, sharing_policy:"I'm cool with sharing everything - food, clothes, you name it … just maybe not my underwear." })}
      />
      <MultipleChoiceOption 
        text="I'm open to sharing some things, but not everything." 
        selected={matchingForm.sharing_policy}
        setSelected={() => setMatchingForm({ ...matchingForm, sharing_policy:"I'm open to sharing some things, but not everything." })}
      />
      <MultipleChoiceOption 
        text="Occasional sharing is chill, but not all the time." 
        selected={matchingForm.sharing_policy}
        setSelected={() => setMatchingForm({ ...matchingForm, sharing_policy:"Occasional sharing is chill, but not all the time." })}
      />
      <MultipleChoiceOption 
        text="I'm not big on sharing - my stuff is my stuff." 
        selected={matchingForm.sharing_policy}
        setSelected={() => setMatchingForm({ ...matchingForm, sharing_policy:"I'm not big on sharing - my stuff is my stuff." })}
      />
    </View>
        
    //     <CustomText
    //       style={{
    //         marginTop:verticalScale(25),
    //         fontSize:verticalScale(12),
    //         fontWeight:'bold'
    //       }}
    //     >
    //       Get your roommate quiz in and get going!
    //     </CustomText>
    //     <CustomButton
    //       onClick={() => {
    //         handleQuiz()
    //         navigation.navigate(navTo)
    //       }}
    //       style={{
    //         marginVertical:verticalScale(5),
    //         width:'80%',
    //         alignItems:'center',
    //         backgroundColor:colors.accent,
    //         paddingVertical:verticalScale(15),
    //         paddingHorizontal:moderateScale(30),
    //         shadowColor:'#222',
    //         shadowOffset: { width:5, height:3 },
    //         shadowOpacity:1,
    //         shadowRadius:1, 
    //         borderRadius:0,
    //         borderWidth:2
    //       }}
    //     >
    //       <CustomText
    //         style={{
    //           fontSize:verticalScale(14),
    //           color:colors.white,
    //           fontWeight:'bold',
    //         }}
    //       >
    //         All Done!!!
    //       </CustomText>
    //     </CustomButton>
    //   </View>
    // </>
  )
}

const styles = StyleSheet.create({
  optionsContainer: {
    flexDirection:'column',
    gap:verticalScale(20),
    backgroundColor:colors.secondary,
    padding:verticalScale(20),
    borderRadius:12,
    borderWidth:2,
    width:'100%',
    alignItems:'flex-start'
  }
})