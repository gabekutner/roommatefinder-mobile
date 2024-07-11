import api from '../../core/api';

// widgets state management
export const widgetsSlice = (set) => ({
  //---------------------
  //    Delete Widgets
  //---------------------
  deleteLink: async (id, user) => {
    if (user.token) {
      try {
        // make api request
        const response = await api({
          method:"delete",
          url: `/api/v1/links/${id}/`,
          headers: {"Authorization": `Bearer ${user.token}`},
        })
        // check response status
        if (response.status != 200) {
          throw new Error('delete-link error')
        } else {
          console.log('delete link ', id)
          set((state) => ({
            user:response.data
          }))
        }
      } catch (error) {
        console.log('zustand.widgets.deleteLink ', error.response)
      }
    } else {
      console.log('zustand.widgets.deleteLink : unauthenticated')
    }
  },

  //---------------------
  //    Upload Widgets
  //---------------------
  uploadLinks: async (links, user) => {
    if (user.token) {
      try {
        // make api request
        const response = await api({
          method: 'post',
          url: '/api/v1/links/',
          data: links,
          headers: {"Authorization": `Bearer ${user.token}`}
        })
        // check response status 
        if (response.status != 201) {
          throw new Error('upload-link error')
        } else {
          console.log('upload link success')
        }
      } catch (error) {
        console.log('zustand.widgets.uploadWidgets ', error)
      }
    } else {
      console.log('zustand.widgets.uploadWidgets : not authenticated')
    }
  }

})