import apiInstance from "constants/apiConstants";
import { Profile } from "types/django";


interface DeckCardsState {
  user: Profile;
  // Add other state properties if needed
}

interface GetDeckCardsSlice {
  swipeProfiles: (page: number) => Promise<any>; // Adjust the return type based on the actual response
}

// Create the slice function with TypeScript typings
const getDeckCards = (set: (state: Partial<DeckCardsState>) => void, get: () => DeckCardsState): GetDeckCardsSlice => ({
  swipeProfiles: async (page: number) => {
    const user = get().user;
    if (user.token) {
      try {
        // Make API request
        const response = await apiInstance({
          method: "get",
          url: `/api/v1/profiles/actions/swipe-profiles/?page=${page}`,
          headers: {
            Authorization: `Bearer ${user.token}`
          },
        });

        if (response.status !== 200) {
          throw new Error("[error] swipeProfiles");
        } else {
          console.log('[success] swipeProfiles');
          return response;
        }
      } catch (error) {
        console.log('[error] swipeProfiles');
        // Since `error` might not have a `response` property, type it as `any` to access it safely
        console.error(error);
        return null; // Adjust based on what you want to return in case of error
      }
    } else {
      console.log('[error] not authenticated');
      return null; // Adjust based on what you want to return in case of unauthenticated access
    }
  }
});

export { getDeckCards };
