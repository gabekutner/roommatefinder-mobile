import React, {useEffect} from "react";

import {createNativeStackNavigator} from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

/** new views */
/**change name to MessageView */
import {MessageView} from "../views/Chat/Message";
import {EditProfileView} from "../views/Profile/EditProfile";
import { SearchView } from "../views/Search";
import useBearStore from "../libs/store";
import { PrivacyPolicy } from "../views/PrivacyPolicy";
import { TabNavigator } from "./TabNavigator";
import { HowToFindARoommate } from "../views/HowToFindARoommate";
import { QuizView } from "../views/Quiz";
import { PreviewProfileView } from "../views/Profile/PreviewProfile";


const AppNavigator = () => {

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
        <Stack.Screen 
          name="message"
          component={MessageView}
          options={{headerShown: false}}
        />
      </Stack.Group>

      <Stack.Screen 
        name="edit-profile"
        component={EditProfileView}
        options={{headerShown: false}}
      />
      <Stack.Screen 
          name="preview"
          component={PreviewProfileView}
          options={{
            headerShown: false,
            presentation: 'card',
            animation:"fade_from_bottom"
          }}  
        />
      <Stack.Screen 
        name="quiz"
        component={QuizView}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export {AppNavigator};