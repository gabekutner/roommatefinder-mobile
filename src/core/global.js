import { 
  Platform, 
} from 'react-native';

import { create } from 'zustand';

import secure from './secure';
import api, { ADDRESS } from './api';


//-------------------------------------
//  Socket receive message handlers
//-------------------------------------
function responseThumbnail(set, get, data) {
  set((state) => ({
    user:data
  }))
}

const useGlobal = create((set, get) => ({

  //-------------------
  //  Initialization
  //-------------------
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


  //-------------------
  //  Authentication
  //-------------------
  authenticated: false,
  user: {},

  login: (credentials, user, tokens ) => {
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

  //-------------------
  //  Create Profile
  //-------------------
  profileCreated: false,

  create: async (form, user) => {

    if(user.token) {
      try {
        const response = await api({
          method: 'post',
          url: '/api/v1/profiles/actions/create-profile/',
          data: {
            birthday: form.birthday,
            dorm_building: form.dorm,
            sex: form.sex,
            interests: form.interests,
          },
          headers: {"Authorization": `Bearer ${user.token}`},
        })

        if (response.status !== 200) {
          throw 'Authentication error'
        }
        console.log('create-profile success')
        set((state) => ({
          profileCreated:true,
          user:response.data,
        }))

      } catch(error) {
        console.log('useGlobal.create: ', error.response)
      }
    }

    set((state) => ({
      profileCreated:true,
    }))
  },

  //-------------------
  //  Upload Images
  //-------------------
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

  //-------------------
  //    Websocket
  //-------------------
  socket: null,

  socketConnect: async () => {
    const tokens = await secure.get('tokens')
    
    const socket = new WebSocket(
      `ws://${ADDRESS}/chat/?token=${tokens.access}`
    )

    socket.onopen = () => {
      console.log('socket.onopen')
    }
    socket.onmessage = (event) => {
      // convert data to js object
      const parsed = JSON.parse(event.data)

      console.log('onmessage. ', parsed)

      const responses = {
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

  socketDisconnect: async () => {

  },

  //-------------------
  //    Thumbnail
  //-------------------
  uploadThumbnail: (file) => {
    socket = get().socket
    socket.send(JSON.stringify({
      source: 'thumbnail',
      base64: file.base64,
      filename: file.fileName
    }))
  },

  //-------------------
  //      Search
  //-------------------
  searchList: null,

  searchUsers: (query) => {
    if (query) {
      
    }
  },
}))



export default useGlobal