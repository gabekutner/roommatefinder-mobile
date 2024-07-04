import React from "react";
import {
  Animated,
  FlatList,
  View,
  StyleSheet,
  Dimensions
} from "react-native";

import { moderateScale, verticalScale } from "react-native-size-matters";

import Label from "../Label";
import SexScreen from "../../Sex";
import AgeScreen from "../../Age";
import HomeTownScreen from "../../Hometown";
import GraduationYearScreen from "../../GraduationYear";
import InterestsScreen from "../../Interests";
import PhotosScreen from "../../Photos";
import DormScreen from "../../Dorm";

import { colors } from "../../../../constants/colors";


export default function Carousel({ 
  data,
  scrollX,
  viewableItemsChanged,
  viewConfig,
  dataRef
 }) {

  const Item = ({ item }) => {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Label text={item.label} style={{ marginVertical:verticalScale(20), textAlign:'center' }} />
          { item.title === 'age' ? <AgeScreen /> : null }
          { item.title === 'sex' ? <SexScreen /> : null }
          { item.title === 'hometown' ? <HomeTownScreen /> : null }
          { item.title === 'graduation_year' ? <GraduationYearScreen /> : null }
          { item.title === 'interests' ? <InterestsScreen /> : null }
          {/* widgets here ... */}
          { item.title === 'photos' ? <PhotosScreen /> : null }
          { item.title === 'dorm' ? <DormScreen /> : null }
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

const styles = StyleSheet.create({
  container: {
    width:Dimensions.get('window').width,
    alignItems:'center',
    marginTop:verticalScale(25)
  },
  card: {
    width:'85%',
    backgroundColor:colors.primary,
    borderRadius:12,
    borderWidth:2,
    borderColor:colors.tint,
    alignItems:'center',
    paddingHorizontal:moderateScale(15),
    paddingBottom:verticalScale(20)
  },
})