import React from "react";
import {FlatList, SafeAreaView, RefreshControl} from "react-native";

import {FriendRow} from "./FriendRow";

import {styles} from "./friends.styles";

function Container(props) {
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: props.theme.colors.background,
        },
      ]}
    >
      {props.children}
    </SafeAreaView>
  );
}

function Content(props) {
  return (
    <FlatList
      data={props.friendList}
      renderItem={({item}) => (
        <FriendRow
          navigation={props.navigation}
          item={item}
          theme={props.theme}
        />
      )}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl
          refreshing={props.refreshing}
          onRefresh={props.onRefresh}
        />
      }
      style={{marginHorizontal:25}}
    />
  );
}

export {Container, Content};
