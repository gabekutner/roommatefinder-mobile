// Define types for the state and slice methods
interface MessageState {
  socket: WebSocket; // Type for your WebSocket instance
  messagesList: any[]; // Adjust the type based on your actual message structure
  messagesNext: any | null; // Adjust the type based on what `messagesNext` should hold
  messagesTyping: any | null; // Adjust the type based on what `messagesTyping` should hold
  messagesId: string | null; // Adjust type if `messagesId` is something other than string
}

interface MessageSlice {
  messageList: (connectionId: string, page?: number) => void;
  messageSend: (connectionId: string, message: string) => void;
  messageType: (id: string) => void;
}

// Create the slice function with TypeScript typings
const messageSlice = (set: (state: Partial<MessageState>) => void, get: () => MessageState): MessageSlice => ({
  messageList: (connectionId: string, page: number = 0) => {
    if (page === 0) {
      set({
        messagesList: [],
        messagesNext: null,
        messagesTyping: null,
        messagesId: null,
      });
    } else {
      set({
        messagesNext: null,
      });
    }
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "message.list",
        connectionId: connectionId,
        page: page,
      })
    );
  },

  messageSend: (connectionId: string, message: string) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "message.send",
        connectionId: connectionId,
        message: message,
      })
    );
  },

  messageType: (id: string) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "message.type",
        id: id,
      })
    );
  },
});

export { messageSlice };