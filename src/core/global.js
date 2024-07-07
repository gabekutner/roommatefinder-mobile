import { Platform } from 'react-native';

import { create } from 'zustand';
import { profileSlice } from '../zustand/slices/profile';

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
  // move friendList item for this friend to the start of
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
  // if the message data does not belong to this friend then
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
  // if i was the one that made the connect request,
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
  // if they were the one  that sent the connect
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
  // if I was the one that accepted the request, remove
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
  // if the corresponding user is contained within the 
  // searchList for the  acceptor or the  acceptee, update
  // the state of the searchlist item
  const sl = get().searchList
  if (sl === null) {
    return
  }
  const searchList = [...sl]

  let  searchIndex = -1
  // if this user  accepted
  if (user.id === connection.receiver.id) {
    searchIndex = searchList.findIndex(
      user => user.id === connection.sender.id
    )
  // if the other user accepted
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
  ...profileSlice(set),
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
      user:{},
      profileCreated:false,
      theme:'light',
    }))
  },

  //---------------------
  //    Create Profile
  //---------------------
  // form: {
  //   birthday: new Date(),
  //   sex: "",
  //   city: "",
  //   state: "",
  //   graduation_year: "",
  //   major: "",
  //   interests: [],
  //   prompts: [],
  //   quotes: [],
  //   links: [],
  //   dorm_building:""
  // },
  // setForm: (form) => {
  //   set((state) => ({
  //     form: form
  //   }))
  // },

  // profileCreated: false,
  // createProfile: async (form, user) => {
  //   if (user.token) {
  //     try {
  //       const bday = ((
  //         form.birthday.getMonth() > 8)
  //         ? (form.birthday.getMonth() + 1)
  //         : ('0' + (form.birthday.getMonth() + 1)))
  //         + '-' + ((form.birthday.getDate() > 9)
  //         ? form.birthday.getDate()
  //         : ('0' + form.birthday.getDate()))
  //         + '-' + form.birthday.getFullYear()
  //       form.birthday = bday
  
  //       const response = await api({
  //         method: 'post',
  //         url: '/api/v1/profiles/actions/create-profile/',
  //         data: form,
  //         headers: {"Authorization": `Bearer ${user.token}`},
  //       })

  //       if (response.status !== 201) {
  //         throw 'create-profile error'
  //       }

  //       const tokens = {'access': response.data.token, 'refresh': response.data.refresh_token}
  //       await secure.set('tokens', tokens)
  //       console.log('create-profile success')
  //       set((state) => ({
  //         profileCreated:true,
  //         user:response.data,
  //       }))
  //     } catch(error) {
  //       console.log('useGlobal.createProfile: ', error)
  //     }
  //   }
  // },

  //---------------------
  //    Pause Profile
  //---------------------
  pauseProfile: async (user) => {  
    if (user.token) {
      try {
        const response = await api({
          method: 'post',
          url: '/api/v1/profiles/actions/pause-profile/',
          headers: {"Authorization": `Bearer ${user.token}`},
        })
        if (response.status !== 200) {
          throw new Error('pause-profile error')
        }
        console.assert.log('pause-profile success')
        set((state) => ({
          user:response.data
        }))
      } catch(error) {
        console.log('useGlobal.pauseProfile: ', error)
      }
    }
  },

  //---------------------
  //    Upload Photos 
  //---------------------
  photos: {
    thumbnail:null,
    photo_1:null,
    photo_2:null,
    photo_3:null,
  },
  setPhotos: (form) => {
    set((state) => ({
      photos: form
    }))
  },

  uploadPhotos: async (form, user) => {
    if (user.token) {
      try {
        const dataForm = new FormData()
        if (form.photo_1 !== null) {
          const imageUri = form.photo_1.uri
          const fileName = imageUri.split('/').pop()
          const fileType = fileName.split('.')[1]
          dataForm.append('image', {
            name: fileName,
            type: Platform.OS === 'ios' ? form.photo_1.type : 'image/' + fileType,
            uri:
              Platform.OS === 'android'
                ? form.photo_1.uri
                : form.photo_1.uri.replace('file://', ''),
          })
        }
        if (form.photo_2 !== null) {
          const imageUri = form.photo_2.uri
          const fileName = imageUri.split('/').pop()
          const fileType = fileName.split('.')[1]
          dataForm.append('image', {
            name: fileName,
            type: Platform.OS === 'ios' ? form.photo_2.type : 'image/' + fileType,
            uri:
              Platform.OS === 'android'
                ? form.photo_2.uri
                : form.photo_2.uri.replace('file://', ''),
          })
        }
        if (form.photo_3 !== null) {
          const imageUri = form.photo_3.uri
          const fileName = imageUri.split('/').pop()
          const fileType = fileName.split('.')[1]
          dataForm.append('image', {
            name: fileName,
            type: Platform.OS === 'ios' ? form.photo_3.type : 'image/' + fileType,
            uri:
              Platform.OS === 'android'
                ? form.photo_3.uri
                : form.photo_3.uri.replace('file://', ''),
          })
        }

        const response = await api({
          method: 'post',
          url: '/api/v1/photos/',
          data: dataForm,
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type' : 'multipart/form-data',
          },
        })

        if (response.status !== 201) {
          throw 'upload-photos error'
        }

        console.log('uploaded photos!')

      } catch(error) {
        console.log('useGlobal.uploadPhotos: ', error)
      }
    }
  },

  staticUploadThumbnail: async (form, user) => {
    if (user.token) {
      try {

        const dataForm = new FormData()
        
        if (form.thumbnail.uri !== null) {
          const imageUri = form.thumbnail.uri
          const fileName = imageUri.split('/').pop()
          const fileType = fileName.split('.')[1]
          dataForm.append('thumbnail', {
            name: fileName,
            type: Platform.OS === 'ios' ? form.thumbnail.type : 'image/' + fileType,
            uri:
              Platform.OS === 'android'
                ? form.thumbnail.uri
                : form.thumbnail.uri.replace('file://', ''),
          })
          const response = await api({
            method: 'post',
            url: '/api/v1/profiles/actions/upload-thumbnail/',
            data: dataForm,
            headers: {
              'Authorization': `Bearer ${user.token}`,
              'Content-Type' : 'multipart/form-data',
            },
          })
            if (response.status !== 201) {
            throw 'static-upload-thumbnail error'
          }
            console.log('uploaded thumbnail!')
        }
      } catch(error) {
        console.log('useGlobal.uploadThumbnail: ', error)
      }
    }
  },

  //---------------------
  //    Roommate Quiz
  //---------------------
  matchingForm: {
    social_battery:0,
    clean_room:"",
    noise_level:0,
    guest_policy:"",
    in_room:0,
    hot_cold:0,
    bed_time:"",
    wake_up_time:"",
    sharing_policy:""
  },
  setMatchingForm: (form) => {
    set((state) => ({
      matchingForm: form
    }))
  },

  submitMatchingForm: async (form, user) => {
    if (user.token) {

      const response = await api({
        method: 'get',
        url: `/api/v1/matching-quizs/${user.id}`,
        headers: {"Authorization": `Bearer ${user.token}`},
      })
      if (response.data.length === 0) {
        try {
          form.hot_cold = form.hot_cold[0]
          form.in_room = form.in_room[0]
          form.noise_level = form.noise_level[0]
          form.social_battery = form.social_battery[0]
          const response = await api({
            method: 'post',
            url: '/api/v1/matching-quizs/',
            data: form,
            headers: {"Authorization": `Bearer ${user.token}`},
          })
          if (response.status !== 201) {
            throw 'submit-matching-quiz error'
          }
          console.log('submitted matching quiz!')
  
        } catch(error) {
          console.log(error.response)
        }
      } else {
        try {
          form.hot_cold = form.hot_cold[0]
          form.in_room = form.in_room[0]
          form.noise_level = form.noise_level[0]
          form.social_battery = form.social_battery[0]
          const response = await api({
            method:'put',
            url: `/api/v1/matching-quizs/${user.id}/`,
            data:form,
            headers: {"Authorization": `Bearer ${user.token}`}
          })
          if (response.status !== 200) {
            throw 'update-matching-form error'
          }
          console.log('updated matching quiz')
          set((state) => ({
            matchingForm:matchingForm
          }))
        } catch(error) {
          console.log('useGlobal.updateMatchingForm : ', error.response)
        }
      }
    }
  },

  //---------------------
  //    Edit Profile
  //---------------------
  // editProfile: async(form, user) => {
  //   if (user.token) {
  //     try {

  //       const cleanedForm = Object.fromEntries(Object.entries(form).filter(([_, v]) => v != "" | null | []))

  //       const response = await api({
  //         method: 'put',
  //         url: `/api/v1/profiles/${user.id}/`,
  //         data: cleanedForm,
  //         headers: {"Authorization": `Bearer ${user.token}`},
  //       })
  //       if (response.status !== 200) {
  //         throw 'create-profile error'
  //       }

  //       console.log('edit-profile success')
  //       set((state) => ({
  //         user:response.data,
  //       }))

  //     } catch(error) {
  //       console.log(error.response)
  //     }
  //   }
  // },

  //---------------------
  //        Swipe
  //---------------------
  getSwipe: async (user, page) => {
    if(user.token) {
      try {
        const response = await api({
          method: 'get',
          url: `/api/v1/swipe/?page=${page}`,
          headers: {"Authorization": `Bearer ${user.token}`},
        })
          if (response.status !== 200) {
          throw 'get-swipe error'
        }
          console.log('get-swipe success')
        return response

      } catch(error) {
        if (error.response.status === 404) {
          return 404
        } else {
          console.log(error)
        }
      }
    }
  },

  getSwipeProfile: async (user, id) => {
    if(user.token) {
      try {
        const response = await api({
          method: 'get',
          url: `/api/v1/swipe/${id}/`,
          headers: {"Authorization": `Bearer ${user.token}`},
        })
          if (response.status !== 200) {
          throw 'get-swipe-profile error'
        }
          console.log('get-swipe-profile success')
        return response


      } catch(error) {
        if (error.response.status === 404) {
          return 404
        } else {
          console.log(error)
        }
      }
    }
  },

  //---------------------
  //   Delete Profile
  //---------------------
  deleteProfile: async (user) => {
    if (user.token) {
      try {
        const response = await api({
          method: 'delete',
          url: `/api/v1/profiles/${user.id}/`,
          headers: {"Authorization": `Bearer ${user.token}`},
        })

        if (response.status !== 200) {
          throw 'delete-profile error'
        }
          console.log('delete-profile success')
        return response


      } catch(error) {
        if (error.response.status === 404) {
          return 404
        } else {
          console.log(error)
        }
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
  searchList: [],

  searchUsers: (query) => {
    if (query) {
      const socket = get().socket
      socket.send(JSON.stringify({
        source: 'search',
        query: query
      }))
    } else {
      set((state) => ({
        searchList: []
      }))
    }
  },

  //-------------------
  //  Friend Requests
  //-------------------
  requestList: null,

  refreshRequestList: () => {
    const socket = get().socket
    socket.send(JSON.stringify({
      source: 'request.list'
    }))
  },

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

  refreshFriendList: () => {
    const socket = get().socket
    socket.send(JSON.stringify({
      source: 'friend.list'
    }))
  },

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
  }

}))

export default useGlobal