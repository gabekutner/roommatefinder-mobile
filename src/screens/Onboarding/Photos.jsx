import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';

import { 
  verticalScale,
  moderateScale
} from "react-native-size-matters";
import { launchImageLibrary } from "react-native-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import FastImage from "react-native-fast-image";

import Base from "./Base";
import CustomButton from "../../components/UI/Custom/CustomButton";
import CustomText from "../../components/UI/Custom/CustomText";
import CustomNextButton from './CustomNextButton';
import useGlobal from "../../core/global";
import { colors as c } from "../../assets/config";



function PhotoNumber({ number, colors }) {
  return (
    <View
      style={{
        position:'absolute',
        top:-10,
        left:-10,
        padding:verticalScale(6),
        backgroundColor:colors.accentDark,
        borderRadius:0,
        borderWidth:2,
        shadowOffset: { width: 7, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 1,  
      }}
    >
      <FontAwesomeIcon 
        icon={number}
        size={verticalScale(15)}
        color={colors.constWhite}
      />
    </View>
  )
}

export default function PhotosScreen({ navigation }) {

  const form = useGlobal(state => state.form)
  const setForm = useGlobal(state => state.setForm)
  const theme = useGlobal(state => state.theme)
  const colors = c[theme]

  const label = "Upload some photos!"
  const buttonLabel = "Next Step"

  const launchLibrary = ({ key }) => {
    launchImageLibrary({ includeBase64:true, }, (response) => {
      if (response.didCancel) return
      const file = response.assets[0]
      console.log(key)
    })
  }
  
  return (
    <Base navigation={navigation} next={'dorm'} label={label} buttonLabel={buttonLabel} >
      <View 
        style={{ 
          alignItems:'center',
          flexDirection:'column',
          gap:10,
        }}
      >
        <View 
          style={{
            flexDirection:'row',
            gap:10
          }}
        >
          <View style={styles.wrapper}>
            <TouchableOpacity 
              style={{ ...styles.upload, borderColor:colors.constWhite }}
              onPress={() => launchImageLibrary('1')}
            >
              <FontAwesomeIcon 
                icon="image"
                size={22}
                color={colors.constWhite}
              /> 
            </TouchableOpacity>
            <PhotoNumber number="1" colors={colors} />
          </View>
          <View style={styles.wrapper}>
            <TouchableOpacity 
              style={{ ...styles.upload, borderColor:colors.constWhite }}
              onPress={() => launchImageLibrary('2')}
            >
              <FontAwesomeIcon 
                icon="image"
                size={22}
                color={colors.constWhite}
              /> 
            </TouchableOpacity>
            <PhotoNumber number="2" colors={colors} />
          </View>
        </View>
        <View 
          style={{
            flexDirection:'row',
            gap:10
          }}
        >
          <View style={styles.wrapper}>
            <TouchableOpacity 
              style={{ ...styles.upload, borderColor:colors.constWhite }}
              onPress={() => launchImageLibrary('3')}
            >
              <FontAwesomeIcon 
                icon="image"
                size={22}
                color={colors.constWhite}
              /> 
            </TouchableOpacity>
            <PhotoNumber number="3" colors={colors} />
          </View>
          <View style={styles.wrapper}>
            <TouchableOpacity 
              style={{ ...styles.upload, borderColor:colors.constWhite }}
              onPress={() => launchImageLibrary('4')}
            >
              <FontAwesomeIcon 
                icon="image"
                size={22}
                color={colors.constWhite}
              /> 
            </TouchableOpacity>
            <PhotoNumber number="4" colors={colors} />
          </View>
        </View>
      </View>
      <CustomNextButton 
        colors={colors}
        onClick={() => navigation.navigate('done')}
        text={'Next Step'}
      />
    </Base>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
    gap:15,
    padding:10,
  },  
  upload: {
    borderWidth:2,
    borderStyle:'dashed',
    borderRadius:10,
    height:verticalScale(110),
    width:moderateScale(130),
    justifyContent:'center',
    alignItems:'center'
  },
  imageStyle: {
    height:'100%', 
    width:'100%', 
    borderRadius:10
  }
})