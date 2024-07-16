import React, {useState, useEffect} from "react";
import {View} from "react-native";

import {launchImageLibrary} from "react-native-image-picker";

import {Container, Title} from "./profile.view";
import {Row} from "./Components/Row";

import useStore from "../../../zustand/store";
import {styles} from "./profile.styles";


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
  const getSwipeProfile = useStore(state => state.getSwipeProfile)

  const [item, setItem] = useState()
  useEffect(() => {
    const fetchProfile = async () => {
      const resp = await getSwipeProfile(user, user.id);
      setItem(resp.data);
    };
    fetchProfile();
  }, []);


  return (
    <Container>

      <Title 
        name="Gabe Kutner" 
        thumbnail={user.thumbnail} 
        launchLibrary={() => launchLibrary({uploadThumbnail: uploadThumbnail})}
      />

      <View style={styles.section}>
        <Row 
          pos="first"
          onClick={() => navigation.navigate('profile-detail', { item:item })}
          text="Preview Profile"
          emoji="🥳"
        /> 
        <Row 
          pos="middle"
          onClick={() => navigation.navigate('edit-basics')}
          text="Edit Profile"
          emoji="🍿"
        />
        <Row 
          pos="last"
          onClick={() => navigation.navigate('matching')}
          text="Roommate Matching Quiz"
          emoji="🤖"
        />
      </View>

      <View style={styles.section}>
        <Row 
          pos="first"
          onClick={() => console.log('pause profile')}
          text="Pause Profile"
          emoji="🥳"
        /> 
        <Row 
          pos="middle"
          onClick={() => console.log('how to find a roommate')}
          text="How to find a roommate"
          emoji="🍿"
        />
        <Row 
          pos="last"
          onClick={() => navigation.navigate('matching')}
          text="Roommate Matching Quiz"
          emoji="🤖"
        />
      </View>

    </Container>
  );
};

export {ProfileView};