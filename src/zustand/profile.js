import api from '../core/api';


export const profileSlice = (set) => ({
  editProfile: async (_form, form,  user) => {
    if (user.token) {
      try {
        // take out empty fields
        const cleanedForm = Object.fromEntries(
          Object.entries(_form).filter(
            ([_, v]) => v != "" | null | []
          )
        )
        // add dorm_building & interests to cleanedForm
        if (form.dorm_building !== '') {
          cleanedForm['dorm_building'] = form.dorm_building
        }
        if (form.interests.length !== 0) {
          cleanedForm['interests'] = form.interests
        }
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