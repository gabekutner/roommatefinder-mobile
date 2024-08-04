import { Platform } from "react-native";
import api from "../../../core/api";
import { Profile } from "types/django";

interface FormDataType {
  thumbnail: {
    uri: string;
    type?: string;
  };
  name: string;
  age: number;
  sex: string;
  dorm: string;
  city: string;
  state: string;
  major: string;
  about: string;
  interests: string[];
}

interface PhotosFormData {
  photos: {
    [key: string]: {
      uri: string;
      type?: string;
    };
  };
}

interface ProfileSlice {
  sendIdentifier: (identifier: string) => Promise<number | undefined>;
  sendOTP: (otp: string) => Promise<any>;
  sendPassword: (password: string, repeatedPassword: string) => Promise<number | undefined>;
  sendProfile: (form: FormDataType) => Promise<void>;
  sendPhotos: (form: PhotosFormData) => Promise<void>;
}

const createProfileSlice = (set: (state: Partial<{ user: Profile }>) => void, get: () => { user: Profile }): ProfileSlice => ({
  // send identifier
  sendIdentifier: async (identifier: string) => {
    try {
      const response = await api({
        method: "post",
        url: "/api/v1/profiles/",
        data: {
          identifier: identifier
        }
      });

      if (response.status !== 201) {
        throw new Error("[error-internal] sendIdentifier");
      } else {
        console.log("[success] sendIdentifier");
        set({
          user: response.data,
        });
      }
      // possible status codes: 400, 201, 403
      return response.status;

    } catch (e: any) {
      console.log("[error-external] sendIdentifier");
      return e.response?.status;
    }
  },

  // send otp 
  sendOTP: async (otp: string) => {
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
        set({
          user: response.data,
        });
      }
      // expected status codes - 400, 404, 200
      return response;

    } catch (e: any) {
      console.log("[error-external] sendOTP");
      return e.response?.status;
    }
  },

  // send passwords
  sendPassword: async (password: string, repeatedPassword: string) => {
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
        set({
          user: response.data,
        });
      }
      return response.status;

    } catch (e: any) {
      console.log("[error-external] sendPassword");
    }
  },

  // send profile
  sendProfile: async (form: FormDataType) => {
    try {
      const dataForm = new FormData();
      const imageUri = form.thumbnail.uri;
      const fileName = imageUri.split("/").pop() || "image";
      const fileType = fileName.split(".")[1] || "jpeg";
      dataForm.append("thumbnail", {
        name: fileName,
        type: Platform.OS === "ios" ? form.thumbnail.type || "image/jpeg" : "image/" + fileType,
        uri: Platform.OS === "android" ? form.thumbnail.uri : form.thumbnail.uri.replace("file://", ""),
      });

      dataForm.append("name", form.name);
      dataForm.append("age", form.age.toString());
      dataForm.append("sex", form.sex);
      dataForm.append("dorm_building", form.dorm);
      dataForm.append("city", form.city);
      dataForm.append("state", form.state);
      dataForm.append("major", form.major);
      dataForm.append("description", form.about);

      form.interests.forEach(interest => {
        dataForm.append("interests", interest);
      });

      console.log(dataForm)

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
        set({
          user: response.data,
        });
      }

    } catch (e: any) {
      console.log("[error-external] sendProfile");
      console.log(e);
      console.log(e.response);
    }
  },

  sendPhotos: async (form: PhotosFormData) => {
    try {
      const dataForm = new FormData();
      for (const [key, value] of Object.entries(form.photos)) {
        const imageUri = value.uri;
        const fileName = imageUri.split("/").pop() || "image";
        const fileType = fileName.split(".")[1] || "jpeg";
        dataForm.append("image", {
          name: fileName,
          type: Platform.OS === "ios" ? value.type || "image/jpeg" : "image/" + fileType,
          uri: Platform.OS === "android" ? value.uri : value.uri.replace("file://", ""),
        });
      }
        
      const response = await api({
        method: "post",
        url: "/api/v1/photos/",
        data: dataForm,
        headers: {
          Authorization: `Bearer ${get().user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status !== 201) {
        throw new Error("[error-internal] sendPhotos");
      } else {
        console.log("[success] sendPhotos");
        // Uncomment and adjust if needed
        // set({ user: response.data });
      }

    } catch (e: any) {
      console.log("[error-external] sendPhotos");
      console.log(e);
      console.log(e.response);
    }
  }
});

export { createProfileSlice };
