import React, {useEffect, useState} from "react";

import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {moderateScale, verticalScale} from "react-native-size-matters";

// import Title from "../components/Brand/Title";
import {Title} from "../components/Text/Title";
import DropDownMenu from "../components/DropDownMenu";
import CustomButton from "../components/UI/Custom/CustomButton";

import Friends from "../screens/Extras/Friends/Friends";
import Profile from "../screens/Profile/Profile";
import SwipeScreen from "../screens/SwipeScreen";
import Search from "../screens/Extras/Search/Search";
import Requests from "../screens/Extras/Requests/Requests";
// import Message from "../screens/Chat/Message";
import ProfileDetail from "../screens/Profile/ProfileDetail";
import EditBasicsScreen from "../screens/Profile/Edit/EditBasics";
import LinkTreeScreen from "../screens/Onboarding/Widgets/LinkTree";
import PromptsScreen from "../screens/Onboarding/Widgets/Prompts";
import QuotesScreen from "../screens/Onboarding/Widgets/Quotes";
import EditPhotoScreen from "../screens/Profile/Edit/EditPhotos";

// matching quiz
import BaseOnboardingCard from "../screens/Onboarding/Components/Card";
import PromptScreen from "../screens/Onboarding/Prompt";

import useStore from "../zustand/store";
import {colors} from "../constants/colors";

import { Button } from "react-native-paper";
/** new views */
import {ProfileView} from "../views/Profile/Profile";
import {EditProfileView} from "../views/Profile/EditProfile";
/**change name to MessageView */
import {MessageView} from "../views/Chat/Message";
import {FriendsView} from "../views/Chat/Friends";
import { DeckView } from "../views/Deck/Deck";
import { SearchView } from "../views/Search";
import {useTheme} from "react-native-paper";
import { View, Text, TouchableOpacity } from "react-native";
import useBearStore from "../libs/store";
import { PrivacyPolicy } from "../views/PrivacyPolicy";

import { TabNavigator } from "./TabNavigator";
import { HowToFindARoommate } from "../views/HowToFindARoommate";


const AppNavigator = () => {
  const theme = useTheme();

  const socketConnect = useBearStore((state) => state.socketConnect);
  const socketDisconnect = useBearStore((state) => state.socketDisconnect);

  // Connect to backend socket
  useEffect(() => {
    socketConnect();
    return () => {
      socketDisconnect();
    };
  }, []);

  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="home"
        component={TabNavigator}
        options={{headerShown: false}}
      />


      <Stack.Group>
        <Stack.Screen 
          name="privacy-policy"
          component={PrivacyPolicy}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="how-to"
          component={HowToFindARoommate}
          options={{headerShown: false}}
        />
      </Stack.Group>

      <Stack.Group>
        <Stack.Screen 
          name="search"
          component={SearchView}
          options={{headerShown: false}}
        />
      </Stack.Group>
      
      {/* 
      <Stack.Screen
        name="search"
        component={SearchView}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="profile-detail"
        component={ProfileDetail}
        options={{
          headerShown: false,
          presentation: "modal",
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="messages"
        component={MessageView}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="requests"
        component={Requests}
        options={({navigation}) => ({
          headerLeft: () => (
            <CustomButton
              onClick={() => navigation.goBack()}
              style={{
                borderWidth: 0,
                position: "absolute",
                top: verticalScale(-28),
                left: moderateScale(5),
              }}
            >
              <FontAwesomeIcon
                icon="arrow-left"
                size={verticalScale(20)}
                color={colors.tint}
              />
            </CustomButton>
          ),
          headerTitle: () => (
            <Title
              text="Roommate Matches"
              color={theme.colors.primary}
            />
          ),
          headerStyle: {backgroundColor: theme.colors.background},
          headerShadowVisible: false, // border bottom invisible
        })}
      />


      <Stack.Screen
        name="edit-basics"
        component={EditProfileView}
        options={({navigation}) => ({
          headerLeft: () => (
            <CustomButton
              onClick={() => navigation.goBack()}
              style={{
                borderWidth: 0,
                position: "absolute",
                top: verticalScale(-28),
                left: moderateScale(5),
              }}
            >
              <FontAwesomeIcon
                icon="arrow-left"
                size={verticalScale(20)}
                color={colors.tint}
              />
            </CustomButton>
          ),
          headerTitle: () => (
            <Title
              text="Edit Profile"
              color={theme.colors.primary}
            />
          ),
          headerStyle: {backgroundColor: theme.colors.background},
          headerShadowVisible: false, // border bottom invisible
        })}
      />

      <Stack.Screen
        name="linktree"
        component={LinkTreeScreen}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
        initialParams={{
          preview: true,
        }}
      />
      <Stack.Screen
        name="quotes"
        component={QuotesScreen}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
        initialParams={{
          preview: true,
        }}
      />
      <Stack.Screen
        name="prompts"
        component={PromptsScreen}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
        initialParams={{
          preview: true,
        }}
      />

      <Stack.Screen
        name="photos"
        component={EditPhotoScreen}
        options={({navigation}) => ({
          headerLeft: () => (
            <CustomButton
              onClick={() => navigation.goBack()}
              style={{
                borderWidth: 0,
                position: "absolute",
                top: verticalScale(-28),
                left: moderateScale(5),
              }}
            >
              <FontAwesomeIcon
                icon="arrow-left"
                size={verticalScale(20)}
                color={colors.tint}
              />
            </CustomButton>
          ),
          headerTitle: () => (
            <Title
              title="Upload Photos"
              color={colors.tint}
              fontSize={verticalScale(20)}
            />
          ),
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerShadowVisible: false, // border bottom invisible
        })}
      />

      <Stack.Screen
        name="matching"
        component={BaseOnboardingCard}
        options={{headerShown: false}}
        initialParams={{
          data: [
            {
              id: 1,
              title: "social-battery",
              label: "How's your social energy throughout the day?",
            },
            {
              id: 2,
              title: "clean-room",
              label: "How clean do you keep your room? 🧹",
            },
            {
              id: 3,
              title: "noise-level",
              label: "How loud is it in your room most of the time?",
            },
            {
              id: 4,
              title: "guest-policy",
              label: "What do you think about dorm guests? 🏨",
            },
            {
              id: 5,
              title: "in-room",
              label: "How much time do you spend in your room?",
            },
            {
              id: 6,
              title: "hot-cold",
              label: " How hot or cold do you keep your room?",
            },
            {id: 7, title: "bed-time", label: "When is it time for bed? 🥱"},
            {
              id: 8,
              title: "wake-up-time",
              label: "What about wake up time? ☀️",
            },
            {
              id: 9,
              title: "sharing-policy",
              label: "What do you think about sharing your stuff? 🧸",
            },
          ],
          next: "done-w-quiz",
          back: "profile",
        }}
      />
      <Stack.Screen
        name="done-w-quiz"
        component={PromptScreen}
        options={{headerShown: false}}
        initialParams={{
          title: "Sweet! You're all done",
          subtitle: "Hit submit to update your matching quiz!",
          text: "Submit",
          screen: "update",
          screen2: "",
        }}
      /> */}
    </Stack.Navigator>
  );
};

export {AppNavigator};