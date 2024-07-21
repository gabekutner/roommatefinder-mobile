import api from "../../core/api";

/*global console */
/*eslint no-undef: "error"*/

// widgets state management
export const widgetsSlice = (set) => ({
  //---------------------
  //    Delete Widgets
  //---------------------
  deleteLink: async (id, user) => {
    if (user.token) {
      try {
        // make api request
        const response = await api({
          method: "delete",
          url: `/api/v1/links/${id}/`,
          headers: {Authorization: `Bearer ${user.token}`},
        });
        // check response status
        if (response.status != 200) {
          throw new Error("delete-link error");
        } else {
          console.log("delete link ", id);
          set(() => ({
            user: response.data,
          }));
        };
      } catch (error) {
        console.log("zustand.widgets.deleteLink ", error.response);
      };
    } else {
      console.log("zustand.widgets.deleteLink : unauthenticated");
    };
  },
  deleteQuote: async (id, user) => {
    if (user.token) {
      try {
        // make api request
        const response = await api({
          method: "delete",
          url: `/api/v1/quotes/${id}/`,
          headers: {Authorization: `Bearer ${user.token}`},
        });
        // check response status
        if (response.status != 200) {
          throw new Error("delete-quote error");
        } else {
          console.log("delete quote ", id);
          set(() => ({
            user: response.data,
          }));
        };
      } catch (error) {
        console.log("zustand.widgets.deleteQuote ", error.response);
      };
    } else {
      console.log("zustand.widgets.deleteQuote : unauthenticated");
    };
  },
  deletePrompt: async (id, user) => {
    if (user.token) {
      try {
        // make api request
        const response = await api({
          method: "delete",
          url: `/api/v1/prompts/${id}/`,
          headers: {Authorization: `Bearer ${user.token}`},
        });
        // check response status
        if (response.status != 200) {
          throw new Error("delete-prompt error");
        } else {
          console.log("delete prompt ", id);
          set(() => ({
            user: response.data,
          }));
        };
      } catch (error) {
        console.log("zustand.widgets.deletePrompt ", error.response);
      };
    } else {
      console.log("zustand.widgets.deletePrompt : unauthenticated");
    };
  },

  //---------------------
  //    Upload Widgets
  //---------------------
  uploadLink: async (links, user) => {
    if (user.token) {
      try {
        // make api request
        const response = await api({
          method: "post",
          url: "/api/v1/links/",
          data: links,
          headers: {Authorization: `Bearer ${user.token}`},
        });
        // check response status
        if (response.status != 201) {
          throw new Error("upload-link error");
        } else {
          console.log("upload link success");
        };
      } catch (error) {
        console.log("zustand.widgets.uploadLink ", error.response);
      };
    } else {
      console.log("zustand.widgets.uploadLink : not authenticated");
    };
  },
  uploadPrompt: async (prompts, user) => {
    if (user.token) {
      try {
        // make api request
        const response = await api({
          method: "post",
          url: "/api/v1/prompts/",
          data: prompts,
          headers: {Authorization: `Bearer ${user.token}`},
        });
        // check response status
        if (response.status != 201) {
          throw new Error("upload-prompts error");
        } else {
          console.log("upload prompt success");
        };
      } catch (error) {
        console.log("zustand.widgets.uploadPrompt ", error.response);
      };
    } else {
      console.log("zustand.widgets.uploadPrompt : not authenticated");
    };
  },
  uploadQuote: async (quotes, user) => {
    if (user.token) {
      try {
        // make api request
        const response = await api({
          method: "post",
          url: "/api/v1/quotes/",
          data: quotes,
          headers: {Authorization: `Bearer ${user.token}`},
        });
        // check response status
        if (response.status != 201) {
          throw new Error("upload-quotes error");
        } else {
          console.log("upload quotes success");
        };
      } catch (error) {
        console.log("zustand.widgets.uploadQuotes ", error.response);
      };
    } else {
      console.log("zustand.widgets.uploadQuotes : not authenticated");
    };
  },
});
