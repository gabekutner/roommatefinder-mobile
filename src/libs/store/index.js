import { create } from 'zustand';

import { createProfileSlice } from './client/createProfileSlice';
import { getDeckCards } from './client/getDeckCards';
import { friendsSlice } from './client/friendsSlice';

import secure from "../../core/secure";

import {responseFriendList, responseFriendNew} from "./handlers/responseFriend";


const initialState = {
  user: {},
  authenticated: false,
  initialized: false,

  friendList: null,

};


const useBearStore = create((set, get) => ({
  ...initialState,
  ...createProfileSlice(set, get),
  ...getDeckCards(set, get),
  ...friendsSlice(set, get),

  init: async () => {
    const credentials = await secure.get("credentials");
    if (credentials) {
      try {
        const response = await api({
          method: "post",
          url: "/api/v1/users/login/",
          data: {
            identifier: credentials.identifier,
            password: credentials.password,
          },
        });
        if (response.status !== 200) {
          throw new Error("[error-internal] init");
        } else {
          const tokens = {
            access: response.data.access,
            refresh: response.data.refresh,
          };
          secure.set("tokens", tokens);
          set(() => ({
            user: response.data,
            initialized: true,
            authenticated: true,
          }));
        };
      } catch (e) {
        console.log("[error-external] init")
      };
    } else {
      console.log("[not authenticated]");
    };
    // initialize either way
    set(() => ({
      initialized: true,
    }));
  },


  login: (credentials, user, tokens) => {
    secure.set("credentials", credentials);
    secure.set("tokens", tokens);
    set(() => ({
      user: user,
      authenticated: true,
    }));
  },


  logout: () => {
    secure.wipe();
    set(() => ({
      user: {},
      authenticated: false,
    }));
  },

  socket: null,

  socketConnect: async () => {
    const tokens = await secure.get("tokens");
    /*global WebSocket */
    /*eslint no-undef: "error"*/
    const socket = new WebSocket(
      `ws://${ADDRESS}/chat/?token=${tokens.access}`
    );

    socket.onopen = () => {
      /*global console */
      /*eslint no-undef: "error"*/
      console.log("socket.onopen");
      socket.send(
        JSON.stringify({
          source: "request.list",
        })
      );
      socket.send(
        JSON.stringify({
          source: "friend.list",
        })
      );
    };
    socket.onmessage = (event) => {
      // convert data to js object
      const parsed = JSON.parse(event.data);
      console.log("onmessage. ", parsed);

      const responses = {
        "friend.list": responseFriendList,
        "friend.new": responseFriendNew,
        // "message.list": responseMessageList,
        // "message.send": responseMessageSend,
        // "message.type": responseMessageType,
        // "request.accept": responseRequestAccept,
        // "request.connect": responseRequestConnect,
        // "request.list": responseRequestList,
        // search: responseSearch,
        // thumbnail: responseThumbnail,
      };
      const resp = responses[parsed.source];
      if (!resp) {
        console.log('parsed.source "' + parsed.source + '" not found');
        return;
      }
      // call resp function
      resp(set, get, parsed.data);
    };
    socket.onerror = (e) => {
      console.log("socket.onerror: ", e.message);
    };
    socket.onclose = () => {
      console.log("socket.onclose");
    };
    set(() => ({
      socket: socket,
    }));
  },

  socketDisconnect: () => {
    const socket = get().socket;
    if (socket) {
      socket.close();
    }
    set(() => ({
      socket: null,
    }));
  },

}));

export default useBearStore;