import api from '../core/api';


export const profileSlice = (set) => ({
  editProfile: async (form, user) => {
    if (user.token) {
      try {
        // take out empty fields
        const cleanedForm = Object.fromEntries(
          Object.entries(form).filter(
            ([_, v]) => v != "" | null | []
          )
        )
        // make api request
        const response = await api({
          method: 'put',
          url: `/api/v1/profiles/${user.id}/`,
          data: cleanedForm,
          headers: {"Authorization": `Bearer ${user.token}`},
        })
        // check request status
        if (response.status !== 200) {
          throw new Error('edit-profile error')
        } else {
          set((state) => ({
            user:response.data,
          }))
        }
      } catch (error) {
        console.log('zustand.profile.editProfile ', error)
      }
    } else {
      console.log('zustand.profile.editProfile : not authenticated')
    }
  }
})