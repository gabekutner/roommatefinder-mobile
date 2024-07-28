const searchSlice = (set, get) => ({
  searchUsers: (query) => {
    if (query) {
      const socket = get().socket;
      socket.send(
        JSON.stringify({
          source: "search",
          query: query,
        })
      );
    } else {
      set(() => ({
        searchList: [],
      }));
    };
  },
});

export {searchSlice};