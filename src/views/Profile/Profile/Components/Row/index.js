import React from "react";
import {View} from "react-native";

import CustomText from "../../../../../components/UI/Custom/CustomText";
import CustomButton from "../../../../../components/UI/Custom/CustomButton";

import {styles} from "./row.styles";


function Row(props) {
  return (
    <CustomButton 
      onClick={props.onClick} 
      style={{
        ...styles.rowWrapper,
        ...(
          props.pos === 'first' ? styles.rowFirst 
          : props.pos === 'last' ? styles.rowLast
          : props.pos === 'middle' ? styles.rowMiddle
          : {borderRadius: 12}
        )
      }}
    >
      <View style={styles.row}>
        <CustomText fontSize="medium" style={styles.rowLabel}>
          {props.text}
        </CustomText>
        <View style={styles.spacer} />
        {props.children}
      </View>
    </CustomButton>
  );
};

export {Row};