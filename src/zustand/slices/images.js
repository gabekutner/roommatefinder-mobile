import { Platform } from 'react-native';
import api from '../../core/api';

// image state management
export const imageSlice = (set) => ({
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
        // format dataForm
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
        // make api request
        const response = await api({
          method: 'post',
          url: '/api/v1/photos/',
          data: dataForm,
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type' : 'multipart/form-data',
          },
        })
        // check response status
        if (response.status !== 201) {
          throw new Error('upload-photos error')
        }
      } catch (error) {
        console.log('zustand.images.uploadPhotos ', error)
      }
    }
  },

  staticUploadThumbnail: async (form, user) => {
    if (user.token) {
      try {
        // format dataForm
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
          // make api request
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
            throw new Error('static-upload-thumbnail error')
          } else {
            console.log('static upload thumbnail success')
          }
        }
      } catch (error) {
        console.log('zustand.images.staticUploadThumbnail ', error)
      }
    }
  },

  updatePhoto: async (obj, id, user) => {
    if (user.token) {
      try {
        // format dataform
        const dataForm = new FormData()
        const imageUri = obj.uri
        const fileName = imageUri.split('/').pop()
        const fileType = fileName.split('.')[1]
        dataForm.append('image', {
          name: fileName,
          type: Platform.OS === 'ios' ? obj.type : 'image/' + fileType,
          uri:
            Platform.OS === 'android'
              ? obj.uri
              : obj.uri.replace('file://', ''),
        })
        // make api request
        const response = await api({
          method: 'put',
          url: `/api/v1/photos/${id}/`,
          data: dataForm,
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type' : 'multipart/form-data',
          },
        })
        if (response.status !== 200) {
          throw new Error('update-photo error')
        } else {
          console.log('update photo success')
        }
      } catch (error) {
        console.log('zustand.images.updatePhoto ', error)
      }
    } else {
      console.log('zustand.images.updatePhoto : not authenticated')
    }
  },

  deletePhoto: async (id, user) => {
    if (user.token) {
      try {
        // make api request
        const response = await api({
          method: 'delete',
          url: `/api/v1/photos/${id}/`,
          headers: { 'Authorization': `Bearer ${user.token}` },
        })
        // check status
        if (response.status !== 200) {
          throw new Error('delete-photo error')
        } else {
          console.log('delete photo success')
        }
      } catch (error) {
        console.log('zustand.images.deletePhoto ', error)
      }
    }
  },

  uploadOnePhoto: async (obj, user) => {
    if (user.token) {
      try {
        // format dataform
        const dataForm = new FormData()
        const imageUri = obj.uri
        const fileName = imageUri.split('/').pop()
        const fileType = fileName.split('.')[1]
        dataForm.append('image', {
          name: fileName,
          type: Platform.OS === 'ios' ? obj.type : 'image/' + fileType,
          uri:
            Platform.OS === 'android'
              ? obj.uri
              : obj.uri.replace('file://', ''),
        })
        // make api request
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
          throw new Error('upload-one-photo error')
        } else {
          console.log('upload one photo success')
        }
      } catch (error) {
        console.log('zustand.images.uploadOnePhoto ', error)
      }
    } else {
      console.log('zustand.images.uploadOnePhoto : not authenticated')
    }
  }


})