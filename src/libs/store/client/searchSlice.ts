// Define a type for the state of the slice
interface SearchState {
  socket: WebSocket; // Or the type that represents your socket instance
  searchList: any[]; // Adjust the type of items in the searchList if needed
}

// Define the slice methods
interface SearchSlice {
  searchUsers: (query: string | null) => void;
}

// Create the slice function with TypeScript typings
const searchSlice = (set: (state: Partial<SearchState>) => void, get: () => SearchState): SearchSlice => ({
  searchUsers: (query: string | null) => {
    if (query) {
      const socket = get().socket;
      socket.send(
        JSON.stringify({
          source: "search",
          query: query,
        })
      );
    } else {
      set({
        searchList: [],
      });
    }
  },
});

export { searchSlice };
