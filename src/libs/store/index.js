import { create } from 'zustand';

import { createProfileSlice } from './client/createProfileSlice';
import { getDeckCards } from './client/getDeckCards';

import secure from "../../core/secure";


const initialState = {
  user: {},
  authenticated: false,
  initialized: false,
};


const useBearStore = create((set, get) => ({
  ...initialState,
  ...createProfileSlice(set, get),
  ...getDeckCards(set, get),

  // try login on app startup
  init: async () => {
    const credentials = await secure.get("credentials");
    if (credentials) {
      try {
        const response = await api({
          method: "post",
          url: "/api/v1/users/login/",
          data: {
            identifier: credentials.identifier,
            password: credentials.password,
          },
        });
        if (response.status !== 200) {
          throw new Error("[error-internal] init");
        } else {
          const tokens = {
            access: response.data.access,
            refresh: response.data.refresh,
          };
          secure.set("tokens", tokens);
          set(() => ({
            user: response.data,
            initialized: true,
            authenticated: true,
          }));
        };
      } catch (e) {
        console.log("[error-external] init")
      };
    } else {
      console.log("[not authenticated]");
    };
    // initialize either way
    set(() => ({
      initialized: true,
    }));
  },

  login: (credentials, user, tokens) => {
    secure.set("credentials", credentials);
    secure.set("tokens", tokens);
    set(() => ({
      user: user,
      authenticated: true,
    }));
  },

  logout: () => {
    secure.wipe();
    set(() => ({
      user: {},
      authenticated: false,
    }));
  }
}));

export default useBearStore;