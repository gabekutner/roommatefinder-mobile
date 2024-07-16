import React from "react";
import {View} from "react-native";

import CustomText from "../../../../components/UI/Custom/CustomText";
import CustomButtonComponent from "../../../../components/Button/CustomButtonComponent";

import {styles} from "./AuthAction.styles";


const AuthAction = props => {
  /** props
   * 
   * navigation : function : where to nav to
   * onClick : function : what to do on button click 
   * text1 : str : button text
   * text2 : str : nav to text question
   * text3 : str : nav to text 
   * 
   */
  return (
    <View>
      <CustomButtonComponent
        variant='standard'
        animated
        shadow
        // onClick={() => onSignIn()}
        onClick={props.onClick}
      >
        <CustomText fontSize='large' style={styles.text1}>
          {/* Log in */}
          {props.text1}
        </CustomText>
      </CustomButtonComponent>

      <CustomButtonComponent
        variant=''
        animated
        style={styles.button}
        onClick={props.navigation}
      >  
        <CustomText fontSize='medium' style={styles.text23}>
          {/* Don't have an account?{' '} */}
          {props.text2}
          <CustomText 
            fontSize='medium'
            style={[
              styles.text23,
              {textDecorationLine:'underline'}
            ]}
          >
            {props.text3}
          </CustomText>
        </CustomText>
      </CustomButtonComponent>
    </View>
  );
};

export {AuthAction};