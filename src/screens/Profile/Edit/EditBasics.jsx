import React, { useState } from "react";
import {
  SafeAreaView,
  View
} from 'react-native';

import {
  verticalScale,
  moderateScale
} from 'react-native-size-matters';

import CustomLabel from "../../../components/UI/Label";
import CustomTextInput from "../../../components/UI/Custom/CustomInput";

import { colors } from "../../../constants/colors";
import CustomButton from "../../../components/UI/Custom/CustomButton";
import CustomText from "../../../components/UI/Custom/CustomText";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";


export default function EditBasicsScreen({ navigation }) {

  const [form, setForm] = useState({
    name: '',
    city: '',
    state: '',
    major: '',
    graduation_year: '',
    description: '',
    dorm_building: '',
    interests: [],
  })

  return (
    <SafeAreaView style={{ flex:1, backgroundColor:colors.primary }}>
      <View style={{ marginHorizontal:moderateScale(25), marginTop:verticalScale(15) }}> 
        <CustomLabel color={colors.tint} label="Name" />
        <CustomTextInput 
          autoCapitalize={'none'}
          autoCorrect={false}
          placeholder={'Ex. Gabe'}
          value={form.name}
          onChangeText={name => setForm({ ...form, name })}
          colors={colors}
          emoji={'👤'}
          containerStyle={{
            height:verticalScale(45),
            marginBottom:verticalScale(14),
            backgroundColor:colors.secondary,
            borderRadius:0,
            borderWidth:2,
            borderColor:colors.tint,
          }}
          inputStyle={{
            fontSize:verticalScale(14),
            color:colors.tint,
          }}
        />

        <CustomLabel color={colors.tint} label="Major" />
        <CustomTextInput 
          autoCapitalize={'none'}
          autoCorrect={false}
          placeholder={'Ex. Business'}
          value={form.major}
          onChangeText={major => setForm({ ...form, major })}
          colors={colors}
          emoji={'🎓'}
          containerStyle={{
            height:verticalScale(45),
            marginBottom:verticalScale(14),
            backgroundColor:colors.secondary,
            borderRadius:0,
            borderWidth:2,
            borderColor:colors.tint,
          }}
          inputStyle={{
            fontSize:verticalScale(14),
            color:colors.tint,
          }}
        />

        <CustomLabel color={colors.tint} label="Grad Year" />
        <CustomTextInput 
          autoCapitalize={'none'}
          autoCorrect={false}
          placeholder={'Ex. 2028'}
          value={form.graduation_year}
          onChangeText={graduation_year => setForm({ ...form, graduation_year })}
          colors={colors}
          emoji={'🏫'}
          containerStyle={{
            height:verticalScale(45),
            marginBottom:verticalScale(14),
            backgroundColor:colors.secondary,
            borderRadius:0,
            borderWidth:2,
            borderColor:colors.tint,
          }}
          inputStyle={{
            fontSize:verticalScale(14),
            color:colors.tint,
          }}
        />

        <CustomLabel color={colors.tint} label="City, State" />
        <View style={{ flexDirection:'row', gap:moderateScale(5) }}>
          <CustomTextInput 
            autoCapitalize={'none'}
            autoCorrect={false}
            placeholder={'Ex. San Francisco'}
            value={form.city}
            onChangeText={city => setForm({ ...form, city })}
            colors={colors}
            emoji={'📍'}
            containerStyle={{
              height:verticalScale(45),
              marginBottom:verticalScale(14),
              backgroundColor:colors.secondary,
              borderRadius:0,
              borderWidth:2,
              borderColor:colors.tint,
              width:'75%'
            }}
            inputStyle={{
              fontSize:verticalScale(14),
              color:colors.tint,
            }}
          />
          <CustomTextInput 
            autoCapitalize={'none'}
            autoCorrect={false}
            placeholder={'Ex. CA'}
            value={form.state}
            onChangeText={state => setForm({ ...form, state })}
            colors={colors}
            emoji={''}
            containerStyle={{
              height:verticalScale(45),
              marginBottom:verticalScale(14),
              backgroundColor:colors.secondary,
              borderRadius:0,
              borderWidth:2,
              borderColor:colors.tint,
              width:'25%'
            }}
            inputStyle={{
              fontSize:verticalScale(14),
              color:colors.tint,
              marginLeft:moderateScale(-20)
            }}
          />
        </View>

        <CustomButton
          onClick={() => console.log('press')}
          style={{
            flexDirection:'row',
            justifyContent:'space-between',
            borderWidth:2,
            borderColor:colors.tint,
            backgroundColor:colors.accent,
            borderRadius:0,
            shadowColor: '#222',
            shadowOffset: { width: 7, height: 5 },
            shadowOpacity: 1,
            shadowRadius: 1, 
            paddingHorizontal:moderateScale(15)
          }}
        >
          <CustomText style={{ fontSize:verticalScale(13), fontWeight:'500', color:colors.white }}>
            Change Dorm
          </CustomText>
          <FontAwesomeIcon 
            icon='arrow-right'
            size={verticalScale(22)}
            color={colors.white}
          />
        </CustomButton>

        <CustomButton
          onClick={() => console.log('press')}
          style={{
            flexDirection:'row',
            justifyContent:'space-between',
            borderWidth:2,
            borderColor:colors.tint,
            backgroundColor:colors.accent,
            borderRadius:0,
            shadowColor: '#222',
            shadowOffset: { width: 7, height: 5 },
            shadowOpacity: 1,
            shadowRadius: 1, 
            paddingHorizontal:moderateScale(15),
            marginTop:verticalScale(10)
          }}
        >
          <CustomText style={{ fontSize:verticalScale(13), fontWeight:'500', color:colors.white }}>
            Change Interests
          </CustomText>
          <FontAwesomeIcon 
            icon='arrow-right'
            size={verticalScale(22)}
            color={colors.white}
          />
        </CustomButton>

      </View>
    </SafeAreaView>
  )
}