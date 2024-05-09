import { 
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import Requests from "./Requests";
import Friends from "./Friends";
import Profile from "./Profile";

import Colors from "../assets/Colors";

const Tab = createBottomTabNavigator()


export default function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        // https://fontawesome.com/search
        tabBarIcon: ({ focused, color, size }) => {
					const icons = {
						requests: 'bell',
						friends: 'inbox',
						profile: 'user'
					}
					const icon = icons[route.name]
					return (
            <View style={{ alignItems:'center', justifyContent:'center', top: 10 }}>
              <FontAwesomeIcon icon={icon} size={28} color={color} />
            </View>
					)
				},
				tabBarActiveTintColor: '#be0000',
				tabBarShowLabel: false,
        initialRouteName:'friends',
        tabBarHideOnKeyboard:true,
        tabBarStyle: {
          borderTopWidth:0,
          position:'absolute',
          bottom:0, //25
          right:0, //20
          left:0, //20
          elevation:0, 
          height:110,
          backgroundColor:'transparent',
        }
      })}
    >
      <Tab.Screen 
        name="requests" 
        component={Requests} 
        options={{ headerShown:false }}
      />
      <Tab.Screen 
        name="friends" 
        component={Friends} 
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('search')}>
              <FontAwesomeIcon 
                icon="magnifying-glass"
                style={{ marginRight:16 }}
                size={22}
                color={Colors.labelBlack}
              />
            </TouchableOpacity>
          ),
          title: '',
          headerStyle: {
            backgroundColor:'transparent'
          }
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