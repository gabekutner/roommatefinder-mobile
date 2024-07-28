const messageSlice = (set, get) => ({
  messageList: (connectionId, page = 0) => {
    if (page === 0) {
      set(() => ({
        messagesList: [],
        messagesNext: null,
        messagesTyping: null,
        messagesId: null,
      }));
    } else {
      set(() => ({
        messagesNext: null,
      }));
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

  messageSend: (connectionId, message) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "message.send",
        connectionId: connectionId,
        message: message,
      })
    );
  },

  messageType: (id) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "message.type",
        id: id,
      })
    );
  },
});

export {messageSlice}