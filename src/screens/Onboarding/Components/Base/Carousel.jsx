import React from "react";
import {
  Animated,
  FlatList,
  View,
  Dimensions
} from "react-native";


import Label from "../Label";
import SexScreen from "../../Sex";
import AgeScreen from "../../Age";
import HomeTownScreen from "../../Hometown";
import GraduationYearScreen from "../../GraduationYear";
import MajorScreen from "../../Major";
import InterestsScreen from "../../Interests";
import PhotosScreen from "../../Photos";
import DormScreen from "../../Dorm";
import BaseWidgetsScreen from "../../Widgets/BaseWidget";

// quiz
import SocialBatteryScreen from "../../Matching/SocialBattery";
import CleanRoomScreen from "../../Matching/CleanRoom";
import NoiseLevelScreen from "../../Matching/NoiseLevel";
import GuestPolicyScreen from "../../Matching/GuestPolicy";
import InRoomScreen from "../../Matching/InRoom";
import HotColdScreen from "../../Matching/HotCold";
import BedTimeScreen from "../../Matching/BedTime";
import WakeUpScreen from "../../Matching/WakeUpTime";
import SharingPolicyScreen from "../../Matching/SharingPolicy";

import { colors } from "../../../../constants/colors";
import { spacing, flex, borders } from "../../../../styles/styles";


export default function Carousel({ 
  navigation,
  data,
  scrollX,
  viewableItemsChanged,
  viewConfig,
  dataRef
 }) {

  const Item = ({ item }) => {
    return (
      <View 
        style={{ 
          width:Dimensions.get('window').width,
          ...flex.alignItemsCenter,
          ...spacing.mt6
        }}
      >
        <View 
          style={{
            width:'85%',
            backgroundColor:colors.primary,
            borderColor:colors.tint,
            ...borders.br3,
            ...borders.bw2,
            ...flex.alignItemsCenter,
            ...spacing.ph3,
            ...spacing.pb5
          }}
        >
          <Label text={item.label} style={{ ...spacing.mv5, textAlign:'center' }} />
          { item.title === 'age' ? <AgeScreen /> : null }
          { item.title === 'sex' ? <SexScreen /> : null }
          { item.title === 'hometown' ? <HomeTownScreen /> : null }
          { item.title === 'graduation_year' ? <GraduationYearScreen /> : null }
          { item.title === 'major' ? <MajorScreen /> : null }
          { item.title === 'interests' ? <InterestsScreen /> : null }
          { item.title === 'widgets' ? <BaseWidgetsScreen navigation={navigation} /> : null }
          { item.title === 'photos' ? <PhotosScreen /> : null }
          { item.title === 'dorm' ? <DormScreen /> : null }
          {/* matching quiz */}
          { item.title === 'social-battery' ? <SocialBatteryScreen /> : null }
          { item.title === 'clean-room' ? <CleanRoomScreen /> : null }
          { item.title === 'noise-level' ? <NoiseLevelScreen /> : null }
          { item.title === 'guest-policy' ? <GuestPolicyScreen /> : null }
          { item.title === 'in-room' ? <InRoomScreen /> : null }
          { item.title === 'hot-cold' ? <HotColdScreen /> : null }
          { item.title === 'bed-time' ? <BedTimeScreen /> : null }
          { item.title === 'wake-up-time' ? <WakeUpScreen /> : null }
          { item.title === 'sharing-policy' ? <SharingPolicyScreen /> : null } 
        </View>
      </View>
    )
  }

  return (
    <FlatList 
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      bounces={false}
      scrollEnabled={false}
      data={data}
      renderItem={({ item }) => <Item item={item} />}
      keyExtractor={(item) => item.id}
      onScroll={Animated.event([{ nativeEvent: { contentOffset:{x:scrollX} } }], {
        useNativeDriver: false
      })}
      scrollEventThrottle={32}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={viewConfig}
      ref={dataRef}
      initialNumToRender={8}
    />
  )
}