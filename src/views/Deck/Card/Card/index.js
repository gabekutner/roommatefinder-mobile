import React, {useState} from "react";
import {View, Text, TouchableOpacity} from "react-native";
import FastImage from "react-native-fast-image";
import { FastImageBackground } from "../FastImageBackground";
import LinearGradient from "react-native-linear-gradient";
import {appendFullUrl} from "../../../../libs/utils/appendFullUrl";
import {interestsData} from "../../../../assets/Dictionary"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { dormsData } from "../../../../assets/Dictionary";
import {IconButton} from "react-native-paper";


function Card(props) {

  const photos = [props.item.thumbnail, ...props.item.photos.map(photo => photo.image)];
  
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

  return (
    <FastImageBackground
      key={props.item.id}
      containerStyle={{
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "flex-end",
        flexDirection: "row",
        justifyContent: "center",
      }}
      imageStyle={{height: "100%"}}
      resizeMode={FastImage.resizeMode.cover}
      uri={appendFullUrl(photos[currentPhotoIndex])}
    >
      <View style={{position:'absolute', top:10, left:10, right:10, height:5, flexDirection:'row', gap:10 }}>
        {photos.map((item, index) => (
          <View 
            key={index}
            style={{
              flex:1, 
              backgroundColor: index === currentPhotoIndex ? props.theme.colors.secondary : props.theme.colors.primary,
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
      <View style={{height:"100%", width:'100%', flexDirection:'row'}}>
        <TouchableOpacity style={{flex:1}} onPress={showPreviousPhoto} disabled={currentPhotoIndex === 0}/>
        <TouchableOpacity style={{flex:1}} onPress={showNextPhoto} disabled={currentPhotoIndex === photoCount - 1} />
      </View>
      <LinearGradient
        colors={["rgba(0,0,0,0.7)", "transparent"]} // Adjust gradient colors as needed
        start={{x: 0.5, y: 0.7}}
        end={{x: 0.5, y: 0}}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          flex: 1,
          flexWrap: "nowrap",
          overflow: "hidden",
        }}
      >
        <View style={{flex:1, flexDirection:'row', alignItems:'center' }}>
          <View 
            style={{
              flex:1, 
              backgroundColor:props.theme.colors.primary, 
              marginLeft:10, 
              marginBottom:10, 
              padding:10, 
              borderRadius:12, 
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              gap:5,
              maxWidth:'80%'
            }}
          >
            <Text
              style={{
                fontFamily: 'SuezOne-Regular',
                fontSize:22,
                color: props.theme.colors.secondary,
              }}
            >
              {props.item.name}
            </Text>
            <Text
              style={{
                fontFamily: 'NotoSans_Condensed-Regular',
                fontSize:18, 
                color: props.theme.colors.secondary,
              }}
            >
              {dormsData[props.item.dorm_building-1].dorm}
            </Text>
            <View style={{flexDirection:'row', gap:4, flexWrap:'wrap'}}>
              {props.item.interests.slice(0,3).map((item) => (
                <View 
                  key={item} 
                  style={{
                    padding: 8,
                    borderRadius: 12,
                    backgroundColor: 'rgba(225, 225, 225, 0.9)'
                  }}
                >
                  <Text 
                    style={{
                      fontFamily: 'NotoSans_Condensed-Regular',
                      fontSize:14, 
                      color: props.theme.colors.primary,
                    }}
                  >
                    {interestsData[item-1].interest}
                  </Text>
                </View>
              ))}
            </View>

          </View>
          <View style={{flex:.5, alignItems:'center', justifyContent:'center'}}>
            <IconButton
              onPress={() => props.navigation.navigate('preview', { user:props.item })}
              icon={() => <FontAwesomeIcon icon={"arrow-up"} size={22} color={props.theme.colors.secondary} /> }
              backgroundColor={props.theme.colors.tertiary}
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
        </View>
      </LinearGradient>
    </FastImageBackground>
  );
};

export {Card};