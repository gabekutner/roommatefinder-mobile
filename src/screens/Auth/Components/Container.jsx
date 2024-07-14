import React from "react";
import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView,
  ImageBackground
} from 'react-native';

import CustomText from "../../../components/UI/Custom/CustomText";
import Title from "../../../components/Brand/Title";

import { colors } from "../../../constants/colors";
import { flex, shadow, spacing, borders } from "../../../styles/styles";


export default function Container({ 
  title, 
  children 
}) {
  return (
    <ImageBackground 
      source={require('../../../assets/images/image_part_001.png')} 
      style={[
        flex.flex1, 
        { backgroundColor:'rgba(0,0,0,.45)' }
      ]}
      imageStyle={{ opacity:0.6 }}
    >
      <KeyboardAvoidingView behavior="padding" style={flex.flex1}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View 
            style={[
              flex.flex1,
              flex.justifyContentCenter,
              flex.alignSelfCenter,
              { width:'95%' }
            ]}
          >
            <View 
              style={[
                spacing.pv2,
                spacing.ph6,
                borders.br3,
                borders.bw2,
                shadow.shadow,
                { backgroundColor:colors.primary }
              ]}
            >
              <View style={spacing.mv5}>
                <Title 
                  title='roommatefinder'
                  color={colors.tint}
                  style={{ textAlign:'center' }}
                />
                <CustomText 
                  fontSize="medium" 
                  style={[
                    spacing.mv1,
                    { 
                      color: colors.tint,
                      fontWeight:'600', 
                      textAlign:'center',
                    }
                  ]}
                >
                  {/* Welcome back! */}
                  {/* Sign up to find your future roommate! */}
                  {title}
                </CustomText>
              </View>
              {children}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}