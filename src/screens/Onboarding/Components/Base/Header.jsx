import React from "react";
import {View} from "react-native";

import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {verticalScale} from "react-native-size-matters";

import Paginator from "./Paginator";
import CustomButtonComponent from "../../../../components/Button/CustomButtonComponent";

import {colors} from "../../../../constants/colors";
import {
  flex,
  spacing,
  adjustMarginTop,
  borders,
} from "../../../../styles/styles";

export default function Header({scrollNext, scrollBack, data, scrollX}) {
  return (
    <View
      style={{
        ...flex.alignItemsCenter,
        ...spacing.mh8,
        ...adjustMarginTop(50),
      }}
    >
      <View
        style={{
          backgroundColor: colors.primary,
          ...flex.flexRow,
          ...flex.alignItemsCenter,
          ...borders.bw2,
          ...borders.br3,
          ...spacing.ph1,
          ...flex.justifyContentCenter,
          ...spacing.pv3,
          ...spacing.mb1,
        }}
      >
        <Paginator data={data} scrollX={scrollX} />
      </View>
      <View
        style={{
          backgroundColor: colors.primary,
          width: "65%",
          ...flex.flexRow,
          ...flex.alignItemsCenter,
          ...borders.bw2,
          ...borders.br3,
          ...spacing.ph4,
          ...flex.justifyContentBetween,
          ...spacing.mb1,
        }}
      >
        <CustomButtonComponent
          variant=""
          animated
          onClick={scrollBack}
          style={borders.bw0}
        >
          <FontAwesomeIcon
            icon="arrow-left"
            size={verticalScale(20)}
            color={colors.tint}
          />
        </CustomButtonComponent>
        <CustomButtonComponent
          variant=""
          animated
          onClick={scrollNext}
          style={borders.bw0}
        >
          <FontAwesomeIcon
            icon="arrow-right"
            size={verticalScale(20)}
            color={colors.tint}
          />
        </CustomButtonComponent>
      </View>
    </View>
  );
}
