import api from "../../core/api";
import secure from "../../core/secure";

// profile state management
export const profileSlice = (set) => ({
  //---------------------
  //   Create Profile
  //---------------------
  profileCreated: false,
  form: {
    birthday: new Date(),
    sex: "",
    city: "",
    state: "",
    graduation_year: "",
    major: "",
    interests: [],
    prompts: [],
    quotes: [],
    links: [],
    dorm_building: "",
  },
  setForm: (form) => {
    set((state) => ({
      form: form,
    }));
  },
  createProfile: async (form, user) => {
    if (user.token) {
      try {
        // format birthday
        const bday =
          (form.birthday.getMonth() > 8
            ? form.birthday.getMonth() + 1
            : "0" + (form.birthday.getMonth() + 1)) +
          "-" +
          (form.birthday.getDate() > 9
            ? form.birthday.getDate()
            : "0" + form.birthday.getDate()) +
          "-" +
          form.birthday.getFullYear();
        form.birthday = bday;
        // make api request
        const response = await api({
          method: "post",
          url: "/api/v1/profiles/actions/create-profile/",
          data: form,
          headers: {Authorization: `Bearer ${user.token}`},
        });
        // check response status
        if (response.status !== 201) {
          throw new Error("create-profile error");
        } else {
          // set tokens
          const tokens = {
            access: response.data.token,
            refresh: response.data.refresh_token,
          };
          await secure.set("tokens", tokens);
          set((state) => ({
            profileCreated: true,
            user: response.data,
          }));
        }
      } catch (error) {
        console.log("zustand.profile.createProfile: ", error.response);
      }
    } else {
      console.log("zustand.profile.createProfile : not authenticated");
    }
  },
  //---------------------
  //    Edit Profile
  //---------------------
  editProfile: async (_form, form, user) => {
    if (user.token) {
      try {
        // take out empty fields
        const cleanedForm = Object.fromEntries(
          Object.entries(_form).filter(([_, v]) => (v != "") | null | [])
        );
        // add dorm_building & interests to cleanedForm
        if (form.dorm_building !== "") {
          cleanedForm["dorm_building"] = form.dorm_building;
        }
        if (form.interests.length !== 0) {
          cleanedForm["interests"] = form.interests;
        }
        // make api request
        const response = await api({
          method: "put",
          url: `/api/v1/profiles/${user.id}/`,
          data: cleanedForm,
          headers: {Authorization: `Bearer ${user.token}`},
        });
        // check response status
        if (response.status !== 200) {
          throw new Error("edit-profile error");
        } else {
          // set user data
          set((state) => ({
            user: response.data,
          }));
        }
      } catch (error) {
        console.log("zustand.profile.editProfile ", error.response);
      }
    } else {
      console.log("zustand.profile.editProfile : not authenticated");
    }
  },
  //---------------------
  //   Delete Profile
  //---------------------
  deleteProfile: async (user) => {
    if (user.token) {
      try {
        // make api request
        const response = await api({
          method: "delete",
          url: `/api/v1/profiles/${user.id}/`,
          headers: {Authorization: `Bearer ${user.token}`},
        });
        // check response status
        if (response.status !== 200) {
          throw new Error("edit-profile error");
        } else {
          // return response object
          return response;
        }
      } catch (error) {
        if (error.response.status === 404) {
          return 404;
        } else {
          console.log("zustand.profile.deleteProfile ", error);
        }
      }
    } else {
      console.log("zustand.profile.deleteProfile : not authenticated");
    }
  },

  pauseProfile: async (user) => {
    if (user.token) {
      try {
        // make api request
        const response = await api({
          method: "post",
          url: "/api/v1/profiles/actions/pause-profile/",
          headers: {Authorization: `Bearer ${user.token}`},
        });
        // check response status
        if (response.status !== 200) {
          throw new Error("pause-profile error");
        } else {
          // reset user state
          set((state) => ({
            user: response.data,
          }));
        }
      } catch (error) {
        console.log("useGlobal.pauseProfile: ", error);
      }
    } else {
      console.log("zustand.profile.pauseProfile : not authenticated");
    }
  },
});
