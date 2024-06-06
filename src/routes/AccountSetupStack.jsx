import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

// import SplashScreen from '../screens/SplashScreen';
// import CreateProfilePrompt from '../screens/Profile/'


export default function AccountSetupStack() {
  return (
    <Stack.Navigator>
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
        name='photos'
        component={PhotosScreen}
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