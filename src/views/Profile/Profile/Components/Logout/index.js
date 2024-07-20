import React, {useState} from "react";

import {LogoutButton} from "./logout.view";

import useStore from "../../../../../zustand/store";

function Logout() {
  const logout = useStore((state) => state.logout);

  const [loading, setLoading] = useState(false);
  const onClick = () => {
    setLoading(true);
    logout();
    setLoading(false);
  };

  return <LogoutButton loading={loading} onClick={onClick} />;
}

export {Logout};
