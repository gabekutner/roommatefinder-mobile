import React, {useState} from "react";

import {Button} from 'react-native-paper';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

import CustomText from "../../../../../components/UI/Custom/CustomText";

import useStore from "../../../../../zustand/store";
import {colors} from "../../../../../constants/colors";
import {styles} from "./logout.styles";


function Logout() {

  const logout = useStore(state => state.logout);

  const [loading, setLoading] = useState(false);
  const onClick = () => {
    setLoading(true);
    logout();
    setLoading(false);
  };

  return (
    <Button
      loading={loading}
      icon={() => (
        <FontAwesomeIcon icon="right-from-bracket" size={20} color={colors.white} />
      )}
      mode="elevated" 
      onPress={onClick}
      textColor={colors.white}
      buttonColor={colors.accent}
      contentStyle={{height: 50}}
      style={styles.button}
    >
      <CustomText fontSize="large" style={{fontWeight: '600'}}>
        Logout
      </CustomText>
    </Button>
  );
}; 

export {Logout};