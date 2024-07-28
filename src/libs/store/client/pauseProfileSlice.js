// import api from "../../api/def";
import api from "../../../core/api";



const pauseProfileSlice = (set, get) => ({
  pauseProfile: async () => {
    const user = get().user;
    if (user.token) {
      try {
        const response = await api({
          method: "post",
          url: "/api/v1/profiles/actions/pause-profile/",
          headers: {
            Authorization: `Bearer ${user.token}`
          },
        });
        if (response.status !== 200) {
          throw new Error("[error-internal] pauseProfile");
        } else {
          console.log('[success] pauseProfile');
          // set paused
          set(() => ({
            paused: response.data.pause_profile
          }));
        };
      } catch (error) {
        console.log("[error-external] pauseProfile")
        console.log(error)
        console.log(error.response)
      };
    } else {
      console.log("[error] no auth")
    }
  },

});

export {pauseProfileSlice};