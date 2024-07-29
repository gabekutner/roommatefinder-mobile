const requestSlice = (set, get) => ({
  refreshRequestList: () => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "request.list",
      })
    );
  },

  requestAccept: (id) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "request.accept",
        id: id,
      })
    );
  },

  requestConnect: (id) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "request.connect",
        id: id,
      })
    );
  },
});


export {requestSlice};