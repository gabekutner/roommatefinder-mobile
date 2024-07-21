import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import React from "react";
import {View, SafeAreaView, Text, StatusBar, TouchableOpacity} from "react-native";
import { useTheme } from "react-native-paper";
import { verticalScale } from "../../libs/react-native-size-matters";
import {fab} from "@fortawesome/free-brands-svg-icons";
import {library} from "@fortawesome/fontawesome-svg-core";
library.add(fab);

import {styles} from "./onboarding.styles";


function OnboardingView({ navigation }) {
  const theme = useTheme();
  
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <StatusBar />
      <View style={styles.trademarkContainer}>
        <Text
          style={[
            styles.font,
            {
              fontSize: verticalScale(20),
              color: theme.colors.primary,
            }
          ]}
        >
          RoommateFinder®
        </Text>
      </View>
      <View
        style={{flex: 1, backgroundColor: theme.colors._tint_primary, marginHorizontal:15}}
      ></View>
      <View style={styles.title}>
        <Text
          style={[
            styles.font,
            {
              fontSize: verticalScale(35),
              color: theme.colors.primary,
            }
          ]}
        >
          LOREM{" "}
          <View style={{borderRadius: 12, backgroundColor: theme.colors.tertiary}}>
            <Text
              style={[
                styles.font,
                {
                  fontSize: verticalScale(35),
                  color: theme.colors.secondary,
                  marginHorizontal: 5,
                }
              ]}
            >
              IPSUM
            </Text>
          </View>{" "}
          DOLOR SIT AMET
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: theme.colors._tint_primary,
            fontWeight: "600",
          }}
        >
          Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore.
        </Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => console.log('here')}
          style={[
            styles.github,
            {
              backgroundColor: theme.colors.primary
            }
          ]}
        >
          <FontAwesomeIcon
            icon={["fab", "github"]}
            size={verticalScale(25)}
            color={theme.colors.secondary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('signup')}
          style={[
            styles.getStarted,
            {
              backgroundColor: theme.colors.tertiary
            }
          ]}
        >
          <Text style={{fontSize: 16, fontWeight: "500", color: theme.colors.secondary}}>
            Get Started
          </Text>
          <FontAwesomeIcon
            icon="arrow-up-right-from-square"
            size={verticalScale(18)}
            color={theme.colors.secondary}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export {OnboardingView};