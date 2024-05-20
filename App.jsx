import 'react-native-gesture-handler';
import { useEffect } from 'react';
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
import SwipeProfile from './src/screens/SwipeProfile';
import Interests from './src/screens/Profile/Edit/Interests';

import useGlobal from './src/core/global';
import { colors as c } from './src/assets/config';


const Stack = createNativeStackNavigator()


export default function App() {

  const initialized = useGlobal(state => state.initialized)
  const authenticated = useGlobal(state => state.authenticated)
  const profileCreated = useGlobal(state => state.profileCreated)
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
              name='create-profile'
              component={CreateProfile}
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
              name="swipe-profile"
              component={SwipeProfile}
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
                title: '',
                headerStyle: {
                  backgroundColor:activeColors.primary,
                },
                headerShadowVisible: false, // border bottom invisible
              })}
            />
            <Stack.Screen 
              name="edit-interests"
              component={Interests}
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
                title: '',
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