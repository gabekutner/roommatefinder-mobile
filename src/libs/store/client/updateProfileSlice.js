const updateProfileSlice = (set, get) => ({
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
      let i = 0;
      for (const [key, value] of Object.entries(form)) {
        if (value === initialValues[key] || JSON.stringify(value) === JSON.stringify(initialValues[key])) {
          i++
        } else {
          if (key === "interests") {
            value.forEach((item, index) => {
              dataForm.append('interests', item); 
            });
          } else {
            if (key !== 'photos') dataForm.append(key, value);
          };
        };
      };
      if (i < 9) {
        // 2. submit 
        try {
          const response = await api({
            method: "put",
            url: `/api/v1/profiles/${user.id}/`,
            data: dataForm,
            headers: {
              Authorization: `Bearer ${get().user.token}`,
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.status !== 200) {
            throw new Error("[error-internal] updateProfile");
          } else {
            console.log("[success] updateProfile");
            set(() => ({
              user: response.data,
            }));
          };
        } catch (e) {
          console.log("[error-external] updateProfile");
          console.log(e);
          console.log(e.response);
        };
      }
    } else {
      console.log('[error] no auth');
    };
  },
})

export {updateProfileSlice};