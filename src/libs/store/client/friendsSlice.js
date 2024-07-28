


const friendsSlice = (set, get) => ({
  // friendList: null,
  refreshFriendList: () => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "friend.list",
      })
    );
  },
  
})

export {friendsSlice};