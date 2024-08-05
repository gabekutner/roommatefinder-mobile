import React, {useState, useRef, useEffect} from "react";
import { View, ScrollView, Dimensions,Animated, Text, StyleSheet, TouchableOpacity } from "react-native";
import { IconButton} from "react-native-paper";
import FastImage from "react-native-fast-image";
// import useBearStore from "../../../libs/store";
import { appendFullUrl } from "../../../libs/utils/appendFullUrl";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {dormsData, interestsData} from "../../../assets/Dictionary";
import {theme} from "../../../assets/theme";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { AppStackParamList } from "types/StackParamList";
// import Profile from "types/django/Profile";

// Types for navigation and route props
// type PreviewProfileViewNavigationProp = StackNavigationProp<AppStackParamList, 'preview'>;
// type PreviewProfileViewRouteProp = RouteProp<AppStackParamList, 'preview'>;

// interface PreviewProfileViewProps {
//   route: PreviewProfileViewRouteProp;
//   navigation: PreviewProfileViewNavigationProp;
// };

const PreviewProfileView = ({ 
  route, 
  navigation 
}) => {

  const {user} = route.params;

  const photos = [user.thumbnail, ...user.photos.map(photo => photo.image)];
  
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const photoCount = photos.length;

  const showNextPhoto = () => {
    if (currentPhotoIndex < photoCount - 1) {
      setCurrentPhotoIndex(prevIndex => prevIndex + 1);
    }
  };

  const showPreviousPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(prevIndex => prevIndex - 1);
    }
  };

  // check what is defined and what's not
  // const dormBuildingNumber = user.dorm_building ? Number(user.dorm_building) : 0;
  // const dorm = dormsData[dormBuildingNumber - 1]?.dorm ?? 'Default Dorm'; // Provide a default value if `dorm` is und

  // const [overlayVisible, setOverlayVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const menuHeight = useRef(new Animated.Value(0)).current;
  const [buttonY, setButtonY] = useState(new Animated.Value(0));

  const toggleMenu = () => {
    setMenuVisible(prev => !prev);
    Animated.timing(menuHeight, {
      toValue: menuVisible ? 0 : 200, // Adjust to desired menu height
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background,}}>
      <TouchableOpacity
        onPress={toggleMenu}
        style={[
          styles.button,
          {
            position:'absolute',
            bottom:10,
            left:10,
            zIndex:1,
            height:50,
            width:50,
            justifyContent:'center',
            alignItems:'center'
          }
        ]}
        onLayout={(event) => {
          const { y } = event.nativeEvent.layout;
          setButtonY(new Animated.Value(y));
        }}
      >
        <FontAwesomeIcon icon="bars" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Animated Overlay Component */}
      {menuVisible && (
        <Animated.View style={[styles.menu, { marginBottom:10 }]}>
          <TouchableOpacity style={styles.menuItem}>
            <FontAwesomeIcon icon="vials" size={24} color={theme.colors.secondary} />
            <Text style={styles.menuText}>Matching Quiz</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.menuItem}>
            <FontAwesomeIcon icon="home" size={24} color={theme.colors.secondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <FontAwesomeIcon icon="home" size={24} color={theme.colors.secondary} /> */}
          {/* </TouchableOpacity> */}
        </Animated.View>
      )}
        
      <ScrollView showsVerticalScrollIndicator={false} style={{paddingHorizontal:10, marginBottom:70}}>
        <View 
          style={{ 
            marginTop:30, 
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}
        >
          <View 
            style={{
              flexDirection:'row', 
              gap:10,
              backgroundColor:theme.colors.primary,
              height:22,
              padding:8,
              borderTopRightRadius:12,
              borderTopLeftRadius:12,
              borderWidth:1
            }}
          >
            {photos.map((item, index) => (
              <View 
                key={index}
                style={{
                  flex:1, 
                  backgroundColor: index === currentPhotoIndex ? theme.colors.secondary : 'rgba(225, 225, 225, 0.2)',
                  borderRadius:12,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                }}
              />
            ))}
          </View>
          <View 
            style={{
              flex:1, 
              borderWidth:2,
              borderTopWidth:0,
              borderBottomRightRadius:12,
              borderBottomLeftRadius:12
            }}
          >
            <View style={{position:'absolute', top:0, bottom:0, left:0, right:0, zIndex:1, borderRadius:12, flexDirection:'row'}}>
              <TouchableOpacity style={{flex:1}} onPress={showPreviousPhoto} disabled={currentPhotoIndex === 0}/>
              <TouchableOpacity style={{flex:1}} onPress={showNextPhoto} disabled={currentPhotoIndex === photoCount - 1} />
            </View>
            <FastImage
              key={user.id}
              style={{
                height: Dimensions.get('screen').height * 0.6,
                borderBottomRightRadius:12,
                borderBottomLeftRadius:12,
                zIndex:0              
              }}
              source={appendFullUrl(photos[currentPhotoIndex])}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </View>
        <View 
          style={{
            marginTop:20, 
            marginHorizontal:10,
            paddingHorizontal:10,
            paddingVertical:5,
            flexDirection:'row', 
            justifyContent:'space-between', 
            alignItems:'center',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            backgroundColor:theme.colors.secondary, 
            borderRadius:12
          }}
        >
          <Text style={{fontFamily:'SuezOne-Regular', fontSize:22}}>{user.name}, {user.age}</Text>
          <IconButton 
            mode="contained"
            onPress={() => navigation.goBack()}
            icon={() => <FontAwesomeIcon icon="arrow-down" size={22} color={theme.colors.secondary} />}
            backgroundColor={theme.colors.tertiary}
            style={{
              height:50,
              width:50,
              borderRadius:60,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }}
          />
        </View>

        <View
          style={{
            marginTop:20, 
            marginHorizontal:10,
            paddingHorizontal:10,
            paddingVertical:5,
            justifyContent:'space-between', 
            alignItems:'center',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            backgroundColor:theme.colors.secondary, 
            borderRadius:12
          }}
        >
          {user.dorm_building !== null 
            ? 
            <View style={styles.box}>
              <View style={[styles.iconBubble, {backgroundColor:theme.colors.primary}]}>           
                <Text style={{fontFamily:'SuezOne-Regular', fontSize:20}}>🏡</Text>
              </View>
              <Text style={{fontFamily:'SuezOne-Regular', fontSize:20}}>
                {dormsData[user.dorm_building-1].dorm}
              </Text>
            </View>
            : null
          }
          {user.city !== null 
            ? 
            <View style={styles.box}>
              <View style={[styles.iconBubble, {backgroundColor:theme.colors.primary}]}>           
                <Text style={{fontFamily:'SuezOne-Regular', fontSize:20}}>📍</Text>
              </View>
              <Text style={{fontFamily:'SuezOne-Regular', fontSize:20}}>
                {user.city}
                {user.state !== null
                  ? `, ${user.state}`
                  : null
                }
              </Text>
            </View>
            : null
          }
          {user.major !== null 
            ? 
            <View style={styles.box}>
              <View style={[styles.iconBubble, {backgroundColor:theme.colors.primary}]}>           
                <Text style={{fontFamily:'SuezOne-Regular', fontSize:20}}>🎓</Text>
              </View>
              <Text style={{fontFamily:'SuezOne-Regular', fontSize:20}}>
                {user.major}
              </Text>
            </View>
            : null
          }
        </View>

        {user.interests?.length !== 0
            ?
              <View
                style={{
                  marginTop:20, 
                  marginHorizontal:10,
                  paddingHorizontal:10,
                  paddingVertical:10,
                  justifyContent:'space-between', 
                  // alignItems:'center',
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  backgroundColor:theme.colors.secondary, 
                  borderRadius:12,
                }}
              >
                <Text style={{fontSize:16, color:theme.colors.primary, fontFamily:'SuezOne-Regular'}}>Interests</Text>
                <View 
                  style={[
                    styles.box, 
                    {
                      flexDirection:'row', 
                      justifyContent:'flex-start', 
                      gap:4, 
                      flexWrap:'wrap', 
                    }
                  ]}
                >
                  {user.interests.map((item) => (
                  <View 
                    key={item} 
                    style={{
                      padding: 8,
                      borderRadius: 12,
                      backgroundColor:theme.colors.tertiary
                    }}
                  >
                    <Text style={{ fontFamily:'NotoSans_Condensed-Regular', fontSize:14, color:theme.colors.secondary, fontWeight:'500' }}>
                      {interestsData[Number(item)-1].interest}
                    </Text>
                  </View>
                ))}
                </View>
                
              </View>
            : null
          }

        
        {user.description.length !== 1
          ?
            <View
              style={{
                marginTop:20, 
                marginHorizontal:10,
                paddingHorizontal:10,
                paddingVertical:10,
                justifyContent:'space-between', 
                // alignItems:'center',
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                backgroundColor:theme.colors.secondary, 
                borderRadius:12,
                
              }}
            >
              
              <Text style={{fontSize:16, color:theme.colors.primary, fontFamily:'SuezOne-Regular'}}>About me</Text>
              <Text style={{fontSize:14, color:theme.colors.primary, fontFamily:'NotoSans_Condensed-Regular'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
            </View>
          : null
        }
    
      </ScrollView>
    </View>
  )
}

export {PreviewProfileView}

const styles = StyleSheet.create({
  box: {
    width:'100%', 
    borderRadius:12, 
    paddingHorizontal:15, 
    paddingVertical:10,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  iconBubble: {
    width:45,
    height:45,
    borderRadius:60,
    justifyContent:'center',
    alignItems:'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: theme.colors.onTertiary,
    padding: 10,
    borderRadius: 12,
  },
  menu: {
    position: 'absolute',
    left:10,
    bottom:55,
    // width:50,
    alignItems:'center',

    // right: 10, // Adjust as needed
    // backgroundColor: '#333',
    backgroundColor:theme.colors.primary,
    borderRadius: 5,
    overflow: 'hidden',
    zIndex:1,
    // width: 150, // Adjust as needed
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  menuText: {
    color: theme.colors.secondary,
    marginLeft: 10,
    fontSize:16,
    fontFamily:'NotoSans_Condensed-Regular'

  },
})