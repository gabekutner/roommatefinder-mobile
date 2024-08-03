// Define a type for the state of the slice
interface FriendsState {
  socket: WebSocket; // Or the type that represents your socket instance
}

// Define the slice methods
interface FriendsSlice {
  refreshFriendList: () => void;
}

// Create the slice function with TypeScript typings
const friendsSlice = (set: (state: Partial<FriendsState>) => void, get: () => FriendsState): FriendsSlice => ({
  refreshFriendList: () => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "friend.list",
      })
    );
  },
});

export { friendsSlice };
