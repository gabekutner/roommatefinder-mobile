import React from 'react';

import { verticalScale } from 'react-native-size-matters';

import CustomButton from '../../components/UI/Custom/CustomButton';
import CustomText from '../../components/UI/Custom/CustomText';


export default function CustomNextButton({
  colors,
  onClick,
  text
}) {
  return (
    <CustomButton
      onClick={onClick}
      style={{
        marginVertical:100,
        width:200,
        borderWidth:2,
        borderColor:colors.constBlack,
        borderRadius:0,
        backgroundColor:colors.accentDark,
        shadowColor: '#222',
        shadowOffset: { width: 7, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 1,  
        alignSelf:'center'
      }}
    >
      <CustomText
        style={{
          fontSize:verticalScale(15),
          fontWeight:'600',
          color:colors.constWhite,
        }}
      >
        {text}
      </CustomText>
    </CustomButton>
  )
}