// import {create} from "zustand";

// // import secure from "../core/secure";
// import {ADDRESS} from "../core/api";

// import {profileSlice} from "./slices/profile";
// import {authSlice} from "./slices/auth";
// import {quizSlice} from "./slices/quiz";
// import {swipeSlice} from "./slices/swipe";
// import {imageSlice} from "./slices/images";
// import {widgetsSlice} from "./slices/widgets";

//-------------------------------------
//  Socket receive message handlers
//-------------------------------------
// function responseFriendList(set, friendList) {
//   set(() => ({
//     friendList: friendList,
//   }));
// }

// function responseFriendNew(set, get, friend) {
//   const friendList = [friend, ...get().friendList];
//   set(() => ({
//     friendList: friendList,
//   }));
// }

// function responseMessageList(set, get, data) {
//   set(() => ({
//     messagesList: [...get().messagesList, ...data.messages],
//     messagesNext: data.next,
//     messagesId: data.friend.id,
//   }));
// }

// function responseMessageSend(set, get, data) {
//   const id = data.friend.id;
//   // move friendList item for this friend to the start of
//   // list, update the preview text and update the time stamp
//   const friendList = [...get().friendList];
//   const friendIndex = friendList.findIndex((item) => item.friend.id === id);
//   if (friendIndex >= 0) {
//     const item = friendList[friendIndex];
//     item.preview = data.message.text;
//     item.updated = data.message.created;
//     friendList.splice(friendIndex, 1);
//     friendList.unshift(item);
//     set(() => ({
//       friendList: friendList,
//     }));
//   }
//   // if the message data does not belong to this friend then
//   // dont update the message list, as a fresh messageList will
//   // be loaded the next time the user opens the correct chat window
//   if (id !== get().messagesId) {
//     return;
//   }
//   const messagesList = [data.message, ...get().messagesList];
//   set(() => ({
//     messagesList: messagesList,
//     messagesTyping: null,
//   }));
// }

// function responseMessageType(set, get, data) {
//   if (data.id !== get().messagesId) return;
//   set(() => ({
//     messagesTyping: new Date(),
//   }));
// }

// function responseRequestConnect(set, get, connection) {
//   const user = get().user;
//   // if i was the one that made the connect request,
//   // update the search list row
//   if (user.id === connection.sender.id) {
//     const searchList = [...get().searchList];
//     const searchIndex = searchList.findIndex(
//       (request) => request.id === connection.receiver.id
//     );
//     if (searchIndex >= 0) {
//       searchList[searchIndex].status = "pending-them";
//       set(() => ({
//         searchList: searchList,
//       }));
//     }
//     // if they were the one  that sent the connect
//     // request, add request to request list
//   } else {
//     const requestList = [...get().requestList];
//     const requestIndex = requestList.findIndex(
//       (request) => request.sender.username === connection.sender.username
//     );
//     if (requestIndex === -1) {
//       requestList.unshift(connection);
//       set(() => ({
//         requestList: requestList,
//       }));
//     }
//   }
// }

// function responseRequestAccept(set, get, connection) {
//   const user = get().user;
//   // if I was the one that accepted the request, remove
//   // request from the  requestList
//   if (user.id === connection.receiver.id) {
//     const requestList = [...get().requestList];
//     const requestIndex = requestList.findIndex(
//       (request) => request.id === connection.id
//     );
//     if (requestIndex >= 0) {
//       requestList.splice(requestIndex, 1);
//       set(() => ({
//         requestList: requestList,
//       }));
//     }
//   }
//   // if the corresponding user is contained within the
//   // searchList for the  acceptor or the  acceptee, update
//   // the state of the searchlist item
//   const sl = get().searchList;
//   if (sl === null) {
//     return;
//   }
//   const searchList = [...sl];

//   let searchIndex = -1;
//   // if this user  accepted
//   if (user.id === connection.receiver.id) {
//     searchIndex = searchList.findIndex(
//       (user) => user.id === connection.sender.id
//     );
//     // if the other user accepted
//   } else {
//     searchIndex = searchList.findIndex(
//       (user) => user.id === connection.receiver.id
//     );
//   }
//   if (searchIndex >= 0) {
//     searchList[searchIndex].status = "connected";
//     set(() => ({
//       searchList: searchList,
//     }));
//   }
// }

// function responseRequestList(set, requestList) {
//   set(() => ({
//     requestList: requestList,
//   }));
// }

// function responseSearch(set, data) {
//   set(() => ({
//     searchList: data,
//   }));
// }

// function responseThumbnail(set, data) {
//   set(() => ({
//     user: data,
//   }));
// }

// const useStore = create((set, get) => ({
//   ...profileSlice(set),
//   ...authSlice(set),
//   ...quizSlice(set),
//   ...swipeSlice(),
//   ...imageSlice(set),
//   ...widgetsSlice(set),

//   //---------------------
//   //      Websocket
//   //---------------------
//   socket: null,

//   socketConnect: async () => {
//     const tokens = await secure.get("tokens");
//     /*global WebSocket */
//     /*eslint no-undef: "error"*/
//     const socket = new WebSocket(
//       `ws://${ADDRESS}/chat/?token=${tokens.access}`
//     );

//     socket.onopen = () => {
//       /*global console */
//       /*eslint no-undef: "error"*/
//       console.log("socket.onopen");
//       socket.send(
//         JSON.stringify({
//           source: "request.list",
//         })
//       );
//       socket.send(
//         JSON.stringify({
//           source: "friend.list",
//         })
//       );
//     };
//     socket.onmessage = (event) => {
//       // convert data to js object
//       const parsed = JSON.parse(event.data);

//       console.log("onmessage. ", parsed);

//       const responses = {
//         "friend.list": responseFriendList,
//         "friend.new": responseFriendNew,
//         "message.list": responseMessageList,
//         "message.send": responseMessageSend,
//         "message.type": responseMessageType,
//         "request.accept": responseRequestAccept,
//         "request.connect": responseRequestConnect,
//         "request.list": responseRequestList,
//         search: responseSearch,
//         thumbnail: responseThumbnail,
//       };
//       const resp = responses[parsed.source];
//       if (!resp) {
//         console.log('parsed.source "' + parsed.source + '" not found');
//         return;
//       }
//       // call resp function
//       resp(set, get, parsed.data);
//     };
//     socket.onerror = (e) => {
//       console.log("socket.onerror: ", e.message);
//     };
//     socket.onclose = () => {
//       console.log("socket.onclose");
//     };
//     set(() => ({
//       socket: socket,
//     }));
//   },

//   socketDisconnect: () => {
//     const socket = get().socket;
//     if (socket) {
//       socket.close();
//     }
//     set(() => ({
//       socket: null,
//     }));
//   },

//   //---------------------
//   //     Thumbnail
//   //---------------------
//   uploadThumbnail: (file) => {
//     const socket = get().socket;
//     socket.send(
//       JSON.stringify({
//         source: "thumbnail",
//         base64: file.base64,
//         filename: file.fileName,
//       })
//     );
//   },

//   //---------------------
//   //     Search
//   //---------------------
//   searchList: [],
//   searchUsers: (query) => {
//     if (query) {
//       const socket = get().socket;
//       socket.send(
//         JSON.stringify({
//           source: "search",
//           query: query,
//         })
//       );
//     } else {
//       set(() => ({
//         searchList: [],
//       }));
//     }
//   },

//   //-------------------
//   //  Friend Requests
//   //-------------------
  // requestList: null,
  // refreshRequestList: () => {
  //   const socket = get().socket;
  //   socket.send(
  //     JSON.stringify({
  //       source: "request.list",
  //     })
  //   );
  // },

  // requestAccept: (id) => {
  //   const socket = get().socket;
  //   socket.send(
  //     JSON.stringify({
  //       source: "request.accept",
  //       id: id,
  //     })
  //   );
  // },

  // requestConnect: (id) => {
  //   const socket = get().socket;
  //   socket.send(
  //     JSON.stringify({
  //       source: "request.connect",
  //       id: id,
  //     })
  //   );
  // },

//   //-------------------
//   //    Friend List
//   //-------------------
//   friendList: null,
//   refreshFriendList: () => {
//     const socket = get().socket;
//     socket.send(
//       JSON.stringify({
//         source: "friend.list",
//       })
//     );
//   },

//   //---------------------
//   //     Messages
//   //---------------------
  // messagesList: [],
  // messagesNext: null,
  // messagesTyping: null,
  // messagesId: null,
  // messageList: (connectionId, page = 0) => {
  //   if (page === 0) {
  //     set(() => ({
  //       messagesList: [],
  //       messagesNext: null,
  //       messagesTyping: null,
  //       messagesId: null,
  //     }));
  //   } else {
  //     set(() => ({
  //       messagesNext: null,
  //     }));
  //   }
  //   const socket = get().socket;
  //   socket.send(
  //     JSON.stringify({
  //       source: "message.list",
  //       connectionId: connectionId,
  //       page: page,
  //     })
  //   );
  // },

  // messageSend: (connectionId, message) => {
  //   const socket = get().socket;
  //   socket.send(
  //     JSON.stringify({
  //       source: "message.send",
  //       connectionId: connectionId,
  //       message: message,
  //     })
  //   );
  // },

  // messageType: (id) => {
  //   const socket = get().socket;
  //   socket.send(
  //     JSON.stringify({
  //       source: "message.type",
  //       id: id,
  //     })
  //   );
  // },
// }));

// export default useStore;
