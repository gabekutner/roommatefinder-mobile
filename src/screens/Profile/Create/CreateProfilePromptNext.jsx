import React from "react";
import {
  View,
  Text
} from 'react-native';

import { verticalScale, moderateScale } from "react-native-size-matters";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";


import CustomButton from '../../../components/UI/Custom/CustomButton';
import CustomText from "../../../components/UI/Custom/CustomText";

import useGlobal from '../../../core/global';
import { colors as c } from '../../../assets/config';


export default function CreateProfilePromptNext({ 
  navigation
 }) {

  const theme = useGlobal(state => state.theme)
  const colors = c[theme]

  return (
    <View style={{
      flex:1,
      backgroundColor:colors.accentDark,
    }}>
      <View
        style={{
          flex:1,
          justifyContent:'center',
          alignItems:'center'
        }}
      >
        <CustomText
          style={{
            fontFamily:'Acme-Regular',
            fontWeight:'600',
            fontSize:30,
            color:colors.wasatchSun,
            width:300,
            textAlign:'center'
          }}
        >
          Time to customize yourself a little more. 
        </CustomText>
        {/* <CustomText
          style={{
            fontSize:18,
            fontWeight:'600',
            color:colors.constWhite,
            marginTop:15
          }}
        >
          This'll take only a couple minutes.
        </CustomText> */}
        
        <CustomButton
          onClick={() => navigation.navigate('create-profile')}
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
          }}
        >
          <View 
            style={{ 
              flexDirection:'row', 
              alignItems:'center',
              paddingHorizontal:moderateScale(26),
            }}>
            <Text
              style={{
                fontSize:20,
                fontWeight:'600',
                color:colors.constWhite,
                fontFamily:'Acme-Regular'
              }}
            >
              That way
            </Text>

            <FontAwesomeIcon 
              icon='arrow-right-to-bracket'
              size={22}
              color={colors.constWhite}
              style={{
                marginLeft:moderateScale(11), 
                padding:verticalScale(6), 
                borderRadius:25 
              }}
            />
          </View>
        </CustomButton>
      </View>
    </View>
  )
}