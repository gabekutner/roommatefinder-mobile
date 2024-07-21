import api from "../../core/api";

/*global console */
/*eslint no-undef: "error"*/

// quiz state management
export const quizSlice = (set) => ({
  //---------------------
  //    Roommate Quiz
  //---------------------
  matchingForm: {
    social_battery: 0,
    clean_room: "",
    noise_level: 0,
    guest_policy: "",
    in_room: 0,
    hot_cold: 0,
    bed_time: "",
    wake_up_time: "",
    sharing_policy: "",
  },
  setMatchingForm: (form) => {
    set(() => ({
      matchingForm: form,
    }));
  },
  submitMatchingForm: async (form, user) => {
    if (user.token) {
      try {
        // make api request for matching quiz
        const response = await api({
          method: "get",
          url: `/api/v1/matching-quizs/${user.id}`,
          headers: {Authorization: `Bearer ${user.token}`},
        });
        // if no response, then create
        if (response.data.length === 0) {
          try {
            // format matching form
            form.hot_cold = form.hot_cold[0];
            form.in_room = form.in_room[0];
            form.noise_level = form.noise_level[0];
            form.social_battery = form.social_battery[0];
            // make api request
            const response = await api({
              method: "post",
              url: "/api/v1/matching-quizs/",
              data: form,
              headers: {Authorization: `Bearer ${user.token}`},
            });
            // check response status
            if (response.status !== 201) {
              throw new Error("submit-matching-quiz error");
            }
          } catch (error) {
            console.log("zustand.quiz.submitMatchingForm ", error);
          };
        } else {
          // update a matching quiz
          try {
            // format matching form
            form.hot_cold = form.hot_cold[0];
            form.in_room = form.in_room[0];
            form.noise_level = form.noise_level[0];
            form.social_battery = form.social_battery[0];
            // make api request
            const response = await api({
              method: "put",
              url: `/api/v1/matching-quizs/${user.id}/`,
              data: form,
              headers: {Authorization: `Bearer ${user.token}`},
            });
            // check response status
            if (response.status !== 200) {
              throw new Error("update-matching-form error");
            } else {
              set(() => ({
                matchingForm: response.data,
              }));
            }
          } catch (error) {
            console.log("zustand.quiz.submitMatchingForm ", error);
          }
        }
      } catch (error) {
        console.log("zustand.quiz.submitMatchingForm ", error);
      }
    }
  },
});
