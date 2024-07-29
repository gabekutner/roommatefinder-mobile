import React, {useState, useEffect} from "react";

import {Row} from "./friendRow.view";

import useStore from "../../../../zustand/store";
import useBearStore from "../../../../libs/store";

function FriendRow(props) {

  // used for getting swipe profile for preview 
  // const user = useBearStore((state) => state.user);
  // const getSwipeProfile = useStore((state) => state.getSwipeProfile);
  // const [profile, setProfile] = useState();

  // useEffect(() => {
  //   async function fetchData() {
  //     const profile = await getSwipeProfile(user, props.item.friend.id);
  //     const userData = await profile.data;
  //     setProfile(userData);
  //   }
  //   fetchData();
  // }, [getSwipeProfile, user, props.item]);

  return (
    <Row
      navigation={props.navigation}
      // profile={profile}
      item={props.item}
      theme={props.theme}
    />
  );
}

export {FriendRow};
