import {Action} from "./AuthAction.view";

import useStore from "../../../../zustand/store";
import utils from "../../../../core/utils";

const signin = (props) => {
  /** props
   * form : object
   */
  if (!props.form.email || !props.form.password) {
    // setShowError({ ...showError, status:true, message:"Missing credentials."})
    return;
  }
  if (!utils.validEmail(props.form.email)) {
    // setShowError({ ...showError, status:true, message:"Invalid email address."})
    return;
  }
  api({
    method: "post",
    url: "/api/v1/users/login/",
    data: {
      email: props.form.email,
      password: props.form.password,
    },
  })
    .then((response) => {
      const credentials = {
        email: props.form.email,
        password: props.form.password,
      };
      props.login(credentials, response.data, {
        access: response.data.access,
        refresh: response.data.refresh,
      });
    })
    .catch((error) => {
      // Handle error
    });
};

const signup = (props) => {
  /** props
   * form : object
   */
  // const login = useStore(state => state.login)
  if (
    !props.form.name ||
    !props.form.email ||
    !props.form.password ||
    !props.form.rpassword
  ) {
    // setShowError({ ...showError, status:true, message:"Missing credentials."})
    return;
  }
  if (!utils.validEmail(props.form.email)) {
    // setShowError({ ...showError, status:true, message:"Invalid email address."})
    return;
  }
  if (props.form.password !== props.form.rpassword) {
    // setShowError({ ...showError, status:true, message:"Your passwords don't match." })
    return;
  }
  api({
    method: "post",
    url: "/api/v1/profiles/",
    data: {
      email: props.form.email,
      password: props.form.password,
      repeated_password: props.form.rpassword,
      name: props.form.name,
    },
  })
    .then((response) => {
      const credentials = {
        email: props.form.email,
        password: props.form.password,
      };
      login(credentials, response.data, {
        access: response.data.access,
        refresh: response.data.refresh,
      });
    })
    .catch((error) => {
      // handle error
    });
};

function AuthAction(props) {
  const login = useStore((state) => state.login);
  if (props.text1 === "Log in") {
    return (
      <Action onClick={() => signin({form: props.form, login})} {...props} />
    );
  }
  if (props.text1 === "Sign up") {
    return (
      <Action onClick={() => signup({form: props.form, login})} {...props} />
    );
  }
}

export {AuthAction};
