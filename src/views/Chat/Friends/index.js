import React, {useState, useCallback} from "react";
import {ActivityIndicator} from "react-native";

import {useTheme} from "react-native-paper";

import {Container, Content} from "./friends.view";
import Empty from "../../../components/Empty";

import useStore from "../../../zustand/store";

function FriendsView({navigation}) {
  const theme = useTheme();

  const friendList = useStore((state) => state.friendList);
  const refreshFriendList = useStore((state) => state.refreshFriendList);
  const [refreshing, setRefreshing] = useState(false);

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
        refresh={onRefresh}
        message="Nothing yet... Match with roommates and check back later!"
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
