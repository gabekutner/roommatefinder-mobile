import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { 
  StatusBar,
  View,
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
import CreateProfile from './src/screens/CreateProfile';

import useGlobal from './src/core/global';
import Colors from './src/assets/Colors';


const Stack = createNativeStackNavigator()


export default function App() {

  const initialized = useGlobal(state => state.initialized)
  const authenticated = useGlobal(state => state.authenticated)
  const profileCreated = useGlobal(state => state.profileCreated)
  const init = useGlobal(state => state.init)

  useEffect(() => {
    init()
  }, [])

  return (
    <NavigationContainer>
      <StatusBar barStyle={'dark-content'} />

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
              options={{ headerShown:false }}
            />
          </>
        ) }
      </Stack.Navigator>
    </NavigationContainer>
  )
}