import React from "react";
import {View, Text} from "react-native";
import FastImage from "react-native-fast-image";
import { FastImageBackground } from "../FastImageBackground";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import LinearGradient from "react-native-linear-gradient";


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
      url={props.item.thumbnail}
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
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            paddingHorizontal: 10,
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: props.theme.colors.tertiary,
              height: 15,
              width: 15,
              borderRadius: 60,
            }}
          />
          <Text style={{fontSize: 16, color: props.theme.colors.secondary, fontWeight: '600'}}>
            Offline
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            justifyContent: "center",
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
            20
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
        </View>
      </LinearGradient>
    </FastImageBackground>
  );
};

export {Card};