import React from "react";
import {SafeAreaView, ScrollView, View} from "react-native";

import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

import Thumbnail from "../../../components/Thumbnail";
import CustomButton from "../../../components/UI/Custom/CustomButton";
import CustomText from "../../../components/UI/Custom/CustomText";

import {styles} from "./profile.styles";
import {colors} from "../../../constants/colors";

function Container(props) {
  return (
    <SafeAreaView 
      style={[
        styles.container, 
        {backgroundColor: props.theme.colors.background}
      ]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {props.children}
      </ScrollView>
    </SafeAreaView>
  );
}

function Title(props) {
  return (
    <View style={styles.titleWrapper}>
      <CustomButton
        style={{borderWidth: 0, paddingVertical: 0}}
        onClick={props.launchLibrary}
      >
        <Thumbnail
          url={props.thumbnail}
          size={123}
          borderColor={colors.tint}
          style={{borderWidth: 2}}
        />
        <View
          style={[
            styles.iconWrapper,
            {
              backgroundColor: colors.primary,
              borderColor: colors.secondary,
            },
          ]}
        >
          <FontAwesomeIcon icon="pencil" size={15} color={colors.tint} />
        </View>
      </CustomButton>
      <CustomText fontSize="large" style={styles.name}>
        {props.name}
      </CustomText>
    </View>
  );
}

export {Container, Title};
