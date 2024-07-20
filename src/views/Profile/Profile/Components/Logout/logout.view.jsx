import React from "react";

import {Button} from "react-native-paper";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

import CustomText from "../../../../../components/UI/Custom/CustomText";
import {colors} from "../../../../../constants/colors";
import {styles} from "./logout.styles";

function LogoutButton(props) {
  return (
    <Button
      loading={props.loading}
      icon={() => (
        <FontAwesomeIcon
          icon="right-from-bracket"
          size={20}
          color={colors.white}
        />
      )}
      mode="elevated"
      onPress={props.onClick}
      textColor={colors.white}
      buttonColor={colors.accent}
      contentStyle={{height: 50}}
      style={styles.button}
    >
      <CustomText fontSize="large" style={{fontWeight: "600"}}>
        Logout
      </CustomText>
    </Button>
  );
}

export {LogoutButton};
