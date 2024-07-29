import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
import FastImage from "react-native-fast-image";
import { FastImageBackground } from "../FastImageBackground";
import LinearGradient from "react-native-linear-gradient";
import {appendFullUrl} from "../../../../libs/utils/appendFullUrl";
import {interestsData} from "../../../../assets/Dictionary"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { dormsData } from "../../../../assets/Dictionary";


function Card(props) {
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
      uri={appendFullUrl(props.item.thumbnail)}
    >
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
        <View style={{width:'100%', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', gap:4}}>
          {/* name */}
          <View style={{marginHorizontal:12}}>
            <Text
              style={{
                fontFamily: 'SuezOne-Regular',
                fontSize:35, 
                color: props.theme.colors.secondary,
                fontWeight:'500'
              }}
            >
              {props.item.name}
            </Text>
          </View>
          {/* dorm */}
          <View style={{marginHorizontal:12, flexDirection:"row", justifyContent:'center', alignItems:'center', gap:4, padding: 8,
                  borderRadius: 12,
                  backgroundColor: 'rgba(255,255,255,0.7)'}}>
            <Text
              style={{
                fontSize:18, 
                color: props.theme.colors.primary,
                fontWeight:'500'
              }}
            >
              🏠
            </Text>
            <Text
              style={{
                fontFamily: 'NotoSans_Condensed-Regular',
                fontSize:18, 
                color: props.theme.colors.primary,
                fontWeight:'500'
              }}
            >
              {dormsData[props.item.dorm_building-1].dorm}
            </Text>
          </View>
          {/* interests */}
          <View style={{marginHorizontal:10, marginVertical:5, flexDirection:'row', gap:4, overflow:'hidden', flexWrap:'wrap'}}>
            {props.item.interests.slice(0,3).map((item) => (
              <View 
                key={item} 
                style={{
                  padding: 8,
                  borderRadius: 12,
                  backgroundColor: 'rgba(255,255,255,0.7)'
                }}
              >
                <Text 
                  style={{
                    fontFamily: 'NotoSans_Condensed-Regular',
                    fontSize:14, 
                    color: props.theme.colors.primary,
                    fontWeight:'500'
                  }}
                >
                  {interestsData[item-1].interest}
                </Text>
              </View>
            ))}
          </View>
          <TouchableOpacity 
            style={{
              width:'90%',
              marginVertical:10,
              alignSelf:'center',
              justifyContent:'center',
              alignItems:'center', 
              padding: 8, 
              backgroundColor:props.theme.colors.tertiary,
              borderRadius:12
            }}
          >
            <FontAwesomeIcon icon="arrow-up" size={22} color={props.theme.colors.secondary} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </FastImageBackground>
  );
};

export {Card};