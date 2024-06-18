import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  ScrollView
} from 'react-native';
import { 
  moderateScale, 
  verticalScale 
} from "react-native-size-matters";

import CustomTextInput from '../../components/UI/Custom/CustomInput'
import CustomLabel from "../../components/UI/Label";

import useGlobal from "../../core/global";
import { colors } from "../../constants/colors";



export default function EditProfileScreen({ navigation }) {

  const user = useGlobal(state => state.user)
  const [form, setForm] = useState({
    name:"",
    city:"",
    state:"",
    graduation_year:"",
    major:"",
    interests:[]
  })

  return (
    <SafeAreaView style={{ flex:1, justifyContent:'center', backgroundColor:colors.primary }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex:1 }}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ margin:verticalScale(20) }}>
          {/* name */}
          <CustomLabel color={colors.tint} label="Name" />
          <CustomTextInput 
            autoCapitalize={'none'}
            autoCorrect={false}
            placeholder={'Gabe'}
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
          {/* city, state */}
          <CustomLabel color={colors.tint} label="City, State" />
          <View style={{ flexDirection:'row', gap:5 }}>
            <CustomTextInput 
              autoCapitalize={'none'}
              autoCorrect={false}
              placeholder={'San Francisco'}
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
              placeholder={'CA'}
              value={form.state}
              onChangeText={state => setForm({ ...form, state })}
              colors={colors}
              containerStyle={{
                height:verticalScale(45),
                marginBottom:verticalScale(14),
                backgroundColor:colors.secondary,
                borderRadius:0,
                borderWidth:2,
                borderColor:colors.tint,
                width:'23%',
              }}
              inputStyle={{
                fontSize:verticalScale(14),
                color:colors.tint,
                marginLeft:moderateScale(-11)
              }}
            />
          </View>
          {/* graduation_year */}
          <CustomLabel color={colors.tint} label="Graduation Year" />
          <CustomTextInput 
            autoCapitalize={'none'}
            autoCorrect={false}
            placeholder={'2028'}
            value={form.graduation_year}
            onChangeText={graduation_year => setForm({ ...form, graduation_year })}
            colors={colors}
            emoji={'📆'}
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
          {/* major */}
          <CustomLabel color={colors.tint} label="Major" />
          <CustomTextInput 
            autoCapitalize={'none'}
            autoCorrect={false}
            placeholder={'Business'}
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
          {/* interests */}
          <CustomTextInput colors={colors} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView> 
  )
}