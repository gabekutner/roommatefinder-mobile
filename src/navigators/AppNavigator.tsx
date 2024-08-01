import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppStackParamList } from "types/StackParamList"; 
const Stack = createNativeStackNavigator<AppStackParamList>();

import { MessageView } from "@views/Chat/Message";
import { EditProfileView } from "@views/Profile/EditProfile";
import { SearchView } from "@views/Search";
import { PrivacyPolicy } from "@views/PrivacyPolicy";
import { HowToFindARoommate } from "@views/HowToFindARoommate";
import { QuizView } from "@views/Quiz";
import { PreviewProfileView } from "@views/Profile/PreviewProfile";
import { TabNavigator } from "./TabNavigator";

import useBearStore from "../libs/store";


const AppNavigator: React.FC = () => {
  const socketConnect = useBearStore((state) => state.socketConnect);
  const socketDisconnect = useBearStore((state) => state.socketDisconnect);

  // Connect to backend socket
  useEffect(() => {
    socketConnect();
    return () => {
      socketDisconnect();
    };
  }, [socketConnect, socketDisconnect]);

  return (
    <Stack.Navigator 
      initialRouteName="home"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="home"
        component={TabNavigator}
      />

      {/* <Stack.Group> */}
      <Stack.Screen 
        name="privacy-policy"
        component={PrivacyPolicy}
      />
      <Stack.Screen 
        name="how-to"
        component={HowToFindARoommate}
      />
      {/* </Stack.Group> */}

      {/* <Stack.Group> */}
      <Stack.Screen 
        name="search"
        component={SearchView}
      />
      <Stack.Screen 
        name="message"
        component={MessageView}
      />
      {/* </Stack.Group> */}

      <Stack.Screen 
        name="edit-profile"
        component={EditProfileView}
      />
      <Stack.Screen 
        name="preview"
        component={PreviewProfileView}
        options={{
          presentation: 'card',
          animation:"fade_from_bottom"
        }}  
      />
      <Stack.Screen 
        name="quiz"
        component={QuizView}
      />
    </Stack.Navigator>
  );
};

export {AppNavigator};