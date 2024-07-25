import { Platform } from "react-native";
import api from "../../../core/api";


const createProfileSlice = (set, get) => ({
  // send identifier
  sendIdentifier: async (identifier) => {
    try {
      const response = await api({
        method: "post",
        url: "/api/v1/profiles/",
        data: {
          identifier: identifier
        }
      });

      if (response.status !== 200) {
        throw new Error("[error-internal] sendIdentifier");
      } else {
        console.log("[success] sendIdentifier");
        set(() => ({
          user: response.data,
        }));
      };

    } catch(e) {
      console.log("[error-external] sendIdentifier");
    };
  },

  // send otp 
  sendOTP: async (otp) => {
    try {
      const response = await api({
        method: "post",
        url: "/api/v1/profiles/actions/verify-otp/",
        data: {
          otp: otp
        },
        headers: {
          Authorization: `Bearer ${get().user.token}`
        },
      });

      if (response.status !== 200) {
        throw new Error("[error-internal] sendOTP");
      } else {
        console.log("[success] sendOTP");
        set(() => ({
          user: response.data,
        }));
      };
      return response.data;

    } catch(e) {
      console.log("[error-external] sendOTP")
    };
  },

  // send passwords
  sendPassword: async (password, repeatedPassword) => {
    try {
      const response = await api({
        method: "post",
        url: "/api/v1/profiles/actions/create-password/",
        data: {
          password: password,
          repeated_password: repeatedPassword
        },
        headers: {
          Authorization: `Bearer ${get().user.token}`
        },
      });

      if (response.status !== 200) {
        throw new Error("[error-internal] sendPassword");
      } else {
        console.log("[success] sendPassword");
        set(() => ({
          user: response.data,
        }));
      };

    } catch(e) {
      console.log("[error-external] sendPassword")
    };
  },

  // send profile
  sendProfile: async (form) => {
    try {
      const dataForm = new FormData();
      const imageUri = form.thumbnail.uri;
      const fileName = imageUri.split("/").pop();
      const fileType = fileName.split(".")[1];
      dataForm.append("thumbnail", {
        name: fileName,
        type: Platform.OS === "ios" ? form.thumbnail.type : "image/" + fileType,
        uri:
          Platform.OS === "android"
            ? form.thumbnail.uri
            : form.thumbnail.uri.replace("file://", ""),
      });

      dataForm.append("name", form.name);
      dataForm.append("age", form.age);
      dataForm.append("sex", form.sex);
      dataForm.append("dorm_building", form.dorm);
      dataForm.append("city", form.city);
      dataForm.append("state", form.state);
      dataForm.append("major", form.major);
      dataForm.append("description", form.about);

      for (let i in form.interests) {
        dataForm.append("interests[]", i);
      };

      const response = await api({
        method: "post",
        url: "/api/v1/profiles/actions/create-profile/",
        data: dataForm,
        headers: {
          Authorization: `Bearer ${get().user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status !== 201) {
        throw new Error("[error-internal] sendProfile");
      } else {
        console.log("[success] sendProfile");
        get().login()
        set(() => ({
          user: response.data,
        }));
      };

    } catch(e) {
      console.log("[error-external] sendProfile")
      console.log(e)
    }
  }
}); 

export {createProfileSlice};