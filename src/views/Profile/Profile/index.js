import React, {useState, useEffect} from "react";
import {Alert, View, Switch} from "react-native";

import {launchImageLibrary} from "react-native-image-picker";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

import CustomText from "../../../components/UI/Custom/CustomText";
import {Container, Title} from "./profile.view";
import {Row} from "./Components/Row";
import {Logout} from "./Components/Logout";

import useStore from "../../../zustand/store";
import {styles} from "./profile.styles";
import {colors} from "../../../constants/colors";


const launchLibrary = (props) => {
  launchImageLibrary({includeBase64: true}, (response) => {
    if (response.didCancel) return;
    const file = response.assets[0];
    props.uploadThumbnail(file);
  });
};

const DeleteProfile = (props) => {
  return Alert.alert(
    "Delete Account",
    "Are you sure you want to delete your account? You'll have to create an account again to come back 😒",
    [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Yep, I'm sure",
        onPress: () => props.onPress(),
        style: "destructive",
      },
    ]
  );
};

function ProfileView({navigation}) {
  const user = useStore((state) => state.user);
  const uploadThumbnail = useStore((state) => state.uploadThumbnail);
  const getSwipeProfile = useStore((state) => state.getSwipeProfile);
  const pauseProfile = useStore((state) => state.pauseProfile);
  const deleteProfile = useStore((state) => state.deleteProfile);
  const logout = useStore((state) => state.logout);

  const [item, setItem] = useState();
  useEffect(() => {
    const fetchProfile = async () => {
      const resp = await getSwipeProfile(user, user.id);
      setItem(resp.data);
    };
    fetchProfile();
  }, []);

  const [isEnabled, setIsEnabled] = useState(user.pause_profile);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    pauseProfile(user);
  };

  const deleteProfileFunction = () => {
    deleteProfile(user);
    logout();
  };

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
          onClick={() => navigation.navigate("profile-detail", {item: item})}
          text="Preview Profile"
        >
          <CustomText fontSize="large">🥳</CustomText>
        </Row>
        <Row
          pos="middle"
          onClick={() => navigation.navigate("edit-basics")}
          text="Edit Profile"
        >
          <CustomText fontSize="large">🍿</CustomText>
        </Row>
        <Row
          pos="last"
          onClick={() => navigation.navigate("matching")}
          text="Roommate Matching Quiz"
        >
          <CustomText fontSize="large">🤖</CustomText>
        </Row>
      </View>

      <View style={styles.section}>
        <Row
          pos="first"
          onClick={() => console.log("pause profile")}
          text="Pause Profile"
        >
          <Switch
            trackColor={{true: colors.accent}}
            thumbColor={colors.white}
            ios_backgroundColor={colors.tertiary}
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{
              transform: [{scaleX: 0.9}, {scaleY: 0.9}],
            }}
          />
        </Row>
        <Row
          pos="middle"
          onClick={() => console.log("how to find a roommate")}
          text="How to find a roommate"
        >
          <FontAwesomeIcon
            icon="question-circle"
            size={20}
            color={colors.tertiary}
          />
        </Row>
        <Row
          pos="last"
          onClick={() => console.log("terms")}
          text="Terms and Privacy"
        >
          <CustomText fontSize="large">🕵️‍♀️</CustomText>
        </Row>
      </View>

      <View style={styles.section}>
        <Row
          onClick={() => DeleteProfile({onPress: deleteProfileFunction})}
          text="Delete Account?"
        >
          <CustomText fontSize="medium">🚨</CustomText>
        </Row>
      </View>

      <View style={styles.section}>
        <Logout />
      </View>

      <View style={{marginVertical: 50}} />
    </Container>
  );
}

export {ProfileView};
