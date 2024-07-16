import React, {useState} from "react";
import {Button} from 'react-native-paper';

import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

import {colors} from "../../../../../constants/colors";
import CustomText from "../../../../../components/UI/Custom/CustomText";


function Logout(props) {

  const [loading, setLoading] = useState(false);
  const onClick = () => {
    setLoading(true);
    props.onClick();
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
      style={{borderRadius: 12}}
    >
      <CustomText fontSize="large" style={{fontWeight: '600'}}>
        Logout
      </CustomText>
    </Button>
  );
}; 

export {Logout};