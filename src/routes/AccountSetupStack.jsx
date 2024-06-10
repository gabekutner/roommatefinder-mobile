import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
 verticalScale,
 scale,
} from 'react-native-size-matters';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();


import CustomButton from "../components/UI/Custom/CustomButton";

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

import PhotosScreen from "../screens/Onboarding/Photos";
import DormScreen from '../screens/Onboarding/Dorm';

// matching
import MatchingPromptScreen from "../screens/Onboarding/Matching/MatchingPrompt";
import SocialBatteryScreen from "../screens/Onboarding/Matching/SocialBattery";
import CleanRoomScreen from "../screens/Onboarding/Matching/CleanRoom";
import NoiseLevelScreen from "../screens/Onboarding/Matching/NoiseLevel";
import GuestPolicyScreen from "../screens/Onboarding/Matching/GuestPolicy";
import InRoomScreen from "../screens/Onboarding/Matching/InRoom";
import HotColdScreen from "../screens/Onboarding/Matching/HotCold";

import DoneScreen from '../screens/Onboarding/Done';

import { colors } from "../constants/colors";


const Header = ({ nav, icon }) => {
  return (
    <CustomButton
      onClick={nav}
      style={{
        marginTop:verticalScale(2),
        marginBottom:verticalScale(5),
        backgroundColor:colors.accent,
        width:scale(30),
        height:scale(30),
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
          headerLeft: () => <Header nav={() => navigation.goBack()} icon="arrow-left" />,
          headerRight: () => <Header nav={() => navigation.navigate('sex')} icon="arrow-right" />,
          title: '',
          headerStyle: { backgroundColor:colors.primary },
          headerShadowVisible: false, // border bottom invisible
        })}
      />
      <Stack.Screen
        name='sex'
        component={SexScreen}
        options={({ navigation }) => ({
          headerLeft: () => <Header nav={() => navigation.goBack()} icon="arrow-left" />,
          headerRight: () => <Header nav={() => navigation.navigate('hometown')} icon="arrow-right" />,
          title: '',
          headerStyle: { backgroundColor:colors.primary },
          headerShadowVisible: false, // border bottom invisible
        })}
      />
      <Stack.Screen
        name='hometown'
        component={HomeTownScreen}
        options={({ navigation }) => ({
          headerLeft: () => <Header nav={() => navigation.goBack()} icon="arrow-left" />,
          headerRight: () => <Header nav={() => navigation.navigate('graduation_year')} icon="arrow-right" />,
          title: '',
          headerStyle: { backgroundColor:colors.primary },
          headerShadowVisible: false, // border bottom invisible
        })}
      />
      <Stack.Screen
        name='graduation_year'
        component={GraduationYearScreen}
        options={({ navigation }) => ({
          headerLeft: () => <Header nav={() => navigation.goBack()} icon="arrow-left" />,
          headerRight: () => <Header nav={() => navigation.navigate('major')} icon="arrow-right" />,
          title: '',
          headerStyle: { backgroundColor:colors.primary },
          headerShadowVisible: false, // border bottom invisible
        })}
      />
      <Stack.Screen
        name='major'
        component={MajorScreen}
        options={({ navigation }) => ({
          headerLeft: () => <Header nav={() => navigation.goBack()} icon="arrow-left" />,
          headerRight: () => <Header nav={() => navigation.navigate('interests')} icon="arrow-right" />,
          title: '',
          headerStyle: { backgroundColor:colors.primary },
          headerShadowVisible: false, // border bottom invisible
        })}
      />
      <Stack.Screen
        name='interests'
        component={InterestsScreen}
        options={({ navigation }) => ({
          headerLeft: () => <Header nav={() => navigation.goBack()} icon="arrow-left" />,
          headerRight: () => <Header nav={() => navigation.navigate('widgets')} icon="arrow-right" />,
          title: '',
          headerStyle: { backgroundColor:colors.primary },
          headerShadowVisible: false, // border bottom invisible
        })}
      />
      <Stack.Screen
        name='widgets'
        component={BaseWidgetsScreen}
        options={({ navigation }) => ({
          headerLeft: () => <Header nav={() => navigation.goBack()} icon="arrow-left" />,
          headerRight: () => <Header nav={() => navigation.navigate('photos')} icon="arrow-right" />,
          title: '',
          headerStyle: { backgroundColor:colors.primary },
          headerShadowVisible: false, // border bottom invisible
        })}
      />
      <Stack.Screen
        name='linktree'
        component={LinkTreeScreen}
        options={({ navigation }) => ({
          headerLeft: () => <Header nav={() => navigation.goBack()} icon="arrow-left" />,
          title: '',headerStyle: { backgroundColor:colors.primary },
          headerShadowVisible: false, // border bottom invisible
        })}
      /> 
      <Stack.Screen
        name='prompts'
        component={PromptsScreen}
        options={({ navigation }) => ({
          headerLeft: () => <Header nav={() => navigation.goBack()} icon="arrow-left" />,
          title: '',
          headerStyle: { backgroundColor:colors.primary },
          headerShadowVisible: false, // border bottom invisible
        })}
      /> 
      <Stack.Screen
        name='quotes'
        component={QuotesScreen}
        options={({ navigation }) => ({
          headerLeft: () => <Header nav={() => navigation.goBack()} icon="arrow-left" />,
          title: '',
          headerStyle: { backgroundColor:colors.primary },
          headerShadowVisible: false, // border bottom invisible
        })}
      /> 
      <Stack.Screen
        name='photos'
        component={PhotosScreen}
        options={({ navigation }) => ({
          headerLeft: () => <Header nav={() => navigation.goBack()} icon="arrow-left" />,
          headerRight: () => <Header nav={() => navigation.navigate('dorm')} icon="arrow-right" />,
          title: '',
          headerStyle: { backgroundColor:colors.primary },
          headerShadowVisible: false, // border bottom invisible
        })}
      /> 
      <Stack.Screen
        name='dorm'
        component={DormScreen}
        options={({ navigation }) => ({
          headerLeft: () => <Header nav={() => navigation.goBack()} icon="arrow-left" />,
          headerRight: () => <Header nav={() => navigation.navigate('matching-prompt')} icon="arrow-right" />,
          title: '',
          headerStyle: { backgroundColor:colors.primary },
          headerShadowVisible: false, // border bottom invisible
        })}
      />

      {/* Matching */}
      <Stack.Screen
        name='matching-prompt'
        component={MatchingPromptScreen}
        options={({ navigation }) => ({
          headerLeft: () => <Header nav={() => navigation.goBack()} icon="arrow-left" />,
          title: '',
          headerStyle: { backgroundColor:colors.primary },
          headerShadowVisible: false, // border bottom invisible
        })}
      />
      <Stack.Screen
        name='social-battery'
        component={SocialBatteryScreen}
        options={({ navigation }) => ({
          headerLeft: () => <Header nav={() => navigation.goBack()} icon="arrow-left" />,
          headerRight: () => <Header nav={() => navigation.navigate('clean-room')} icon="arrow-right" />,
          title: '',
          headerStyle: { backgroundColor:colors.primary },
          headerShadowVisible: false, // border bottom invisible
        })}
      />  
      <Stack.Screen
        name='clean-room'
        component={CleanRoomScreen}
        options={({ navigation }) => ({
          headerLeft: () => <Header nav={() => navigation.goBack()} icon="arrow-left" />,
          headerRight: () => <Header nav={() => navigation.navigate('noise-level')} icon="arrow-right" />,
          title: '',
          headerStyle: { backgroundColor:colors.primary },
          headerShadowVisible: false, // border bottom invisible
        })}
      /> 
      <Stack.Screen
        name='noise-level'
        component={NoiseLevelScreen}
        options={({ navigation }) => ({
          headerLeft: () => <Header nav={() => navigation.goBack()} icon="arrow-left" />,
          headerRight: () => <Header nav={() => navigation.navigate('guest-policy')} icon="arrow-right" />,
          title: '',
          headerStyle: { backgroundColor:colors.primary },
          headerShadowVisible: false, // border bottom invisible
        })}
      />     
      <Stack.Screen
        name='guest-policy'
        component={GuestPolicyScreen}
        options={({ navigation }) => ({
          headerLeft: () => <Header nav={() => navigation.goBack()} icon="arrow-left" />,
          headerRight: () => <Header nav={() => navigation.navigate('in-room')} icon="arrow-right" />,
          title: '',
          headerStyle: { backgroundColor:colors.primary },
          headerShadowVisible: false, // border bottom invisible
        })}
      /> 
      <Stack.Screen
        name='in-room'
        component={InRoomScreen}
        options={({ navigation }) => ({
          headerLeft: () => <Header nav={() => navigation.goBack()} icon="arrow-left" />,
          headerRight: () => <Header nav={() => navigation.navigate('hot-cold')} icon="arrow-right" />,
          title: '',
          headerStyle: { backgroundColor:colors.primary },
          headerShadowVisible: false, // border bottom invisible
        })}
      /> 
      <Stack.Screen
        name='hot-cold'
        component={HotColdScreen}
        options={({ navigation }) => ({
          headerLeft: () => <Header nav={() => navigation.goBack()} icon="arrow-left" />,
          headerRight: () => <Header nav={() => navigation.navigate('')} icon="arrow-right" />,
          title: '',
          headerStyle: { backgroundColor:colors.primary },
          headerShadowVisible: false, // border bottom invisible
        })}
      /> 

      <Stack.Screen
        name='done'
        component={DoneScreen}
        options={({ navigation }) => ({
          headerLeft: () => <Header nav={() => navigation.goBack()} icon="arrow-left" />,
          title: '',
          headerStyle: { backgroundColor:colors.primary },
          headerShadowVisible: false, // border bottom invisible
        })}
      />
    </Stack.Navigator>
  )
}
