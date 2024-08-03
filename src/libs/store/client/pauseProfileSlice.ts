import apiInstance from "constants/apiConstants";

// Define types for the user and state
interface User {
  token: string | null;
  // Add other user properties if needed
}

interface PauseProfileState {
  user: User;
  paused: boolean; // Assuming paused is a boolean; adjust if needed
}

// Define the slice methods
interface PauseProfileSlice {
  pauseProfile: () => Promise<void>;
}

// Create the slice function with TypeScript typings
const pauseProfileSlice = (set: (state: Partial<PauseProfileState>) => void, get: () => PauseProfileState): PauseProfileSlice => ({
  pauseProfile: async () => {
    const user = get().user;
    if (user.token) {
      try {
        const response = await apiInstance({
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
          // Set paused
          set({
            paused: response.data.pause_profile
          });
        }
      } catch (error: any) {
        console.log("[error-external] pauseProfile");
        console.log(error);
        console.log(error.response);
      }
    } else {
      console.log("[error] no auth");
    }
  },
});

export { pauseProfileSlice };
