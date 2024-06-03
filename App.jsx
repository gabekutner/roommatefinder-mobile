import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { 
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import './src/core/fontawesome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import SplashScreen from './src/screens/SplashScreen';
import SignIn from './src/screens/Auth/SignIn';
import SignUp from './src/screens/Auth/SignUp';
import Home from './src/screens/Home';
import Message from './src/screens/Message';
import Search from './src/screens/Search';
import Onboarding from './src/screens/Onboarding';
import Requests from './src/screens/Requests';
import CreateProfile from './src/screens/Profile/CreateProfile';
import EditProfile from './src/screens/Profile/Edit/EditProfile';
import Settings from './src/screens/Settings';
import PhotoUpload from './src/screens/PhotoUpload';
import CreateProfilePrompt from './src/screens/Profile/Create/CreateProfilePrompt';


import AgeScreen from './src/screens/Onboarding/Age';
import SexScreen from './src/screens/Onboarding/Sex';
import HomeTownScreen from './src/screens/Onboarding/Hometown';
import GraduationYearScreen from './src/screens/Onboarding/GraduationYear';
import MajorScreen from './src/screens/Onboarding/Major';
import InterestsScreen from './src/screens/Onboarding/Interests';
import BaseWidgetsScreen from './src/screens/Onboarding/Widgets/BaseWidget';
import LinkTreeScreen from './src/screens/Onboarding/Widgets/LinkTree';
import PromptsScreen from './src/screens/Onboarding/Widgets/Prompts';
import QuotesScreen from './src/screens/Onboarding/Widgets/Quotes';
import PhotosScreen from './src/screens/Onboarding/Photos';


import useGlobal from './src/core/global';
import { colors as c } from './src/assets/config';


const Stack = createNativeStackNavigator()


export default function App() {

  // const initialized = useGlobal(state => state.initialized)
  // const authenticated = useGlobal(state => state.authenticated)
  // const profileCreated = useGlobal(state => state.profileCreated)
  const initialized = true
  const authenticated = true
  const profileCreated = false
  const init = useGlobal(state => state.init)
  const theme = useGlobal(state => state.theme)
  const activeColors = c[theme]

  useEffect(() => {
    init()
  }, [])

  return (
    <NavigationContainer>
      <StatusBar barStyle={activeColors.primary === '#1f2937' ? 'light-content' : 'dark-content'} />

      <Stack.Navigator>
        {!initialized ? (
            <Stack.Screen 
              name='splash' 
              component={SplashScreen} 
              options={{ headerShown:false }} 
            />
        ) : !authenticated ? (
          <>
            <Stack.Screen 
              name='onboarding' 
              component={Onboarding} 
              options={{ headerShown:false }}
            />
            <Stack.Screen 
              name='signin' 
              component={SignIn} 
              options={{ headerShown:false }}
            />
            <Stack.Screen 
              name='signup' 
              component={SignUp} 
              options={{ headerShown:false }}
            />
          </>
        ) : !profileCreated ? (
          <>
            <Stack.Screen 
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
            
            
          </>
        ) : (
          <>
            <Stack.Screen 
              name='home' 
              component={Home} 
              options={{ headerShown:false }}
            />
            <Stack.Screen 
              name='search' 
              component={Search} 
              options={{ headerShown:false }}
            />
            <Stack.Screen 
              name='messages' 
              component={Message} 
            />
            <Stack.Screen 
              name='requests' 
              component={Requests} 
              options={({ navigation }) => ({
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon 
                      icon='arrow-left'
                      size={22}
                      color={activeColors.tint}
                    />
                  </TouchableOpacity>
                ), 
                title: 'Friend Requests',
                headerTitleStyle: { color:activeColors.tint, fontSize:20, fontWeight:'500', fontFamily:'NotoSans_Condensed-Regular' },
                headerStyle: {
                  backgroundColor:activeColors.primary,
                },
                headerShadowVisible: false, // border bottom invisible
              })}
            />
            <Stack.Screen 
              name='edit-profile'
              component={EditProfile}
              options={({ navigation }) => ({
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon 
                      icon='arrow-left'
                      size={22}
                      color={activeColors.tint}
                    />
                  </TouchableOpacity>
                ), 
                title: 'Edit Profile',
                headerTitleStyle: { color:activeColors.tint, fontSize:20, fontWeight:'500', fontFamily:'NotoSans_Condensed-Regular' },
                headerStyle: {
                  backgroundColor:activeColors.primary,
                },
                headerShadowVisible: false, // border bottom invisible
              })}
            />
            <Stack.Screen 
              name="settings"
              component={Settings}
              options={{ headerShown:false }}
            />
            <Stack.Screen 
              name='photo-upload'
              component={PhotoUpload}
              options={({ navigation }) => ({
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon 
                      icon='arrow-left'
                      size={22}
                      color={activeColors.tint}
                    />
                  </TouchableOpacity>
                ), 
                title: 'Upload Photos',
                headerTitleStyle: { color:activeColors.tint, fontSize:20, fontWeight:'500', fontFamily:'NotoSans_Condensed-Regular' },
                headerStyle: {
                  backgroundColor:activeColors.primary,
                },
                headerShadowVisible: false, // border bottom invisible
              })}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}