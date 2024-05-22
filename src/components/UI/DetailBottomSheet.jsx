import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import CustomText from './Custom/CustomText';


export default function DetailBottomSheet({ item, setShow, colors }) {

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor:colors.primary }]}
      contentContainerStyle={styles.scrollview}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.container1}>
        <View style={styles.nameTextContainer}>
          <CustomText style={[styles.nameText, { color:colors.tint }]}>{`${item.name}, ${item.age}`}</CustomText>
        </View>
        
        <TouchableOpacity onPress={() => setShow(false)} style={[styles.closeContainer, { backgroundColor:colors.secondary }]}>
          <FontAwesomeIcon 
            icon="arrow-down"
            size={22}
            color={colors.accent}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        onPress={() => {
          // send friend req

          // show snackbar
        }}
        style={{ 
          backgroundColor:colors.secondary,
          padding:10,
          alignItems:'center',
          justifyContent:'center',
          flex:1,
          borderRadius:10,
          borderWidth:1,
          borderColor:colors.accent,
        }}
      >
        {/* depends on status, maybe send through prop -- just like the search bar  */}
        <CustomText style={{ fontSize:18, color:colors.accent, fontWeight:'bold' }}>Friend Request 👋</CustomText>
      </TouchableOpacity>


      <View style={[styles.line, { borderColor:colors.tertiary }]} />

      <View style={styles.descriptionContainer}>

        { item.description 
          ? 
            <View>
              <CustomText style={{ fontSize:18,fontWeight:'500', marginBottom:4, color:colors.tint }}>
                About
              </CustomText>
              <CustomText style={[styles.descriptionText, { color:colors.tertiary }]}>{item.description}</CustomText>
            </View>
          : <></> 
        }

        { item.instagram 
          ? 
            <View style={{ flexDirection:'row', alignItems:'center', gap:20 }}>
              <FontAwesomeIcon 
                icon="camera"
                size={22}
                color={colors.tint}
              />
              <CustomText style={[styles.descriptionText, { color:colors.tertiary }]}>@{item.instagram}</CustomText>
            </View>
          : <></> 
        }

        { item.snapchat 
          ? 
            <View style={{ flexDirection:'row', alignItems:'center', gap:20 }}>
              <FontAwesomeIcon 
                icon="ghost"
                size={22}
                color={colors.tint}
              />
              <CustomText style={[styles.descriptionText, { color:colors.tertiary }]}>@{item.snapchat}</CustomText>
            </View>
          : <></> 
        }
        
      </View>

    </ScrollView>
  )
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    overflow: 'hidden',
    padding: 20,
    borderRadius: 10,
    minHeight: '30%',
    maxHeight: '40%',
  },
  scrollview: {},
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  nameTextContainer: {
    flexDirection: 'column',
  },
  closeContainer: {
    borderRadius: 100,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 25,
    fontWeight: '500',
  },
  toogetherGroupText: {
    fontSize: 15,
  },
  infoWrapper: {
    flexDirection: 'row',
    margin: 3,
  },
  icon: { fontSize: 20 },
  text: {
    fontSize: 15,
    marginLeft: 10,
  },
  descriptionContainer: {
    margin: 3,
    flexDirection:'column',
    gap:20,

  },
  descriptionText: {
    fontSize: 15,
  },
  line: {
    borderBottomWidth: 0.8,
    margin: 10,
  },
  reportContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 50,
  },
  blockButton: {
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  blockButtonText: {
    fontSize: 15,
  },
})