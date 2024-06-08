import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { 
  moderateScale,
  verticalScale 
} from 'react-native-size-matters';

import Title from "../components/Brand/Title";
import DropDownMenu from "../components/DropDownMenu";

import Friends from "../screens/Friends";
import Profile from "../screens/Profile/Profile";
import Swipe from "../screens/SwipeScreen";
import Search from "../screens/Extras/Search";
import Requests from '../screens/Extras/Requests';
import Message from "../screens/Chat/Message";
import EditProfile from "../screens/Profile/Edit/EditProfile";
import Settings from "../screens/Settings";
import PhotoUpload from "../screens/PhotoUpload";


import ProfileDetail from '../screens/ProfileDetail';

import useGlobal from "../core/global";
import { colors } from "../constants/colors";


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
          options={{ headerShown:false }}
        />
      </Tab.Navigator>
    )
  }

  return (
    <Stack.Navigator>
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
          presentation:'modal'
        }}
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
        name='edit-profile'
        component={EditProfile}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FontAwesomeIcon 
                icon='arrow-left'
                size={22}
                color={colors.tint}
              />
            </TouchableOpacity>
          ), 
          title: 'Edit Profile',
          headerTitleStyle: { color:colors.tint, fontSize:20, fontWeight:'500', fontFamily:'NotoSans_Condensed-Regular' },
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
      <Stack.Screen 
        name='photo-upload'
        component={PhotoUpload}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FontAwesomeIcon 
                icon='arrow-left'
                size={22}
                color={colors.tint}
              />
            </TouchableOpacity>
          ), 
          title: 'Upload Photos',
          headerTitleStyle: { color:colors.tint, fontSize:20, fontWeight:'500', fontFamily:'NotoSans_Condensed-Regular' },
          headerStyle: {
            backgroundColor:colors.primary,
          },
          headerShadowVisible: false, // border bottom invisible
        })}
      />
    </Stack.Navigator>
  ) 
}