import api from "../../core/api";

/*global console */
/*eslint no-undef: "error"*/

// swipe state management
export const swipeSlice = () => ({
  getSwipe: async (user, page) => {
    if (user.token) {
      try {
        // make api request
        const response = await api({
          method: "get",
          url: `/api/v1/swipe/?page=${page}`,
          headers: {Authorization: `Bearer ${user.token}`},
        });
        // check response status
        if (response.status !== 200) {
          throw new Error("get-swipe error");
        } else {
          return response;
        };
      } catch (error) {
        if (error.response.status === 404) {
          return 404;
        } else {
          console.log("zustand.swipe.getSwipe ", error);
        };
      };
    };
  },

  getSwipeProfile: async (user, id) => {
    if (user.token) {
      try {
        // make api request
        const response = await api({
          method: "get",
          url: `/api/v1/swipe/${id}/`,
          headers: {Authorization: `Bearer ${user.token}`},
        });
        // check response status
        if (response.status !== 200) {
          throw "get-swipe-profile error";
        } else {
          return response;
        };
      } catch (error) {
        if (error.response.status === 404) {
          return 404;
        } else {
          console.log("zustand.swipe.getSwipeProfile ", error);
        };
      };
    };
  },
});
