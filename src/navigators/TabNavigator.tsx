import React from "react";
import { TouchableOpacity } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome, faInbox, faUser, faEllipsisV, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import { useTheme } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Title } from "@components/Text/Title";
import { DeckView } from "@views/Deck/Deck";
import { FriendsView } from "@views/Chat/Friends";
import { NewProfileView } from "@views/NewProfile";

const Tab = createBottomTabNavigator();

const icons: Record<string, IconDefinition> = {
  deck: faHome,
  friends: faInbox,
  profile: faUser,
};

interface HeaderRightProps {
  icon: IconDefinition;
  onPress?: () => void;
};

const HeaderRight: React.FC<HeaderRightProps> = ({ 
  icon, 
  onPress 
}) => {
  /**
   * HeaderRight Icon Component
   * @props
   *   - icon (string) : The name of icon to use
   *   - onPress (() => void) : The action for the header button
   */
  const theme = useTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <FontAwesomeIcon
        icon={icon}
        size={20}
        color={theme.colors.primary}
      />
    </TouchableOpacity>
  );
};

const TabNavigator: React.FC = () => {
  /**
   * TabNavigator Component
   * @description bottom navigation for the AppNavigator
   */
  const theme = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="deck"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          const icon = icons[route.name as keyof typeof icons];
          return (
            <FontAwesomeIcon
              icon={icon}
              size={25}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: theme.colors.tertiary,
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
          backgroundColor: theme.colors.background,
        },
      })}
    >
      <Tab.Screen
        name="deck"
        component={DeckView}
        options={({ navigation }) => ({
          // navigation navigates to a quick preferences
          headerTitleAlign: "left",
          headerTitle: () => <Title text="DormParty®" color={theme.colors.primary} />,
          headerRight: () => <HeaderRight icon={faEllipsisV} />,
          headerRightContainerStyle: { paddingRight: 15 },
          headerStyle: { backgroundColor: theme.colors.background },
          headerShadowVisible: false, // border bottom invisible
        })}
      />
      <Tab.Screen
        name="friends"
        component={FriendsView}
        options={({ navigation }) => ({
          headerTitleAlign: "left",
          headerTitle: () => <Title text="Your Friends" color={theme.colors.primary} />,
          headerRight: () => <HeaderRight icon={faMagnifyingGlass} onPress={() => navigation.navigate('search')} />,
          headerRightContainerStyle: { paddingRight: 15 },
          headerStyle: { backgroundColor: theme.colors.background },
          headerShadowVisible: false, // border bottom invisible
        })}
      />
      <Tab.Screen
        name="profile"
        component={NewProfileView}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export { TabNavigator };