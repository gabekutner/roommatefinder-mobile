import React from "react";
import {Modal, View, StyleSheet} from "react-native";

import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {verticalScale, moderateScale} from "react-native-size-matters";

import CustomButton from "../UI/Custom/CustomButton";

import {colors} from "../../constants/colors";

export default function BasicModal({isVisible, setIsVisible, children}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <CustomButton
            onClick={() => setIsVisible(false)}
            style={{
              position: "absolute",
              right: moderateScale(10),
              top: verticalScale(10),
              borderWidth: 0,
              paddingVertical: 0,
            }}
          >
            <FontAwesomeIcon
              icon="xmark"
              size={verticalScale(22)}
              color={colors.tertiary}
            />
          </CustomButton>
          <View style={{marginTop: verticalScale(20)}}>{children}</View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(22),
  },
  modalView: {
    paddingTop: verticalScale(20),
    height: "85%",
    margin: verticalScale(20),
    backgroundColor: colors.primary,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
