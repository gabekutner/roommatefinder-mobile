import React, {useRef, useState} from "react";
import {View, Animated} from "react-native";

import {verticalScale} from "react-native-size-matters";

import Background from "./Base/Background";
import Header from "./Base/Header";
import Carousel from "./Base/Carousel";
import CustomText from "../../../components/UI/Custom/CustomText";

import {colors} from "../../../constants/colors";
import {flex, position, spacing, borders} from "../../../styles/styles";

export default function BaseOnboardingCard({navigation, route}) {
  const {data, next, back} = route.params;
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const dataRef = useRef(null);
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const scrollNext = () => {
    if (currentIndex < data.length - 1) {
      dataRef.current.scrollToIndex({index: currentIndex + 1});
    } else {
      navigation.navigate(next);
    }
  };

  const scrollBack = () => {
    if (currentIndex < data.length && currentIndex != 0) {
      dataRef.current.scrollToIndex({index: currentIndex - 1});
    } else {
      if (back) {
        navigation.navigate(back);
      } else {
        console.log("first item");
      }
    }
  };

  return (
    <Background>
      <Header
        scrollBack={scrollBack}
        scrollNext={scrollNext}
        data={data}
        scrollX={scrollX}
      />
      <Carousel
        navigation={navigation}
        data={data}
        scrollX={scrollX}
        viewableItemsChanged={viewableItemsChanged}
        viewConfig={viewConfig}
        dataRef={dataRef}
      />
      <View
        style={{
          ...position.pAbsolute,
          ...position.l0,
          ...position.r0,
          ...flex.alignItemsCenter,
          ...spacing.mh8,
          ...spacing.pv4,
          ...spacing.ph2,
          ...borders.br3,
          ...borders.bw2,
          /**rewrite as function */
          bottom: verticalScale(35),
          backgroundColor: colors.primary,
        }}
      >
        <CustomText
          fontSize="medium"
          style={{
            fontWeight: "500",
            textAlign: "center",
            color: colors.tertiary,
          }}
        >
          No information about your account is shared with the University of
          Utah.
        </CustomText>
      </View>
    </Background>
  );
}
