import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import CustomText from './Custom/CustomText';

import useGlobal from '../../core/global';
import { dormsData, interestsData } from '../../assets/Dictionary';


export default function DetailBottomSheet({ item, setShow, colors }) {

  const requestConnect = useGlobal(state => state.requestConnect)

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
          requestConnect(item.id)
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
        <CustomText style={{ fontSize:18, color:colors.tint, fontWeight:'bold' }}>Friend Request</CustomText>
      </TouchableOpacity>


      <View style={[styles.line, { borderColor:colors.tertiary }]} />

      <View style={[styles.descriptionContainer, { marginBottom:75 } ]}>

        { item.dorm_building
          ? 
            <View style={{ flexDirection:'row', alignItems:'center', gap:20 }}>
              <View style={[styles.iconWrapper, { backgroundColor:colors.secondary }]}>
                <CustomText style={[styles.descriptionText, { color:colors.tertiary }]}>🏡</CustomText>
              </View>
              <CustomText style={[styles.descriptionText, { color:colors.tertiary }]}>{dormsData[item.dorm_building-1].dorm}</CustomText>
            </View>
          : null
        }

        { item.city
          ? 
            <View style={{ flexDirection:'row', alignItems:'center', gap:20 }}>
              <View style={[styles.iconWrapper, { backgroundColor:colors.secondary }]}>
                <CustomText style={[styles.descriptionText, { color:colors.tertiary }]}>📍</CustomText>
              </View>
              <CustomText style={[styles.descriptionText, { color:colors.tertiary }]}>
                {item.city},{' '}
                { item.state
                  ? item.state
                  : null
                }
              </CustomText>
            </View>
          : null
        } 

        { item.description 
          ? 
            <View>
              <CustomText style={{ fontSize:22,fontWeight:'500', marginBottom:4, color:colors.tint }}>
                About
              </CustomText>
              <CustomText style={[styles.descriptionText, { color:colors.tertiary }]}>{item.description}</CustomText>
            </View>
          : null
        }

        { item.instagram 
          ? 
            <View style={{ flexDirection:'row', alignItems:'center', gap:20 }}>
              <View style={[styles.iconWrapper, { backgroundColor:colors.secondary }]}>
                <CustomText style={[styles.descriptionText, { color:colors.tertiary }]}>📸</CustomText>
              </View>
              <CustomText style={[styles.descriptionText, { color:colors.tertiary }]}>{item.instagram}</CustomText>
            </View>
          : null
        }

        { item.snapchat 
          ? 
            <View style={{ flexDirection:'row', alignItems:'center', gap:20 }}>
              <View style={[styles.iconWrapper, { backgroundColor:colors.secondary }]}>
                <CustomText style={[styles.descriptionText, { color:colors.tertiary }]}>👻</CustomText>
              </View>
              <CustomText style={[styles.descriptionText, { color:colors.tertiary }]}>{item.snapchat}</CustomText>
            </View>
          : null
        }

        { item.major 
          ? 
            <View style={{ flexDirection:'row', alignItems:'center', gap:20 }}>
              <View style={[styles.iconWrapper, { backgroundColor:colors.secondary }]}>
                <CustomText style={[styles.descriptionText, { color:colors.tertiary }]}>🎓</CustomText>
              </View>
              <CustomText style={[styles.descriptionText, { color:colors.tertiary }]}>{item.major}</CustomText>
            </View>
          : null
        }

        { item.interests 
          ? 
            <View>
              <CustomText style={{ fontSize:22,fontWeight:'500', marginBottom:4, color:colors.tint }}>
                Interests
              </CustomText>
              { item.interests.map((number) => (
                <View 
                  key={number}
                  style={{
                    paddingVertical:10,
                    paddingHorizontal:20,
                    borderRadius:10,
                    borderWidth:1,
                    alignItems:'center',
                    marginBottom:10,
                    borderColor:colors.accent
                  }}
                >
                  <CustomText style={[styles.descriptionText, { color:colors.tint }]}>{interestsData[number-1].interest}</CustomText>
                </View>
                
              ))}
              
            </View>
          : null
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
  infoWrapper: {
    flexDirection: 'row',
    margin: 3,
  },
  iconWrapper: {
    padding:10,
    borderRadius:60
  },  
  icon: { fontSize:20 },
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
    fontSize:20,
  },
  line: {
    borderBottomWidth: 0.8,
    margin: 10,
  },
})