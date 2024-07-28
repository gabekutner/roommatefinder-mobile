function responseMessageList(set, get, data) {
  set(() => ({
    messagesList: [...get().messagesList, ...data.messages],
    messagesNext: data.next,
    messagesId: data.friend.id,
  }));
};


function responseMessageSend(set, get, data) {
  const id = data.friend.id;
  // move friendList item for this friend to the start of
  // list, update the preview text and update the time stamp
  const friendList = [...get().friendList];
  const friendIndex = friendList.findIndex((item) => item.friend.id === id);
  if (friendIndex >= 0) {
    const item = friendList[friendIndex];
    item.preview = data.message.text;
    item.updated = data.message.created;
    friendList.splice(friendIndex, 1);
    friendList.unshift(item);
    set(() => ({
      friendList: friendList,
    }));
  }
  // if the message data does not belong to this friend then
  // dont update the message list, as a fresh messageList will
  // be loaded the next time the user opens the correct chat window
  if (id !== get().messagesId) {
    return;
  }
  const messagesList = [data.message, ...get().messagesList];
  set(() => ({
    messagesList: messagesList,
    messagesTyping: null,
  }));
};


function responseMessageType(set, get, data) {
  if (data.id !== get().messagesId) return;
  set(() => ({
    messagesTyping: new Date(),
  }));
};


export {responseMessageList, responseMessageSend, responseMessageType};