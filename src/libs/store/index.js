import { create } from 'zustand';
import { createProfileSlice } from './client/createProfileSlice';
import secure from "../../core/secure";


const initialState = {
  user: {},
  authenticated: false,
}


const useBearStore = create((set, get) => ({
  ...initialState,
  ...createProfileSlice(set, get),

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