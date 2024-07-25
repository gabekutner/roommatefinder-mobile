import { create } from 'zustand';
import { createProfileSlice } from './client/createProfileSlice';
import secure from "../../core/secure";


const initialState = {
  user: {},
  authenticated: false,
  initialized: false,
};


const useBearStore = create((set, get) => ({
  ...initialState,
  ...createProfileSlice(set, get),

  // try login on app startup
  init: async () => {
    const credentials = await secure.get("credentials");
    if (credentials) {
      try {
        // make api request
        const response = await api({
          method: "post",
          url: "/api/v1/users/login/",
          data: {
            identifier: credentials.identifier,
            password: credentials.password,
          },
        });
        // check response status
        if (response.status !== 200) {
          throw new Error("Authentication error");
        } else {
          // set tokens
          const tokens = {
            access: response.data.access,
            refresh: response.data.refresh,
          };
          secure.set("tokens", tokens);
          set(() => ({
            initialized: true,
            authenticated: true,
            user: response.data,
          }));
          return;
        }
      } catch (error) {
        console.log("zustand.auth.init ", error.response);
      }
    } else {
      console.log("zustand.auth.init : not authenticated");
    }
    set(() => ({
      initialized: true,
    }));
  },

  login: (credentials, user, tokens) => {
    secure.set("credentials", credentials);
    secure.set("tokens", tokens);
    set(() => ({
      authenticated: true,
      user: user,
    }));
  },

}));

export default useBearStore;