const udpateProfileSlice = (set, get) => ({

  updateProfileForm: {
    name: null,
    city: null,
    state: null,
    graduation_year: null,
    major: null,
    description: null,
    interests: [],
    dorm_building: null,
    thumbnail: null,
  },
  setUpdateProfileForm: (form) => {
    set(() => ({
      updateProfileForm: form,
    }));
  },

  updateProfile: async (form) => {
    const user = get().user;
    if (user.token) {
      // 1. remove untouched values
      const dataForm = new FormData();
      for (const [key, value] of Object.entries(form)) {
        if (value === null || value.length === 0) {
          console.log('empty value')
        } else {
          dataForm.append(key, value)
        }
      }
      console.log(dataForm)
    } else {
      console.log('[error] no auth')
    }
  },
})

export {udpateProfileSlice};