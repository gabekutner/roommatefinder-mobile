import React, {useState, useCallback} from "react";
import {ActivityIndicator, View} from "react-native";

import {Button, useTheme} from "react-native-paper";

import {Container, Content} from "./friends.view";
import Empty from "../../../components/Empty";

// import useStore from "../../../zustand/store";
import useBearStore from "../../../libs/store";

/*global setTimeout */
/*eslint no-undef: "error"*/

function FriendsView({navigation}) {

  const theme = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const friendList = useBearStore((state) => state.friendList);
  const refreshFriendList = useBearStore((state) => state.refreshFriendList);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refreshFriendList();
    setTimeout(() => {
      setRefreshing(false);
    }, 700);
  }, []);

  if (friendList === null) {
    return (
      <ActivityIndicator
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.background,
        }}
      />
    );
  }


  if (friendList.length === 0) {
    return (
      <Empty
        emoji={"💬"}
        message="Nothing yet... Match with roommates and check back later!"
        theme={theme}
      />
    );
  }

  return (
    <Container theme={theme}>
      <Content
        theme={theme}
        navigation={navigation}
        friendList={friendList}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </Container>
  );
}

export {FriendsView};
