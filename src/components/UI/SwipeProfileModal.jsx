import React from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";

import FastImage from "react-native-fast-image";

import DetailBottomSheet from "./DetailBottomSheet";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";


export default function SwipeProfileModal({ 
  item,
  colors,
  setIsVisible,
  isVisible,
}) {

  const blockProfileAlert = () => {
    Alert.alert(
      'Do you want to block this profile?',
      "If you block this profile, you won't be able to see their profiles",
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Block profile',
          onPress: () => {
            // handleBlockProfile()
          },
          style: 'destructive',
        },
      ]
    );
  };

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
          source={{ uri:item.thumbnail }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <TouchableOpacity
          onPress={() => blockProfileAlert()}
          style={{
            position:'absolute',
            top:40,
            right:20
          }}
        >
          <FontAwesomeIcon 
            icon="ellipsis-vertical"
            size={22}
            color='#000000'
          />
        </TouchableOpacity>
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