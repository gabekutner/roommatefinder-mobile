import api from "../../core/api";
import secure from "../../core/secure";

// auth state management
export const authSlice = (set) => ({
  //---------------------
  //    Initialization
  //---------------------
  initialized: false,
  init: async () => {
    const credentials = await secure.get("credentials");
    if (credentials) {
      try {
        // make api request
        const response = await api({
          method: "post",
          url: "/api/v1/users/login/",
          data: {
            email: credentials.email,
            password: credentials.password,
          },
        });
        // check response status
        if (response.status !== 200) {
          throw new Error("Authentication error");
        } else {
          // set tokens
          const created = response.data.name == null ? false : true;
          const tokens = {
            access: response.data.access,
            refresh: response.data.refresh,
          };
          secure.set("tokens", tokens);
          set((state) => ({
            initialized: true,
            authenticated: true,
            profileCreated: created,
            user: response.data,
          }));
          return;
        }
      } catch (error) {
        console.log("zustand.auth.init ", error);
      }
    } else {
      console.log("zustand.auth.init : not authenticated");
    }
    set((state) => ({
      initialized: true,
    }));
  },
  //---------------------
  //   Authentication
  //---------------------
  authenticated: false,
  user: {},

  login: (credentials, user, tokens) => {
    secure.set("credentials", credentials);
    secure.set("tokens", tokens);
    set((state) => ({
      authenticated: true,
      user: user,
      profileCreated: user.has_account,
    }));
  },

  logout: () => {
    secure.wipe();
    set((state) => ({
      authenticated: false,
      user: {},
      profileCreated: false,
    }));
  },
});
