import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
} from 'react-native';

import { verticalScale } from "react-native-size-matters";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import Base from "../Base";
import CustomButton from "../../../components/UI/Custom/CustomButton";
import CustomText from "../../../components/UI/Custom/CustomText";
import CustomNextButton from "../CustomNextButton";
import LinkTreeModal from "./LinkTreeModal";

import useGlobal from "../../../core/global";
import { colors as c } from "../../../assets/config";


export default function LinkTreeScreen({ navigation }) {

  const form = useGlobal(state => state.form)
  const setForm = useGlobal(state => state.setForm)
  const theme = useGlobal(state => state.theme)
  const colors = c[theme]

  const [show, setShow] = useState(false)
  const label = "Add your social handles!"
  const buttonLabel = "That's good"
  const modalLabel = "Add a social handle!"
  const modalButtonLabel = "Good to go"

  // get users links add populate them here
  // temporary
  const userLinks = [
    {
      id: "1",
      link: "http://test.com/",
    },
    {
      id: "2",
      link: "http://test.com/"
    }
  ]

  return (
    <Base navigation={navigation} next={'widgets'} label={label} buttonLabel={buttonLabel} >
      <View 
        style={{ 
          alignItems:'center',
          flexDirection:'column',
          gap:10,
        }}
      >
        <CustomButton 
          onClick={() => setShow(true)}
          style={{ 
            ...styles.addLink, 
            borderColor:colors.constWhite
          }}
        >
          <CustomText style={[styles.linkedText, { color:colors.constWhite }]}>+ Add a link</CustomText>
        </CustomButton>
        <FlatList 
          showsVerticalScrollIndicator={false}
          data={userLinks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View 
              style={{
                ...styles.linked, 
                borderColor: colors.constBlack,
                backgroundColor: colors.accentDark,
                flexDirection:'row',
                gap:15
              }}
            >
              <FontAwesomeIcon 
                icon="link"
                size={22}
                color={colors.constWhite}
              />
              <CustomText style={[styles.linkedText, { color:colors.constWhite }]}>{item.link}</CustomText>
            </View>
          )}
        />
      </View>
      { show
        ?
          <LinkTreeModal 
            colors={colors}
            label={modalLabel}
            navigation={navigation}
          />
        : null
      }
      <CustomNextButton 
        colors={colors}
        onClick={() => navigation.navigate('widgets')}
        text={'All Done'}
      />
    </Base>

  )
}

const styles = StyleSheet.create({
  linked: {
    padding:verticalScale(15),
    borderWidth:1,
    borderRadius:0,
    marginBottom:verticalScale(10),
    shadowColor: '#222',
    shadowOffset: { width: 7, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 1,  
  },
  linkedText: {
    fontSize:verticalScale(12),
    fontWeight:'500',
  },
  addLink: {
    padding:verticalScale(15),
    marginBottom:verticalScale(10)
  }
})