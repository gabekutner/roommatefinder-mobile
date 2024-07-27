import api from "../../../core/api";


const getDeckCards = (set, get) => ({
  swipeProfiles: async (page) => {
    const user = get().user
    if (user.token) {
      try {
        // make api request
        const response = await api({
          method: "get",
          url: `/api/v1/profiles/actions/swipe-profiles/?page=${page}`,
          headers: {
            Authorization: `Bearer ${user.token}`
          },
        });
        if (response.status !== 200) {
          throw new Error("[error] swipeProfiles");
        } else {
          console.log('[success] swipeProfiles')
          return response;
        };
      } catch (error) {
        console.log('[error] swipeProfiles')
        return response;
      };
    } else {
      console.log('[error] not authenticated')
    }
  }
});

export {getDeckCards};