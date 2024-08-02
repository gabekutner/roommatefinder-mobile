import { Profile } from "types/django";


interface BearState {
  user: Profile;
  authenticated: boolean;
  initialized:boolean;

  socket: WebSocket | null;

  friendList: [];
  requestList: [];
  messagesList: [];
  searchList: [];

  messagesNext: null,
  messagesTyping: null,
  messagesId: null,

  paused: boolean,
}

export default BearState;