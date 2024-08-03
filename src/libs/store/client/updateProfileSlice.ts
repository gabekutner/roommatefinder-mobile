import apiInstance from "constants/apiConstants";
import { Profile } from "types/django";


interface UpdateProfileForm {
  name?: string;
  city?: string;
  state?: string;
  graduation_year?: number;
  major?: string;
  description?: string;
  interests?: string[];
  dorm_building?: string;
  thumbnail?: string;
  // Adjust this type based on the actual structure of photos
  photos?: any; 
}

interface UpdateProfileState {
  user: Profile;
}

interface UpdateProfileSlice {
  updateProfile: (form: UpdateProfileForm) => Promise<void>;
}

// Helper function to determine if two values are equal
const areValuesEqual = (value1: any, value2: any): boolean => {
  // Handle array comparisons
  if (Array.isArray(value1) && Array.isArray(value2)) {
    return JSON.stringify(value1) === JSON.stringify(value2);
  }
  // Handle other comparisons
  return value1 === value2;
}

// Create the slice function with TypeScript typings
const updateProfileSlice = (set: (state: Partial<UpdateProfileState>) => void, get: () => UpdateProfileState): UpdateProfileSlice => ({
  updateProfile: async (form: UpdateProfileForm) => {
    const user = get().user;
    if (user.token) {
      // 1. Remove untouched values
      const initialValues = {
        name: user.name,
        city: user.city,
        state: user.state,
        graduation_year: user.graduation_year,
        major: user.major,
        description: user.description,
        interests: user.interests,
        dorm_building: user.dorm_building,
        thumbnail: user.thumbnail,
      };

      const dataForm = new FormData();
      let untouchedCount = 0;

      for (const [key, value] of Object.entries(form)) {
        const initialValue = initialValues[key as keyof typeof initialValues];
        if (areValuesEqual(value, initialValue)) {
          untouchedCount++;
        } else {
          if (key === "interests" && Array.isArray(value)) {
            value.forEach((item: string) => {
              dataForm.append('interests', item);
            });
          } else if (key !== 'photos') {
            dataForm.append(key, value as any);
          }
        }
      }

      if (untouchedCount < Object.keys(initialValues).length) {
        // 2. Submit
        try {
          const response = await apiInstance({
            method: "put",
            url: `/api/v1/profiles/${user.id}/`,
            data: dataForm,
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.status !== 200) {
            throw new Error("[error-internal] updateProfile");
          } else {
            console.log("[success] updateProfile");
            set({
              user: response.data,
            });
          }
        } catch (error: any) {
          console.log("[error-external] updateProfile");
          console.error(error);
          if (error.response) {
            console.error(error.response);
          }
        }
      }
    } else {
      console.log('[error] no auth');
    }
  },
});

export { updateProfileSlice };