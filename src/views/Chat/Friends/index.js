import React, {useState, useCallback} from "react";
import {ActivityIndicator, FlatList, View, Text, SafeAreaView, RefreshControl, TouchableOpacity} from "react-native";
import {useTheme} from "react-native-paper";
import Empty from "../../../components/Empty";
import useBearStore from "../../../libs/store";
import FastImage from "react-native-fast-image";
import Cell from "../../../components/Cell";
import {appendFullUrl} from "../../../libs/utils/appendFullUrl";
import {formatTime} from "../../../libs/utils/formatTime";

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
  };

  if (friendList.length === 0) {
    return (
      <Empty
        emoji={"💬"}
        message="Nothing yet... Match with roommates and check back later!"
        theme={theme}
      />
    );
  };

  return (
    <SafeAreaView
      style={{
        flex:1,
        backgroundColor: theme.colors.background,
      }}
    >
      <FlatList
        data={friendList}
        renderItem={({item}) => (
          <Cell>
            <TouchableOpacity>
              <FastImage
                key={item.id}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 70 / 2,
                  backgroundColor: theme.colors.background,
                  borderWidth: 1,
                  borderColor: theme.colors.primary,
                }}
                source={appendFullUrl(item.friend.thumbnail)}
                resizeMode={FastImage.resizeMode.cover}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("message", item)}>
              <View style={{flex:1, paddingHorizontal: 15, justifyContent: "center"}}>
                <Text 
                  style={{
                    fontSize:16,
                    fontWeight: "600",
                    marginBottom: 4,
                    color: theme.colors.primary
                  }}
                >
                  {item.friend.name}
                </Text>
                <View style={{flexDirection: "row", gap: 5}}>
                  <Text
                    style={{
                      fontSize:14,
                      fontWeight:'400',
                      color: theme.colors.primary,
                    }}
                  >
                    {item.preview}
                  </Text>
                  <Text
                    style={{
                      fontSize:14,
                      fontWeight:'500',
                      color: theme.colors._tint_primary,
                    }}
                  >
                    {formatTime(item.updated)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Cell>
        )}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        style={{marginHorizontal:25}}
      />
    </SafeAreaView>
  );
}

export {FriendsView};
