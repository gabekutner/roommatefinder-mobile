import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  verticalScale,
  scale,
} from 'react-native-size-matters';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import CustomButton from "../components/UI/Custom/CustomButton";

// import CreateProfilePrompt from '../screens/Profile/Create/CreateProfilePrompt';
import PromptScreen from "../screens/Onboarding/Prompt";
import AgeScreen from '../screens/Onboarding/Age';
import SexScreen from '../screens/Onboarding/Sex';
import HomeTownScreen from '../screens/Onboarding/Hometown';
import GraduationYearScreen from '../screens/Onboarding/GraduationYear';
import MajorScreen from '../screens/Onboarding/Major';
import InterestsScreen from '../screens/Onboarding/Interests';
// widgets 
import BaseWidgetsScreen from '../screens/Onboarding/Widgets/BaseWidget';
import LinkTreeScreen from '../screens/Onboarding/Widgets/LinkTree';
import QuotesScreen from '../screens/Onboarding/Widgets/Quotes';
import PromptsScreen from '../screens/Onboarding/Widgets/Prompts';

import DormScreen from '../screens/Onboarding/Dorm';
import DoneScreen from '../screens/Onboarding/Done';

import { colors } from "../constants/colors";


const HeaderLeft = ({ navigation, icon }) => {
  return (
    <CustomButton 
      onClick={() => navigation.goBack()}
      style={{
        marginBottom:verticalScale(5),
        backgroundColor:colors.accent,
        width:scale(40),
        height:scale(40),
        shadowColor:'#222',
        shadowOffset: { width:5, height:3 },
        shadowOpacity:1,
        shadowRadius:1,  
        borderRadius:0,
        borderWidth:2
      }}
    >
      <FontAwesomeIcon 
        icon={icon}
        size={verticalScale(20)}
        color={colors.white}
      />
    </CustomButton>
  )
}


export default function AccountSetupStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='start'
        component={PromptScreen}
        options={{ headerShown:false }}
      />
      <Stack.Screen 
        name='age' 
        component={AgeScreen}
        options={({ navigation }) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} icon="arrow-left" />, 
          title: '',
          // headerTitle: () => <Title title="Settings" color={colors.tint} fontSize={verticalScale(20)} />,
          headerStyle: { backgroundColor:colors.primary },
          headerShadowVisible: false, // border bottom invisible
          // headerShown: false
        })}
      />
      {/* <Stack.Screen 
        name='create-profile-prompt'
        component={CreateProfilePrompt}
        options={{ headerShown:false }}
      />
      <Stack.Screen 
        name='age'
        component={AgeScreen}
        options={{ headerShown:false }}
      /> 
      <Stack.Screen 
        name='sex'
        component={SexScreen}
        options={{ headerShown:false }}
      />  
      <Stack.Screen 
        name='hometown'
        component={HomeTownScreen}
        options={{ headerShown:false }}
      />  
      <Stack.Screen 
        name='graduation_year'
        component={GraduationYearScreen}
        options={{ headerShown:false }}
      /> 
      <Stack.Screen 
        name='major'
        component={MajorScreen}
        options={{ headerShown:false }}
      />   
      <Stack.Screen 
        name='interests'
        component={InterestsScreen}
        options={{ headerShown:false }}
      /> 
      <Stack.Screen 
        name='widgets'
        component={BaseWidgetsScreen}
        options={{ headerShown:false }}
      />  
      <Stack.Screen 
        name='linktree'
        component={LinkTreeScreen}
        options={{ headerShown:false }}
      />  
      <Stack.Screen 
        name='prompts'
        component={PromptsScreen}
        options={{ headerShown:false }}
      />  
      <Stack.Screen 
        name='quotes'
        component={QuotesScreen}
        options={{ headerShown:false }}
      /> 
      <Stack.Screen 
        name='dorm'
        component={DormScreen}
        options={{ headerShown:false }}
      />  
      <Stack.Screen 
        name='done'
        component={DoneScreen}
        options={{ headerShown:false }}
      />   */}
    </Stack.Navigator>
  )
}