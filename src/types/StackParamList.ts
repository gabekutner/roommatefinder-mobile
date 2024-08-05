import Profile from "./django/Profile";

export type AuthStackParamList = {
  startup: undefined;
  login: undefined;
  identifier: { id: string };
  code: undefined;
  password: undefined;
  setup: undefined;
};

export type AppStackParamList = {
  home: undefined;
  "privacy-policy": undefined;
  "how-to": undefined;
  search: undefined;
  message: undefined;
  "edit-profile": undefined;
  preview: {
    user: Profile
  };
  quiz: undefined;
};