import React from "react";

import {launchImageLibrary} from "react-native-image-picker";

import {Container, Title} from "./profile.view";

import useStore from "../../../zustand/store";


const launchLibrary = props => {
  launchImageLibrary({includeBase64: true}, (response) => {
    if (response.didCancel) return;
    const file = response.assets[0];
    props.uploadThumbnail(file);
  });
};


function ProfileView({ navigation }) {
  const user = useStore(state => state.user);
  const uploadThumbnail = useStore(state => state.uploadThumbnail);
  return (
    <Container>
      <Title 
        name="Gabe Kutner" 
        thumbnail={user.thumbnail} 
        launchLibrary={() => launchLibrary({uploadThumbnail: uploadThumbnail})}
      />

    </Container>
  );
};

export {ProfileView};