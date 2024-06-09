import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { 
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import './src/core/fontawesome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

// import SplashScreen from './src/screens/SplashScreen';
// import SignIn from './src/screens/Auth/SignIn';
// import SignUp from './src/screens/Auth/SignUp';
// import Home from './src/screens/Home';
// import Message from './src/screens/Message';
// import Search from './src/screens/Search';
// import Onboarding from './src/screens/Onboarding';
// import Requests from './src/screens/Requests';
// import CreateProfile from './src/screens/Profile/CreateProfile';
// import EditProfile from './src/screens/Profile/Edit/EditProfile';
// import Settings from './src/screens/Settings';
// import PhotoUpload from './src/screens/PhotoUpload';
// import CreateProfilePrompt from './src/screens/Profile/Create/CreateProfilePrompt';

// import AppStack from './src/routes/AppStack';

// import AgeScreen from './src/screens/Onboarding/Age';
// import SexScreen from './src/screens/Onboarding/Sex';
// import HomeTownScreen from './src/screens/Onboarding/Hometown';
// import GraduationYearScreen from './src/screens/Onboarding/GraduationYear';
// import MajorScreen from './src/screens/Onboarding/Major';
// import InterestsScreen from './src/screens/Onboarding/Interests';
// import BaseWidgetsScreen from './src/screens/Onboarding/Widgets/BaseWidget';
// import LinkTreeScreen from './src/screens/Onboarding/Widgets/LinkTree';
// import PromptsScreen from './src/screens/Onboarding/Widgets/Prompts';
// import QuotesScreen from './src/screens/Onboarding/Widgets/Quotes';
// import PhotosScreen from './src/screens/Onboarding/Photos';
// import DormScreen from './src/screens/Onboarding/Dorm';
// import DoneScreen from './src/screens/Onboarding/Done';


import useGlobal from './src/core/global';
import { colors as c } from './src/assets/config';


import SplashStack from './src/routes/SplashStack';
import AuthStack from './src/routes/AuthStack';
import AppStack from './src/routes/AppStack';
import AccountSetupStack from './src/routes/AccountSetupStack';




export default function App() {

  const initialized = useGlobal(state => state.initialized)
  const authenticated = useGlobal(state => state.authenticated)
  const profileCreated = useGlobal(state => state.profileCreated)
  // const initialized = true
  // const authenticated = true
  // const profileCreated = false
  const init = useGlobal(state => state.init)
  const theme = useGlobal(state => state.theme)
  const activeColors = c[theme]

  useEffect(() => {
    init()
  }, [])

  if (!initialized) {
    return (
      <NavigationContainer>
        <SplashStack />
      </NavigationContainer>
    )
  } else if (!authenticated) {
    return (
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    )
  } else if (!profileCreated) {
    return (
      <NavigationContainer>
        <AccountSetupStack />
      </NavigationContainer>
    )
  } else {
    return (
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    )
  }
}