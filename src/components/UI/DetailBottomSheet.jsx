import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import FastImage from 'react-native-fast-image';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import CustomButton from './Custom/CustomButton';
import CustomText from './Custom/CustomText';

import useGlobal from '../../core/global';
import { dormsData, interestsData } from '../../assets/Dictionary';

const { width } = Dimensions.get('window');


export default function DetailBottomSheet({ 
  item, 
  setShow, 
  colors,
  message,
}) {
  
  const requestConnect = useGlobal(state => state.requestConnect)

  return (
    <ScrollView
      style={{ 
        backgroundColor:colors.primary,
        flex:1,
        overflow:'hidden',
        padding:20,
        borderTopWidth:2,
        minHeight:'30%',
        maxHeight:'40%',
      }}
      contentContainerStyle={styles.scrollview}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View 
        style={{
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems:'center',
          marginBottom:10,
        }}
      >
        <View style={{ flexDirection:'column' }}>
          <CustomText 
            style={{ 
              color:colors.tint,
              fontSize:25,
              fontWeight:'500',
            }}
          >
            {`${item.name}, ${item.age}`}
          </CustomText>
        </View>
        
        <TouchableOpacity 
          onPress={() => setShow(false)} 
          style={{ 
            backgroundColor:colors.secondary,
            borderRadius:100,
            height:40,
            width:40,
            justifyContent:'center',
            alignItems:'center',
          }}>
          <FontAwesomeIcon 
            icon="arrow-down"
            size={22}
            color={colors.accent}
          />
        </TouchableOpacity>
      </View>
      
      <CustomButton
        onClick={
          () => {
            if (message === "Friend Request") {
              requestConnect(item.id)
            } else if (message === "Message") {
              return
            } else if (message === "Pending") {
              return
            }
          }
        }
        style={{
          borderColor:colors.accent,
          backgroundColor:colors.secondary
        }}
      >
        <CustomText 
          style={{ 
            fontSize:18, 
            color:colors.tint, 
            fontWeight:'bold' 
          }}
        >
          {message}
        </CustomText>
      </CustomButton>

      <View style={[styles.line, { borderColor:colors.tertiary }]} />

      <View 
        style={{ 
          marginBottom:75,
          margin: 3,
          flexDirection:'column',
          gap:20,
        }}
      >

        { item.dorm_building
          ? 
            <View style={styles.textContainer}>
              <View 
                style={[
                  styles.iconWrapper, 
                  { 
                    backgroundColor:colors.secondary 
                  }
                ]}
              >
                <CustomText 
                  style={[
                    styles.descriptionText, 
                    { 
                      color:colors.tertiary 
                    }
                  ]}
                >
                  🏡
                </CustomText>
              </View>
              <CustomText 
                style={[
                  styles.descriptionText, 
                  { 
                    color:colors.tertiary 
                  }
                ]}
              >
                {dormsData[item.dorm_building-1].dorm}
              </CustomText>
            </View>
          : null
        }

        { item.city
          ? 
            <View style={styles.textContainer}>
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
              <CustomText 
                style={{ 
                  fontSize:22,
                  fontWeight:'500',
                  marginBottom:4, 
                  color:colors.tint 
                }}
              >
                About
              </CustomText>
              <CustomText 
                style={[
                  styles.descriptionText, 
                  { 
                    color:colors.tertiary 
                  }
                ]}
              >
                {item.description}
              </CustomText>
            </View>
          : null
        }

        { item.instagram 
          ? 
            <View style={styles.textContainer}>
              <View 
                style={[
                  styles.iconWrapper, 
                  { 
                    backgroundColor:colors.secondary 
                  }
                ]}
              >
                <CustomText 
                  style={[
                    styles.descriptionText, 
                    { 
                      color:colors.tertiary 
                    }
                  ]}
                >
                  📸
                </CustomText>
              </View>
              <CustomText 
                style={[
                  styles.descriptionText, 
                  { 
                    color:colors.tertiary 
                  }
                ]}
              >
                {item.instagram}
              </CustomText>
            </View>
          : null
        }

        { item.snapchat 
          ? 
            <View style={styles.textContainer}>
              <View 
                style={[
                  styles.iconWrapper, 
                  { 
                    backgroundColor:colors.secondary 
                  }
                ]}
              >
                <CustomText 
                  style={[
                    styles.descriptionText, 
                    { 
                      color:colors.tertiary 
                    }
                  ]}
                >
                  👻
                </CustomText>
              </View>
              <CustomText 
                style={[
                  styles.descriptionText, 
                  { 
                    color:colors.tertiary 
                  }
                ]}
              >
                {item.snapchat}
              </CustomText>
            </View>
          : null
        }

        { item.major 
          ? 
            <View style={styles.textContainer}>
              <View 
                style={[
                  styles.iconWrapper, 
                  { 
                    backgroundColor:colors.secondary 
                  }
                ]}
              >
                <CustomText 
                  style={[
                    styles.descriptionText, 
                    { 
                      color:colors.tertiary 
                    }
                  ]}
                >
                  🎓
                </CustomText>
              </View>
              <CustomText 
                style={[
                  styles.descriptionText, 
                  { 
                    color:colors.tertiary
                  }
                ]}
              >
                {item.major}
              </CustomText>
            </View>
          : null
        }

        { item.interests 
          ? 
            <View>
              <CustomText style={{ 
                  fontSize:22,
                  fontWeight:'500', 
                  marginBottom:4, 
                  color:colors.tint 
                }}
              >
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
                  <CustomText 
                    style={[
                      styles.descriptionText, 
                      { 
                        color:colors.tint 
                      }
                    ]}>
                      {interestsData[number-1].interest}
                    </CustomText>
                </View>
                
              ))}
              
            </View>
          : null
        }

        { item.photos.length !== 0
          ?
            <View>
              <CustomText 
                style={{ 
                  fontSize:22,
                  fontWeight:'500', 
                  marginBottom:4, 
                  color:colors.tint 
                }}
              >
                Photos
              </CustomText>
              { item.photos.map((photo) => (
                <View
                  key={photo.id}
                  style={{
                    alignSelf:'center',
                    width:width*.8,
                    height:width * .8,
                    marginBottom:15
                  }}
                >
                  <FastImage
                    key={photo.id}
                    style={{ 
                      width:'100%',
                      height:'100%',
                      borderRadius:10,
                      borderWidth:.5,
                      borderColor:colors.tertiary
                    }}
                    source={{uri:photo.image}}
                    resizeMode={FastImage.resizeMode.cover}
                  />

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
  iconWrapper: {
    padding:10,
    borderRadius:60
  }, 
  text: {
    fontSize: 15,
    marginLeft: 10,
  },
  descriptionText: { fontSize:20 },
  line: {
    borderBottomWidth: 0.8,
    margin: 10,
  },
  textContainer: {
    flexDirection:'row', 
    alignItems:'center', 
    gap:20,
  }
})