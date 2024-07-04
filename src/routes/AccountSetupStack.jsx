import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { verticalScale, moderateScale } from "react-native-size-matters";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import CustomButton from "../components/UI/Custom/CustomButton";
import CustomText from "../components/UI/Custom/CustomText";

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

import BaseOnboardingCard from "../screens/Onboarding/Components/Card";

// matching
import MatchingPromptScreen from "../screens/Onboarding/Matching/MatchingPrompt";
import SocialBatteryScreen from "../screens/Onboarding/Matching/SocialBattery";
import CleanRoomScreen from "../screens/Onboarding/Matching/CleanRoom";
import NoiseLevelScreen from "../screens/Onboarding/Matching/NoiseLevel";
import GuestPolicyScreen from "../screens/Onboarding/Matching/GuestPolicy";
import InRoomScreen from "../screens/Onboarding/Matching/InRoom";
import HotColdScreen from "../screens/Onboarding/Matching/HotCold";
import BedTimeScreen from "../screens/Onboarding/Matching/BedTime";
import WakeUpScreen from "../screens/Onboarding/Matching/WakeUpTime";
import SharingPolicyScreen from "../screens/Onboarding/Matching/SharingPolicy";
import DoneScreen from '../screens/Onboarding/Done';

import { colors } from "../constants/colors";
import ProfileDetail from "../screens/ProfileDetail";
import useGlobal from "../core/global";



export default function AccountSetupStack() {
  return (
    <Stack.Navigator initialRouteName="start">
      <Stack.Screen
        name='start'
        component={PromptScreen}
        options={{ headerShown:false }}
        initialParams={{ 
          title: 'Ready to kick off your profile?',
          subtitle: "It'll only take a couple of minutes.",
          text: "That way",
          screen:'base',
          icon: "arrow-right-to-bracket"
        }}
      />
      <Stack.Screen
        name='base'
        component={BaseOnboardingCard}
        options={{ headerShown:false }}
        initialParams={{
          data: [
            {'id': 1, 'title': 'age', 'label': 'How old are you?'},
            {'id': 2, 'title': 'sex', 'label': 'I am a ...'},
            {'id': 3, 'title': 'hometown', 'label': 'Where are you from?'},
            {'id': 4, 'title': 'graduation_year', 'label': 'When will you graduate?'},
            {'id': 5, 'title': 'interests', 'label': "What're you into?"},
            {'id': 6, 'title': 'widgets', 'label': 'Customize your profile with prompts, quotes, and your social handles!'},
            {'id': 7, 'title': 'photos', 'label': 'Add a few photos!'},
            {'id': 8, 'title': 'dorm', 'label': 'Where will you be living next year?'},
          ]
        }}
      />
      <Stack.Screen
        name='matching-prompt'
        component={PromptScreen}
        options={{ headerShown:false }}
        initialParams={{ 
          title: 'Want to take our roommate matching quiz?',
          subtitle: "This'll up our game in matching you with people you'll get along with better!",
          text: "Let's do it!",
          screen:'base-matching',
          screen2:'done'
        }}
      />
      <Stack.Screen
        name='base-matching'
        component={BaseOnboardingCard}
        options={{ headerShown:false }}
        initialParams={{
          data: [
            {'id': 1, 'title': 'social-battery', 'label': "How's your social energy throughout the day?'"},
            {'id': 2, 'title': 'clean-room', 'label': 'How clean do you keep your room? 🧹'},
            {'id': 3, 'title': 'noise-level', 'label': 'How loud is it in your room most of the time?'},
            {'id': 4, 'title': 'guest-policy', 'label': 'What do you think about dorm guests? 🏨'},
            {'id': 5, 'title': 'in-room', 'label': "How much time do you spend in your room?"},
            {'id': 6, 'title': 'hot-cold', 'label': ' How hot or cold do you keep your room?'},
            {'id': 7, 'title': 'bed-time', 'label': 'When is it time for bed? 🥱'},
            {'id': 8, 'title': 'wake-up-time', 'label': 'What about wake up time? ☀️'},
            {'id': 9, 'title': 'sharing-policy', 'label': 'What do you think about sharing your stuff? 🧸'},
          ]
        }}
      />
      {/* <Stack.Screen
        name='social-battery'
        component={SocialBatteryScreen}
        options={{ headerShown:false }}
      />  
      <Stack.Screen
        name='clean-room'
        component={CleanRoomScreen}
        options={{ headerShown:false }}
      /> 
      <Stack.Screen
        name='noise-level'
        component={NoiseLevelScreen}
        options={{ headerShown:false }}
      />     
      <Stack.Screen
        name='guest-policy'
        component={GuestPolicyScreen}
        options={{ headerShown:false }}
      /> 
      <Stack.Screen
        name='in-room'
        component={InRoomScreen}
        options={{ headerShown:false }}
      /> 
      <Stack.Screen
        name='hot-cold'
        component={HotColdScreen}
        options={{ headerShown:false }}
      />
      <Stack.Screen
        name='bed-time'
        component={BedTimeScreen}
        options={{ headerShown:false }}
      /> 
      <Stack.Screen
        name='wake-up-time'
        component={WakeUpScreen}
        options={{ headerShown:false }}
      />
      <Stack.Screen
        name='sharing-policy'
        component={SharingPolicyScreen}
        options={{ headerShown:false }}
      />  */}
      <Stack.Screen
        name='done'
        component={PromptScreen}
        options={{ headerShown:false }}
        initialParams={{ 
          title: "You're all done!",
          subtitle: "Hit submit to create your profile and get swiping!",
          text: "Submit",
          screen:'',
          screen2:''
        }}
      />
      {/* 
      
      
      
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
          headerRight: () => <Header nav={() => navigation.navigate('bed-time')} icon="arrow-right" />,
          title: '',
          headerStyle: { backgroundColor:colors.primary },
          headerShadowVisible: false, // border bottom invisible
        })}
      /> 
      <Stack.Screen
        name='bed-time'
        component={BedTimeScreen}
        options={({ navigation }) => ({
          headerLeft: () => <Header nav={() => navigation.goBack()} icon="arrow-left" />,
          headerRight: () => <Header nav={() => navigation.navigate('wake-up-time')} icon="arrow-right" />,
          title: '',
          headerStyle: { backgroundColor:colors.primary },
          headerShadowVisible: false, // border bottom invisible
        })}
      /> 
      <Stack.Screen
        name='wake-up-time'
        component={WakeUpScreen}
        options={({ navigation }) => ({
          headerLeft: () => <Header nav={() => navigation.goBack()} icon="arrow-left" />,
          headerRight: () => <Header nav={() => navigation.navigate('sharing-policy', { navTo:'done', action:'create' })} icon="arrow-right" />,
          title: '',
          headerStyle: { backgroundColor:colors.primary },
          headerShadowVisible: false, // border bottom invisible
        })}
      /> 
      <Stack.Screen
        name='sharing-policy'
        component={SharingPolicyScreen}
        options={({ navigation }) => ({
          headerLeft: () => <Header nav={() => navigation.goBack()} icon="arrow-left" />,
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

      <Stack.Screen 
        name="preview"
        component={ProfileDetail}
        options={{ 
          headerShown:false,
          presentation:'modal'
        }}
      /> */}
    </Stack.Navigator>
  )
}