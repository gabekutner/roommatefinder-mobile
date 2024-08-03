// Define a type for the state of the slice
interface RequestState {
  socket: WebSocket; // Or the type that represents your socket instance
}

// Define the slice methods
interface RequestSlice {
  refreshRequestList: () => void;
  requestAccept: (id: string) => void; // Assuming id is a string; adjust if needed
  requestConnect: (id: string) => void; // Assuming id is a string; adjust if needed
}

// Create the slice function with TypeScript typings
const requestSlice = (set: (state: Partial<RequestState>) => void, get: () => RequestState): RequestSlice => ({
  refreshRequestList: () => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "request.list",
      })
    );
  },

  requestAccept: (id: string) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "request.accept",
        id: id,
      })
    );
  },

  requestConnect: (id: string) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "request.connect",
        id: id,
      })
    );
  },
});

export { requestSlice };