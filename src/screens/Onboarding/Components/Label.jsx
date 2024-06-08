import React from "react";

import {
  verticalScale
} from 'react-native-size-matters';

import CustomText from "../../../components/UI/Custom/CustomText";

import { colors } from '../../../constants/colors';


export default function Label({ text, style }) {
  return (
    <CustomText
      style={{
        color:colors.tint,
        fontSize:verticalScale(18),
        fontWeight:'bold',
        ...style
      }}
    >
      {text}
    </CustomText>
  )
}