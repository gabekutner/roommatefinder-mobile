import React, { useEffect } from "react";
import { 
  TouchableOpacity,
  View,
  Text,
} from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { scale, verticalScale } from 'react-native-size-matters';

import CustomText from "../components/UI/Custom/CustomText";
import Title from '../components/UI/Title';
import Friends from "./Friends";
import Profile from "./Profile/Profile";
import Swipe from "./SwipeScreen";

import useGlobal from "../core/global";
import {colors as c} from '../assets/config';


const Tab = createBottomTabNavigator()


function HeaderLogo({ logoColor }) {
  return (
    <View style={{ flexDirection:'row', flexWrap:'wrap', alignItems:'center', marginLeft:17, width:'110%' }}>
      <View style={{ width:30, height:30, backgroundColor:'#be0000' }} />
      <Title 
        text="roommatefinder"
        style={{
          padding:5, 
          fontSize:scale(16), 
          color:logoColor, 
          fontFamily:'Glegoo-Bold'
        }}
      />
    </View>
  )
}

function ThemeSwitch({ colors, theme, onChange }) {
  return (
    <TouchableOpacity
      onPress={onChange}
    >
      { theme === 'dark' ? 
        <FontAwesomeIcon 
          icon='sun'
          size={27}
          color={colors.tint}
        /> 
        : 
        <FontAwesomeIcon 
          icon='moon'
          size={27}
        />
      }
    </TouchableOpacity>
  )
}


export default function HomeScreen() {

  const socketConnect = useGlobal(state => state.socketConnect)
  const socketDisconnect = useGlobal(state => state.socketDisconnect)
  const setTheme = useGlobal(state => state.setTheme)
  const theme = useGlobal(state => state.theme)
  const activeColors = c[theme]

  const toggleSwitch = () => {
    setTheme()
  }

  useEffect(() => {
    socketConnect()
    return () => {
      socketDisconnect()
    }
  }, [])

  return (
    <Tab.Navigator
      initialRouteName="swipe"
      screenOptions={({ route }) => ({
        // https://fontawesome.com/search
        tabBarIcon: ({ color }) => {
					const icons = {
						swipe: 'home',
						friends: 'inbox',
						profile: 'user'
					}
					const icon = icons[route.name]
					return (
            <View style={{ alignItems:'center', justifyContent:'center', top:verticalScale(10) }}>
              <FontAwesomeIcon icon={icon} size={28} color={color} />
            </View>
					)
				},
				tabBarActiveTintColor: activeColors.accent,
        headerShadowVisible: false, // border bottom invisible
				tabBarShowLabel: false,
        tabBarHideOnKeyboard:true,
        tabBarStyle: {
          borderTopWidth:0,
          position:'absolute',
          bottom:0, //25
          right:0, //20
          left:0, //20
          elevation:0, 
          height:verticalScale(90),
          backgroundColor:activeColors.primary,
        }
      })}
    >
      <Tab.Screen 
        name="swipe" 
        component={Swipe} 
        options={({ navigation }) => ({
          headerLeft: () => <HeaderLogo logoColor={activeColors.tint}/>,
          headerRight: () => (
            <View style={{ flexDirection:'row', gap:15, marginRight:17 }}>
              <ThemeSwitch 
                colors={activeColors} 
                theme={theme} 
                onChange={toggleSwitch} 
              />
              <TouchableOpacity onPress={() => navigation.navigate('requests')}>
                <FontAwesomeIcon 
                  icon="bell"
                  size={27}
                  color={activeColors.tint}
                />
              </TouchableOpacity>
            </View>
            
          ),
          title: '',
          headerStyle: {
            backgroundColor:activeColors.primary,
          },
          headerShadowVisible: false, // border bottom invisible
        })}
      />
      <Tab.Screen 
        name="friends" 
        component={Friends} 
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('search')}>
              <FontAwesomeIcon 
                icon="magnifying-glass"
                style={{ marginRight:17 }}
                size={27}
                color={activeColors.tint}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <CustomText 
              style={{
                marginLeft:20,
                color:activeColors.tint,
                fontSize:20,
                fontWeight:'500',
              }}
            >
              Friends
            </CustomText>
          ),
          title: '',
          headerStyle: {
            backgroundColor:activeColors.primary,
          },
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