import React, {useState} from "react";
import {SignIn, SignUp, Auth} from "./auth.view";

function AuthScreen({route, navigation}) {
  const {title, page} = route.params;

  if (page === "signin") {
    const [form, setForm] = useState({
      email: "",
      password: "",
    });
    return (
      <Auth title={title}>
        <SignIn navigation={navigation} form={form} setForm={setForm} />
      </Auth>
    );
  }

  if (page === "signup") {
    const [form, setForm] = useState({
      name: "",
      email: "",
      password: "",
      rpassword: "",
    });
    return (
      <Auth title={title}>
        <SignUp navigation={navigation} form={form} setForm={setForm} />
      </Auth>
    );
  }
}

export default AuthScreen;
