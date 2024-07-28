const updateProfileSlice = (set, get) => ({

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
      const initialValues = {
        name: user.name,
        city: user.city,
        state: user.state,
        graduation_year: user.graduation_year,
        major: user.major,
        description: user.description,
        interests: [...user.interests],
        dorm_building: user.dorm_building,
        thumbnail: user.thumbnail,
      }
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

export {updateProfileSlice};