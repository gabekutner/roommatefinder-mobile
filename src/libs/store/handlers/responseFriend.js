function responseFriendList(set, get, friendList) {
  set(() => ({
    friendList: friendList,
  }));
};

function responseFriendNew(set, get, friend) {
  const friendList = [friend, ...get().friendList];
  set(() => ({
    friendList: friendList,
  }));
};

export {responseFriendList, responseFriendNew};