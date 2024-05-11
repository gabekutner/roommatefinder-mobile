import { useEffect, useState } from "react";
import { 
  TouchableOpacity,
  View,
  Text,
  Switch
} from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import Friends from "./Friends";
import Profile from "./Profile";
import Swipe from "./SwipeScreen";

import useGlobal from "../core/global";
import {colors as c} from '../assets/config';


const Tab = createBottomTabNavigator()


function HeaderLogo({ logoColor }) {
  return (
    <View style={{ flexDirection:'row', flexWrap:'wrap', alignItems:'center', marginLeft:20, width:'110%' }}>
      <View style={{ width:30, height:30, backgroundColor:'#be0000' }} />
      <Text style={{ padding:5, fontWeight:'500', fontSize:20, color:logoColor, fontFamily:'Glegoo-Bold' }}>roommatefinder</Text>
    </View>
  )
}


export default function HomeScreen() {

  const socketConnect = useGlobal(state => state.socketConnect)
  const socketDisconnect = useGlobal(state => state.socketDisconnect)
  const setTheme = useGlobal(state => state.setTheme)
  const theme = useGlobal(state => state.theme)
  const activeColors = c[theme]

  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState)
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
            <View style={{ alignItems:'center', justifyContent:'center', top:10 }}>
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
          height:110,
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
            <View style={{ flexDirection:'row', gap:15, marginRight:20 }}>
              <Switch 
                style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }], alignSelf:'center' }}
                trackColor={{ true:activeColors.accent }}
                thumbColor='#fff'
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
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
                style={{ marginRight:20 }}
                size={27}
                color={activeColors.tint}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <Text 
              style={{
                marginLeft:20,
                color:activeColors.tint,
                fontSize:20,
                fontWeight:'500',
                fontFamily: 'NotoSans_Condensed-Regular',
              }}
            >
              Friends
            </Text>
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