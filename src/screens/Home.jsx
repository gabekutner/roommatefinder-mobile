import React, { useEffect } from "react";
import { 
  TouchableOpacity,
  View,
  Image,
} from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { 
  moderateScale,
  verticalScale 
} from 'react-native-size-matters';

import CustomText from "../components/UI/Custom/CustomText";
// import Title from '../components/UI/Title';
import Title from "../components/Brand/Title";

import Friends from "./Friends";
import Profile from "./Profile/Profile";
import Swipe from "./SwipeScreen";

import useGlobal from "../core/global";
// import { colors as c } from '../assets/config';
import { colors } from "../constants/colors";


const Tab = createBottomTabNavigator()


// function ThemeSwitch({ colors, theme, onChange }) {
//   return (
//     <TouchableOpacity
//       onPress={onChange}
//     >
//       { theme === 'dark' ? 
//         <FontAwesomeIcon 
//           icon='sun'
//           size={27}
//           color={colors.tint}
//         /> 
//         : 
//         <FontAwesomeIcon 
//           icon='moon'
//           size={27}
//         />
//       }
//     </TouchableOpacity>
//   )
// }


export default function HomeScreen() {

  const socketConnect = useGlobal(state => state.socketConnect)
  const socketDisconnect = useGlobal(state => state.socketDisconnect)
  const setTheme = useGlobal(state => state.setTheme)
  // const theme = useGlobal(state => state.theme)
  // const colors = c[theme]

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
        tabBarIcon: ({ color }) => {
					const icons = {
						swipe: 'home',
						friends: 'inbox',
						profile: 'user'
					}
					const icon = icons[route.name]
					return (
            <View 
              style={{ 
                alignItems:'center', 
                justifyContent:'center', 
                top:verticalScale(10) 
              }}
            >
              <FontAwesomeIcon icon={icon} size={28} color={color} />
            </View>
					)
				},
				tabBarActiveTintColor: colors.accent,
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
          backgroundColor:colors.primary,
        }
      })}
    >
      <Tab.Screen 
        name="swipe" 
        component={Swipe} 
        options={({ navigation }) => ({
          headerTitle: () => <Title color={colors.tint} fontSize={verticalScale(20)} />,
          headerTitleAlign:'left',
          headerRight: () => (
            <View 
              style={{ 
                flexDirection:'row', 
                gap:15, 
                marginRight:17 
              }}
            >
              <TouchableOpacity 
                onPress={() => {}}
              >
                <FontAwesomeIcon 
                  icon='ellipsis-vertical'
                  size={verticalScale(20)}
                  color={colors.tint}
                />
              </TouchableOpacity>
            </View>
            
          ),
          headerStyle: {
            backgroundColor:colors.primary,
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
                color={colors.tint}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <CustomText 
              style={{
                marginLeft:20,
                color:colors.tint,
                fontSize:20,
                fontWeight:'500',
              }}
            >
              Friends
            </CustomText>
          ),
          title: '',
          headerStyle: {
            backgroundColor:colors.primary,
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