import React from "react";
import {View, Text} from "react-native";
import FastImage from "react-native-fast-image";
import { FastImageBackground } from "../FastImageBackground";
import LinearGradient from "react-native-linear-gradient";
import {appendFullUrl} from "../../../../libs/utils/appendFullUrl";
import {interestsData} from "../../../../assets/Dictionary"
import {IconButton} from "react-native-paper"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";


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
        <View style={{width:'80%', backgroundColor:'red', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
          {/* name */}
          <View>
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
          </View>
          <View>
            <IconButton 
              onPress={() => console.log('test')}
              icon={() => <FontAwesomeIcon icon="arrow-left" color={props.theme.colors.primary} />}
              size={22}
              mode="contained"
            />
          </View>
        </View>
        
        {/* <View
          style={{
            flexDirection: "row",
            gap: 5,
            justifyContent: "space-between",
            marginHorizontal:10
          }}
        >
          <Text
            style={{
              fontFamily: "SuezOne-Regular",
              fontSize: 42,
              color: props.theme.colors.secondary,
            }}
          >
            Gabe Kutner
          </Text>
          <Text
            style={{
              fontFamily: "SuezOne-Regular",
              fontSize: 42,
              color: props.theme.colors.secondary,
              opacity: 0.8,
            }}
          >
            {props.item.age}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            paddingHorizontal: 15,
            marginVertical: 8,
            marginBottom:10
          }}
        >
          <View
            style={{
              padding: 5,
              borderRadius: 12,
              backgroundColor: `rgba(255,255,255, 0.2)`,
            }}
          >
            <Text style={{ color: props.theme.colors.secondary }}>Euro Football</Text>
          </View>
          <View
            style={{
              padding: 5,
              borderRadius: 12,
              backgroundColor: `rgba(255,255,255, 0.2)`,
            }}
          >
            <Text style={{color: props.theme.colors.secondary}}>Baseball</Text>
          </View>
          <View
            style={{
              padding: 5,
              borderRadius: 12,
              backgroundColor: `rgba(255,255,255, 0.2)`,
            }}
          >
            <Text style={{color: props.theme.colors.secondary, fontSize:14, fontWeight:'500'}}>Outdoors</Text>
          </View>
        </View> */}
      </LinearGradient>
    </FastImageBackground>
  );
};

export {Card};