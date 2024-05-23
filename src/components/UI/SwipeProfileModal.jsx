import React from "react";
import {
  View,
  StyleSheet,
  Modal
} from "react-native";

import FastImage from "react-native-fast-image";

import DetailBottomSheet from "./DetailBottomSheet";
import utils from "../../core/utils";


export default function SwipeProfileModal({ 
  item, 
  colors,
  setIsVisible,
  isVisible,
}) {
  return (
    <Modal
      animationType="slide"
      visible={isVisible}
    >
      <View style={{ flex:1, backgroundColor:colors.secondary }}>
        <FastImage
          key={item.id}
          style={styles.image}
          imageStyle={styles.imageStyle}
          source={utils.thumbnail(item.thumbnail)}
          resizeMode={FastImage.resizeMode.cover}
        />
        <DetailBottomSheet 
          item={item}
          setShow={setIsVisible}
          colors={colors}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  image: {
    flex:1,
    width:'100%',
    height:'100%',
    justifyContent:'space-between',
    alignItems:'flex-end',
    flexDirection:'row',
  },
  imageStyle: { height:'100%' },
})