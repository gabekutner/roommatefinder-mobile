const friendsSlice = (get) => ({
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