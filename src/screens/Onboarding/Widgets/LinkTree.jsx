import React, {useState} from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";

import {verticalScale, moderateScale} from "react-native-size-matters";

import CustomButton from "../../../components/UI/Custom/CustomButton";
import CustomText from "../../../components/UI/Custom/CustomText";
import CustomTextInput from "../../../components/UI/Custom/CustomInput";
import WidgetsModal from "../../../components/Modals/WidgetsModal";

import useStore from "../../../zustand/store";
import {colors} from "../../../constants/colors";

export default function LinkTreeScreen({navigation, route}) {
  const {preview} = route.params;

  const form = useStore((state) => state.form);
  const setForm = useStore((state) => state.setForm);

  const [showLinks, setShowLinks] = useState(false);
  const [link, setLink] = useState({
    title: "",
    link: "",
  });

  const handleForm = () => {
    if (link.title && link.link) {
      const arr = [...form.links];
      arr.push({title: link.title, link: link.link});
      setForm({...form, links: arr});
      setLink({...link, title: "", link: ""});
    } else {
      return;
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/image_part_003.png")}
      style={{flex: 1, backgroundColor: colors.primary}}
      imageStyle={{opacity: 0.5}}
    >
      <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <View style={styles.wrapper}>
              <View
                style={{
                  marginBottom: verticalScale(20),
                  alignItems: "center",
                }}
              >
                <CustomText fontSize="xx-large" style={styles.title}>
                  Add your social media!
                </CustomText>

                <CustomTextInput
                  autoCapitalize={"none"}
                  autoCorrect={false}
                  placeholder={"My Instagram"}
                  value={link.title}
                  onChangeText={(value) => setLink({...link, title: value})}
                  icon="photo-film"
                  iconColor={colors.tertiary}
                  colors={colors}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.text}
                />

                <CustomTextInput
                  autoCapitalize={"none"}
                  autoCorrect={false}
                  placeholder={"instagram.com/gabekutner"}
                  value={link.link}
                  onChangeText={(value) => setLink({...link, link: value})}
                  icon="file"
                  iconColor={colors.tertiary}
                  colors={colors}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.text}
                />

                <CustomButton
                  shadow
                  onClick={() => {
                    handleForm();
                    navigation.goBack();
                  }}
                  style={styles.buttonStyle}
                >
                  <CustomText fontSize="large" style={styles.buttonText}>
                    Submit
                  </CustomText>
                </CustomButton>

                {preview ? (
                  <CustomButton
                    onClick={() => setShowLinks(true)}
                    style={styles.pressableStyle}
                  >
                    {showLinks ? (
                      <WidgetsModal
                        isVisible={showLinks}
                        setIsVisible={setShowLinks}
                        text={"links"}
                      />
                    ) : null}
                    <CustomText fontSize="medium" style={styles.pressableText}>
                      Preview Links
                    </CustomText>
                  </CustomButton>
                ) : null}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "95%",
    alignSelf: "center",
  },
  wrapper: {
    backgroundColor: colors.primary,
    paddingVertical: verticalScale(10),
    paddingHorizontal: moderateScale(25),
    borderRadius: 12,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: {width: 1.5, height: 2},
    shadowOpacity: 0.7,
    shadowRadius: 0.6,
  },
  title: {
    // fontSize:verticalScale(20),
    fontWeight: "600",
    marginVertical: verticalScale(15),
  },
  inputContainer: {
    height: verticalScale(45),
    marginBottom: verticalScale(14),
    backgroundColor: colors.secondary,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.tint,
    marginHorizontal: moderateScale(20),
    shadowColor: "#000",
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 1.5,
      height: 2,
    },
    shadowRadius: 0.6,
  },
  text: {color: colors.tint},
  buttonStyle: {
    borderWidth: 2,
    borderColor: colors.tint,
    backgroundColor: colors.accent,
    width: "90%",
  },
  buttonText: {
    fontWeight: "600",
    color: colors.white,
  },
  pressableStyle: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    borderWidth: 0,
  },
  pressableText: {
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 0.15,
    color: colors.tint,
    textDecorationLine: "underline",
  },
});
