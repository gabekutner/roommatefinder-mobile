import { 
  Platform, 
} from 'react-native';

import { create } from 'zustand';

import secure from './secure';
import api, { ADDRESS } from './api';


//-------------------------------------
//  Socket receive message handlers
//-------------------------------------
function responseFriendList(set, get, friendList) {
  set((state) => ({
    friendList: friendList
  }))
}

function responseFriendNew(set, get, friend) {
	const friendList = [friend, ...get().friendList]
	set((state) => ({
		friendList: friendList
	}))
}

function responseMessageList(set, get, data) {
	set((state) => ({
		messagesList: [...get().messagesList, ...data.messages],
		messagesNext: data.next,
		messagesId: data.friend.id
	}))
}

function responseMessageSend(set, get, data) {
	const id = data.friend.id
	// Move friendList item for this friend to the start of 
	// list, update the preview text and update the time stamp
	const friendList = [...get().friendList]
	const friendIndex = friendList.findIndex(
		item => item.friend.id === id
	)
	if (friendIndex >= 0) {
		const item = friendList[friendIndex]
		item.preview = data.message.text
		item.updated = data.message.created
		friendList.splice(friendIndex, 1)
		friendList.unshift(item)
		set((state) => ({
			friendList: friendList
		}))
	}
	// If the message data does not belong to this friend then 
	// dont update the message list, as a fresh messageList will 
	// be loaded the next time the user opens the correct chat window
	if (id !== get().messagesId) {
		return
	}
	const messagesList = [data.message, ...get().messagesList]
	set((state) => ({
		messagesList: messagesList,
		messagesTyping: null
	}))
}

function responseMessageType(set, get, data) {
	if (data.id !== get().messagesId) return
	set((state) => ({
		messagesTyping: new Date()
	}))
}

function responseRequestConnect(set, get, connection) {
	const user = get().user
	// If i was the one that made the connect request, 
	// update the search list row
	if (user.id === connection.sender.id) {
		const searchList = [...get().searchList]
		const searchIndex = searchList.findIndex(
			request => request.id === connection.receiver.id
		)
		if (searchIndex >= 0) {
			searchList[searchIndex].status = 'pending-them'
			set((state) => ({
				searchList: searchList
			}))
		}
	// If they were the one  that sent the connect 
	// request, add request to request list
	} else {
		const requestList = [...get().requestList]
		const requestIndex = requestList.findIndex(
			request => request.sender.username === connection.sender.username
		)
		if (requestIndex === -1) {
			requestList.unshift(connection)
			set((state) => ({
				requestList: requestList
			}))
		}
	}
}

function responseRequestAccept(set, get, connection) {
  const user = get().user
	// If I was the one that accepted the request, remove 
	// request from the  requestList
	if (user.id === connection.receiver.id) {
		const requestList = [...get().requestList]
		const requestIndex = requestList.findIndex(
			request => request.id === connection.id
		)
		if (requestIndex >= 0) {
			requestList.splice(requestIndex, 1)
			set((state) => ({
				requestList: requestList
			}))
		}
	} 
	// If the corresponding user is contained within the  
	// searchList for the  acceptor or the  acceptee, update 
	// the state of the searchlist item
	const sl = get().searchList
	if (sl === null) {
		return
	}
	const searchList = [...sl]

	let  searchIndex = -1
	// If this user  accepted
	if (user.id === connection.receiver.id) {
		searchIndex = searchList.findIndex(
			user => user.id === connection.sender.id
		)
	// If the other user accepted
	} else {
		searchIndex = searchList.findIndex(
			user => user.id === connection.receiver.id
		)
	}
	if (searchIndex >= 0) {
		searchList[searchIndex].status = 'connected'
		set((state) => ({
			searchList: searchList
		}))
	}
}

function responseRequestList(set, get, requestList) {
  set((state) => ({
    requestList: requestList
  }))
}

function responseSearch(set, get, data) {
  set((state) => ({
    searchList:data
  }))
}

function responseThumbnail(set, get, data) {
  set((state) => ({
    user:data
  }))
}


const useGlobal = create((set, get) => ({

  //---------------------
	//    Initialization
	//---------------------
  initialized: false,

  init: async () => {
    const credentials = await secure.get('credentials')
    if (credentials) {
      try { 
        const response = await api({
          method: 'post',
          url: '/api/v1/users/login/',
          data: {
            email: credentials.email,
            password: credentials.password,
          }
        })

        if (response.status !== 200) {
          throw 'Authentication error'
        }

        const created = response.data.name == null ? false : true

        const tokens = {'access': response.data.access, 'refresh': response.data.refresh}
        secure.set('tokens', tokens)

        set((state) => ({
          initialized:true,
          authenticated:true,
          profileCreated:created,
          user:response.data,
        }))
        return
      } catch(error) {
        console.log('useGlobal.init: ', error)
      }
    }
    set((state) => ({
      initialized:true
    }))
  },

  //---------------------
	//   Authentication
	//---------------------
  authenticated: false,
  user: {},

  login: (credentials, user, tokens) => {
    secure.set('credentials', credentials)
    secure.set('tokens', tokens)
    set((state) => ({
      authenticated:true,
      user:user,
      profileCreated:user.has_account,
    }))
  },

  logout: () => {
    secure.wipe()
    set((state) => ({
      authenticated:false,
      user:{}
    }))
  },

  //---------------------
	//    Create Profile
	//---------------------
  profileCreated: false,

  // delete later ...
  setProfileCreated: () => {
    set((state) => ({
      profileCreated:true
    }))
  },

  createProfile: async (form, user) => {
    if (user.token) {
      try {
        const response = api({
          method: 'post',
          url: '/api/v1/profiles/actions/create-profile/',
          data: {
            birthday: form.birthday,
            sex: form.sex,
            dorm_building: form.dorm_building,
            interests: form.interests,
            thumbnail: form.thumbnail,
          },
          headers: {"Authorization": `Bearer ${user.token}`},
        })

        if (response.status !== 200) {
          throw 'create-profile error'
        }



      } catch(error) {
        console.log('useGlobal.createProfile: ', error)
      }
    }
  },

  // EDIT LATER ON, thumnbail attribute has been added, so create-profile request should happen once

  // create: async (form, user) => {

  //   if(user.token) {
  //     try {
  //       const response = await api({
  //         method: 'post',
  //         url: '/api/v1/profiles/actions/create-profile/',
  //         data: {
  //           birthday: form.birthday,
  //           dorm_building: form.dorm,
  //           sex: form.sex,
  //           interests: form.interests,
  //         },
  //         headers: {"Authorization": `Bearer ${user.token}`},
  //       })

  //       if (response.status !== 200) {
  //         throw 'Authentication error'
  //       }
  //       console.log('create-profile success')
  //       set((state) => ({
  //         profileCreated:true,
  //         user:response.data,
  //       }))

  //     } catch(error) {
  //       console.log('useGlobal.create: ', error.response)
  //     }
  //   }

  //   set((state) => ({
  //     profileCreated:true,
  //   }))
  // },

  // ----------------------------------------------*/
  // needed for profile updating 

  // //---------------------
	// //     Image Upload
	// //---------------------
  // uploadImage: async (file, user) => {

  //   if (user.token) {
  //     try {
  //       const dataForm = new FormData()
  //       const imageUri = file.uri
  //       const fileName = imageUri.split('/').pop()
  //       const fileType = fileName.split('.')[1]

  //       dataForm.append('image', {
  //         name: fileName,
  //         type: Platform.OS === 'ios' ? file.type : 'image/' + fileType,
  //         uri:
  //           Platform.OS === 'android'
  //             ? file.uri
  //             : file.uri.replace('file://', ''),
  //       })

  //       const response = await api({
  //         method: 'post',
  //         url: '/api/v1/photos/',
  //         data: dataForm,
  //         headers: {"Authorization": `Bearer ${user.token}`, 'Content-Type' : 'multipart/form-data'},
  //       })

  //       if (response.status !== 200) {
  //         throw 'Authentication error'
  //       }
  //       console.log('create-photo success')
  //       set((state) => ({
  //         image:imageUri
  //       }))

  //     } catch(error) {
  //       console.log('Global.uploadImage error: ', error)
  //     }
  //   }
  // },

  //---------------------
	//      Websocket
	//---------------------
  socket: null,

  socketConnect: async () => {
    const tokens = await secure.get('tokens')
    
    const socket = new WebSocket(
      `ws://${ADDRESS}/chat/?token=${tokens.access}`
    )

    socket.onopen = () => {
      console.log('socket.onopen')

      socket.send(JSON.stringify({
        source: 'request.list'
      }))
      socket.send(JSON.stringify({
        source: 'friend.list'
      }))
    }
    socket.onmessage = (event) => {
      // convert data to js object
      const parsed = JSON.parse(event.data)

      console.log('onmessage. ', parsed)

      const responses = {
        'friend.list': responseFriendList,
				'friend.new': responseFriendNew,
				'message.list': responseMessageList,
				'message.send': responseMessageSend,
				'message.type':    responseMessageType,
				'request.accept': responseRequestAccept,
				'request.connect': responseRequestConnect,
				'request.list': responseRequestList,
				'search': responseSearch,
				'thumbnail': responseThumbnail
      }
      const resp = responses[parsed.source]
      if (!resp) {
        console.log('parsed.source "' + parsed.source + '" not found')
        return
      }
      // call resp function
      resp(set, get, parsed.data)
    }
    socket.onerror = (e) => {
      console.log('socket.onerror: ', e.message)
    }
    socket.onclose = () => {
      console.log('socket.onclose')
    }
    set((state) => ({
      socket:socket
    }))
  },

  socketDisconnect: () => {
    const socket = get().socket
    if (socket) {
      socket.close()
    }
    set((state) => ({
      socket:null
    }))
  },

  //---------------------
	//     Thumbnail
	//---------------------
  uploadThumbnail: (file) => {
    socket = get().socket
    socket.send(JSON.stringify({
      source: 'thumbnail',
      base64: file.base64,
      filename: file.fileName
    }))
  },


  //---------------------
	//     Search
	//---------------------
	searchList: null,

	searchUsers: (query) => {
		if (query) {
			const socket = get().socket
			socket.send(JSON.stringify({
				source: 'search',
				query: query
			}))
		} else {
			set((state) => ({
				searchList: null
			}))
		}
	},

  //-------------------
  //  Friend Requests
  //-------------------
  requestList: null,

	requestAccept: (id) => {
		const socket = get().socket
		socket.send(JSON.stringify({
			source: 'request.accept',
			id: id
		}))
	},

	requestConnect: (id) => {
		const socket = get().socket
		socket.send(JSON.stringify({
			source: 'request.connect',
			id: id
		}))
	},

  //-------------------
  //    Friend List
  //-------------------
  friendList: null,

  //---------------------
	//     Messages
	//---------------------
	messagesList: [],
	messagesNext: null,
	messagesTyping: null,
	messagesId: null,

	messageList: (connectionId, page=0) => {
		if (page === 0) {
			set((state) => ({
				messagesList: [],
				messagesNext: null,
				messagesTyping: null,
				messagesId: null
			}))
		} else {
			set((state) => ({
				messagesNext: null
			}))
		}
		const socket = get().socket
		socket.send(JSON.stringify({
			source: 'message.list',
			connectionId: connectionId,
			page: page
		}))
	},

	messageSend: (connectionId, message) => {
		const socket = get().socket
		socket.send(JSON.stringify({
			source: 'message.send',
			connectionId: connectionId,
			message: message
		}))
	},

	messageType: (id) => {
		const socket = get().socket
		socket.send(JSON.stringify({
			source: 'message.type',
			id: id
		}))
	},

  //---------------------
	//       Theme
	//---------------------
  theme: 'dark',

  setTheme: () => {
    set((state) => ({
      theme: get().theme === 'dark' ? 'light' : 'dark'
    }))
  },

}))



export default useGlobal