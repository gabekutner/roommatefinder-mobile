import React from "react";
import {
  Animated,
  FlatList,
  View,
  StyleSheet,
  Dimensions
} from "react-native";

import { verticalScale } from "react-native-size-matters";
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
    />
  )
}

const styles = StyleSheet.create({
  container: {
    width:Dimensions.get('window').width,
    alignItems:'center',
    marginTop:verticalScale(25)
  },
  // shared: {
  //   width:Dimensions.get('window').width ,
  //   alignItems:'center',
  //   height:100,
  //   alignSelf:'center',
  //   justifyContent:"center",
  //   backgroundColor:colors.primary,
  //   paddingVertical:verticalScale(12),
  //   paddingHorizontal:6,
  //   borderRadius:12,
  //   borderWidth:2,
  // },
  card: {
    width:'75%',
    backgroundColor:colors.primary,
    height:100,
    borderRadius:12,
    borderWidth:2,
    borderColor:colors.tint,
  },
})