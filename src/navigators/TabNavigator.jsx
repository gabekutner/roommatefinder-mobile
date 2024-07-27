import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useTheme, Button } from "react-native-paper";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

import { Title } from "../components/Text/Title";

import { NewProfileView } from "../views/NewProfile";
import { DeckView } from "../views/Deck/Deck";

// temp
import useBearStore from "../libs/store";


const Home = () => {
  const customTheme = useTheme();
  const logout = useBearStore(state => state.logout)  
  return (
    <View style={{flex:1, backgroundColor:customTheme.colors.backdrop}}>
      <Button onPress={logout}>
        <Text>logout</Text>
      </Button>
    </View>
  );
};

const TabNavigator = () => {
  const customTheme = useTheme();

  const HeaderRight = icon => (
    <TouchableOpacity>
      <FontAwesomeIcon
        icon={icon}
        size={20}
        color={customTheme.colors.primary}
      />
    </TouchableOpacity>
  );

  return (
    <Tab.Navigator
      initialRouteName="deck"
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          const icons = {
            deck: "home",
            friends: "inbox",
            profile: "user",
          };
          const icon = icons[route.name];
          return (
            <FontAwesomeIcon
              icon={icon}
              size={25}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: customTheme.colors.tertiary,
        headerShadowVisible: false, // border bottom invisible
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          borderTopWidth: 0,
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,
          height: 80,
          backgroundColor: customTheme.colors.background,
        },
      })}
    >
      <Tab.Screen
        name="deck"
        component={DeckView}
        options={({navigation}) => ({
          headerTitleAlign: "left",
          headerTitle: () => <Title text="DormParty®" color={customTheme.colors.primary} />,
          headerRight: () => HeaderRight("ellipsis-vertical"),
          headerRightContainerStyle: {paddingRight: 15},
          headerStyle: {backgroundColor: customTheme.colors.background},
          headerShadowVisible: false, // border bottom invisible
        })}
      />
      <Tab.Screen
        name="friends"
        component={Home}
        options={({navigation}) => ({
          headerTitleAlign: "left",
          headerTitle: () => <Title text="Your Friends" color={customTheme.colors.primary} />,
          headerRight: () => HeaderRight("magnifying-glass"),
          headerRightContainerStyle: {paddingRight: 15},
          headerStyle: {backgroundColor: customTheme.colors.background},
          headerShadowVisible: false, // border bottom invisible
        })}
      />
      <Tab.Screen
        name="profile"
        component={NewProfileView}
        options={{headerShown: false}}
        // options={({navigation}) => ({
        //   headerTitleAlign: "left",
        //   headerTitle: () => <Title text="Your Profile" color={customTheme.colors.primary} />,
        //   headerRight: () => HeaderRight("user-pen"),
        //   headerRightContainerStyle: {paddingRight: 15},
        //   headerStyle: {backgroundColor: customTheme.colors.background},
        //   headerShadowVisible: false, // border bottom invisible
        // })}
      />
    </Tab.Navigator>
  );
};

export {TabNavigator};