import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { 
  moderateScale,
  verticalScale,
  scale,
} from 'react-native-size-matters';

import Title from "../components/Brand/Title";
import DropDownMenu from "../components/DropDownMenu";
import CustomButton from "../components/UI/Custom/CustomButton";

import Friends from "../screens/Extras/Friends/Friends";
import Profile from "../screens/Profile/Profile";
import Swipe from "../screens/SwipeScreen";
import Search from "../screens/Extras/Search/Search";
import Requests from '../screens/Extras/Requests/Requests';
import Message from "../screens/Chat/Message";
import Settings from "../screens/Settings";
import ProfileDetail from '../screens/ProfileDetail';
import EditBasicsScreen from "../screens/Profile/Edit/EditBasics";

// matching quiz
import SocialBatteryScreen from "../screens/Onboarding/Matching/SocialBattery";
import CleanRoomScreen from "../screens/Onboarding/Matching/CleanRoom";
import NoiseLevelScreen from "../screens/Onboarding/Matching/NoiseLevel";
import GuestPolicyScreen from "../screens/Onboarding/Matching/GuestPolicy";
import InRoomScreen from "../screens/Onboarding/Matching/InRoom";
import HotColdScreen from "../screens/Onboarding/Matching/HotCold";
import BedTimeScreen from "../screens/Onboarding/Matching/BedTime";
import WakeUpScreen from "../screens/Onboarding/Matching/WakeUpTime";
import SharingPolicyScreen from "../screens/Onboarding/Matching/SharingPolicy";


import useGlobal from "../core/global";
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

export default function AppStack() {

  const socketConnect = useGlobal(state => state.socketConnect)
  const socketDisconnect = useGlobal(state => state.socketDisconnect)

  // Connect to backend socket
  useEffect(() => {
    socketConnect()
    return () => {
      socketDisconnect()
    }
  }, [])

  const Tabs = () => {

    const [open, setOpen] = useState(false)

    return (
      <Tab.Navigator
        initialRouteName="swipe"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            const icons = {
              swipe: 'home',
              friends: 'inbox',
              profile: 'user'
            }
            const icon = icons[route.name]
            return <FontAwesomeIcon icon={icon} size={verticalScale(24)} color={color} />					
          },
          tabBarActiveTintColor: colors.accent,
          headerShadowVisible: false, // border bottom invisible
          tabBarShowLabel: false,
          tabBarHideOnKeyboard:true,
          tabBarStyle: {
            borderTopWidth:0,
            position:'absolute',
            bottom:0, 
            right:0, 
            left:0, 
            elevation:0, 
            height:verticalScale(80),
            backgroundColor:colors.primary,
          }
        })}
      >
        <Tab.Screen 
          name="swipe" 
          component={Swipe} 
          options={({ navigation }) => ({
            headerTitle: () => <Title title="RoommateFinder" color={colors.tint} fontSize={verticalScale(20)} />,
            headerTitleAlign:'left',
            headerRight: () => (
              <TouchableOpacity 
                onPress={() => setOpen(!open)}
                style={{ 
                  marginRight:moderateScale(10),
                  marginBottom:verticalScale(5)
                }}
              >
                <FontAwesomeIcon 
                  icon='ellipsis-vertical'
                  size={verticalScale(20)}
                  color={colors.tint}
                />
                {open
                  ? <DropDownMenu navigation={navigation} colors={colors} />
                  : null
                }
              </TouchableOpacity>            
            ),
            headerRightContainerStyle: { paddingRight:moderateScale(10) },
            headerStyle: { backgroundColor:colors.primary },
            headerShadowVisible: false, // border bottom invisible
          })}
        />
        <Tab.Screen 
          name="friends" 
          component={Friends} 
          options={({ navigation }) => ({
            headerTitle: () => <Title title="Friends" color={colors.tint} fontSize={verticalScale(20)} />,
            headerTitleAlign:'left',
            headerRight: () => (
              <TouchableOpacity 
                onPress={() => navigation.navigate('search')}
                style={{
                  marginRight:moderateScale(20)
                }}
              >
                <FontAwesomeIcon 
                  icon="magnifying-glass"
                  size={verticalScale(20)}
                  color={colors.tint}
                />
              </TouchableOpacity>
            ),
            headerStyle: { backgroundColor:colors.primary },
            headerShadowVisible: false, // border bottom invisible
          })}
        />
        <Tab.Screen 
          name="profile" 
          component={Profile} 
          options={({ navigation }) => ({
            headerTitle: () => <Title title="Profile" color={colors.tint} fontSize={verticalScale(20)} />,
            headerTitleAlign:'left',
            headerRight: () => (
              <TouchableOpacity 
                onPress={() => navigation.navigate('edit-basics')}
                style={{ marginRight:moderateScale(20) }}
              >
                <FontAwesomeIcon 
                  icon="user-pen"
                  size={verticalScale(20)}
                  color={colors.tint}
                />
              </TouchableOpacity>
            ),
            headerStyle: { backgroundColor:colors.secondary },
            headerShadowVisible: false, // border bottom invisible
            
          })}
        />
      </Tab.Navigator>
    )
  }

  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen 
        name='home' 
        component={Tabs} 
        options={{ headerShown:false }}
      />
      <Stack.Screen 
        name='search' 
        component={Search} 
        options={{ headerShown:false }}
      />
      <Stack.Screen 
        name='profile-detail' 
        component={ProfileDetail} 
        options={{ 
          headerShown:false,
          presentation:'modal',
          gestureEnabled:false
        }}
      />
      <Stack.Screen 
        name='messages' 
        component={Message}
        options={{
          headerShadowVisible: false, // border bottom invisible
        }}
      />
      <Stack.Screen 
        name='requests' 
        component={Requests} 
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              style={{
                marginBottom:verticalScale(5)
              }}
            >
              <FontAwesomeIcon 
                icon='arrow-left'
                size={verticalScale(20)}
                color={colors.tint}
              />
            </TouchableOpacity>
          ), 
          headerTitle: () => <Title title="Roommate Matches" color={colors.tint} fontSize={verticalScale(20)} />,
          headerStyle: {
            backgroundColor:colors.primary,
          },
          headerShadowVisible: false, // border bottom invisible
        })}
      />
      <Stack.Screen 
        name='edit-basics' 
        component={EditBasicsScreen} 
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              style={{ marginBottom:verticalScale(5) }}
            >
              <FontAwesomeIcon 
                icon='arrow-left'
                size={verticalScale(20)}
                color={colors.tint}
              />
            </TouchableOpacity>
          ), 
          headerTitle: () => <Title title="Edit Profile" color={colors.tint} fontSize={verticalScale(20)} />,
          headerStyle: {
            backgroundColor:colors.primary,
          },
          headerShadowVisible: false, // border bottom invisible
        })}
      />
      <Stack.Screen 
        name='settings' 
        component={Settings} 
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              style={{
                marginBottom:verticalScale(5)
              }}
            >
              <FontAwesomeIcon 
                icon='arrow-left'
                size={verticalScale(20)}
                color={colors.tint}
              />
            </TouchableOpacity>
          ), 
          headerTitle: () => <Title title="Settings" color={colors.tint} fontSize={verticalScale(20)} />,
          headerStyle: {
            backgroundColor:colors.primary,
          },
          headerShadowVisible: false, // border bottom invisible
        })}
      />

      {/* matching quiz */}
      <Stack.Screen
        name='social-battery'
        component={SocialBatteryScreen}
        options={({ navigation }) => ({
          headerLeft:() => <View />,
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
          headerRight: () => <Header nav={() => navigation.navigate('sharing-policy', { navTo:'profile', action:'edit' })} icon="arrow-right" />,
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

    </Stack.Navigator>
  ) 
}