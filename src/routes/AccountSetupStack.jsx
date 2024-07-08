import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import PromptScreen from "../screens/Onboarding/Prompt";
import BaseOnboardingCard from "../screens/Onboarding/Components/Card";
import LinkTreeScreen from "../screens/Onboarding/Widgets/LinkTree";
import QuotesScreen from "../screens/Onboarding/Widgets/Quotes";
import PromptsScreen from "../screens/Onboarding/Widgets/Prompts";


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
            {'id': 5, 'title': 'major', 'label': 'What do you want to major in?'},
            {'id': 6, 'title': 'interests', 'label': "What're you into?"},
            {'id': 7, 'title': 'widgets', 'label': 'Customize your profile with prompts, quotes, and your social handles!'},
            {'id': 8, 'title': 'photos', 'label': 'Add a few photos!'},
            {'id': 9, 'title': 'dorm', 'label': 'Where will you be living next year?'},
          ],
          next: 'matching-prompt'
        }}
      />
      {/* widgets */}
      <Stack.Screen
        name='linktree'
        component={LinkTreeScreen}
        options={{
          presentation:'modal',
          headerShown:false
        }}
      /> 
      <Stack.Screen
        name='quotes'
        component={QuotesScreen}
        options={{
          presentation:'modal',
          headerShown:false
        }}
      /> 
      <Stack.Screen
        name='prompts'
        component={PromptsScreen}
        options={{
          presentation:'modal',
          headerShown:false
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
            {'id': 1, 'title': 'social-battery', 'label': "How's your social energy throughout the day?"},
            {'id': 2, 'title': 'clean-room', 'label': 'How clean do you keep your room? 🧹'},
            {'id': 3, 'title': 'noise-level', 'label': 'How loud is it in your room most of the time?'},
            {'id': 4, 'title': 'guest-policy', 'label': 'What do you think about dorm guests? 🏨'},
            {'id': 5, 'title': 'in-room', 'label': "How much time do you spend in your room?"},
            {'id': 6, 'title': 'hot-cold', 'label': ' How hot or cold do you keep your room?'},
            {'id': 7, 'title': 'bed-time', 'label': 'When is it time for bed? 🥱'},
            {'id': 8, 'title': 'wake-up-time', 'label': 'What about wake up time? ☀️'},
            {'id': 9, 'title': 'sharing-policy', 'label': 'What do you think about sharing your stuff? 🧸'},
          ],
          next: 'done'
        }}
      />
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
      */}
    </Stack.Navigator>
  )
}