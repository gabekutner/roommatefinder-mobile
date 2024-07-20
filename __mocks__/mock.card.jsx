/**
 * @description new card desigm
 */

import React from "react";
import {View, Text, ImageBackground} from "react-native";
import {useTheme} from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

function MockCard() {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.background,
      }}
    >
      <ImageBackground
        style={{
          borderWidth: 2,
          borderColor: theme.colors.primary,
          height: "75%",
          width: "75%",
        }}
        source={require("../src/assets/images/image_part_001.png")}
        resizeMode="cover"
        imageStyle={{height: "100%", width: "100%"}}
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
                backgroundColor: theme.colors.tertiary,
                height: 15,
                width: 15,
                borderRadius: 60,
              }}
            />
            <Text style={{fontSize: 16, color: theme.colors.secondary}}>
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
                fontSize: 37,
                color: theme.colors.secondary,
              }}
            >
              Gabe Kutner
            </Text>
            <Text
              style={{
                fontFamily: "SuezOne-Regular",
                fontSize: 37,
                color: theme.colors.secondary,
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
              marginTop: 8,
            }}
          >
            <View
              style={{
                padding: 5,
                borderRadius: 12,
                backgroundColor: theme.colors.secondary,
                opacity: 0.8,
              }}
            >
              <Text>Euro Football</Text>
            </View>
            <View
              style={{
                padding: 5,
                borderRadius: 12,
                backgroundColor: theme.colors.secondary,
              }}
            >
              <Text>Baseball</Text>
            </View>
            <View
              style={{
                padding: 5,
                borderRadius: 12,
                backgroundColor: theme.colors.secondary,
              }}
            >
              <Text style={{color: theme.colors.primary}}>Outdoors</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              paddingHorizontal: 10,
              marginTop: 8,
            }}
          >
            <FontAwesomeIcon
              icon="location-dot"
              size={22}
              color={theme.colors.secondary}
            />
            <Text style={{fontSize: 16, color: theme.colors.secondary}}>
              San Francisco, California
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              height: 50,
              marginTop: 15,
              padding: 3,
            }}
          >
            <View
              style={{
                borderRadius: 12,
                height: "100%",
                width: "50%",
                backgroundColor: theme.colors.secondary,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon
                icon="xmark"
                size={30}
                color={theme.colors.primary}
              />
            </View>
            <View
              style={{
                borderRadius: 12,
                height: "100%",
                width: "50%",
                backgroundColor: theme.colors.tertiary,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon
                icon="heart"
                size={30}
                color={theme.colors.primary}
              />
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

export {MockCard};
