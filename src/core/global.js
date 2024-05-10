import { 
  Platform, 
} from 'react-native';

import { create } from 'zustand';

import secure from './secure';
import api, { ADDRESS } from './api';


//-------------------------------------
//  Socket receive message handlers
//-------------------------------------
function responseRequestConnect(set, get, connection) {
	const user = get().user
	// If i was the one that made the connect request, 
	// update the search list row
	if (user.username === connection.sender.username) {
		const searchList = [...get().searchList]
		const searchIndex = searchList.findIndex(
			request => request.username === connection.receiver.username
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

  //---------------------
	//     Image Upload
	//---------------------
  uploadImage: async (file, user) => {

    if (user.token) {
      try {
        const dataForm = new FormData()
        const imageUri = file.uri
        const fileName = imageUri.split('/').pop()
        const fileType = fileName.split('.')[1]

        dataForm.append('image', {
          name: fileName,
          type: Platform.OS === 'ios' ? file.type : 'image/' + fileType,
          uri:
            Platform.OS === 'android'
              ? file.uri
              : file.uri.replace('file://', ''),
        })

        const response = await api({
          method: 'post',
          url: '/api/v1/photos/',
          data: dataForm,
          headers: {"Authorization": `Bearer ${user.token}`, 'Content-Type' : 'multipart/form-data'},
        })

        if (response.status !== 200) {
          throw 'Authentication error'
        }
        console.log('create-photo success')
        set((state) => ({
          image:imageUri
        }))

      } catch(error) {
        console.log('Global.uploadImage error: ', error)
      }
    }
  },

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
    }
    socket.onmessage = (event) => {
      // convert data to js object
      const parsed = JSON.parse(event.data)

      console.log('onmessage. ', parsed)

      const responses = {
        'request.connect': responseRequestConnect,
        'request.accept': responseRequestAccept,
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
}))



export default useGlobal