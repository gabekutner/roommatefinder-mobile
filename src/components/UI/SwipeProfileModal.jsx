import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
} from "react-native";

import FastImage from "react-native-fast-image";

import DetailBottomSheet from "./DetailBottomSheet";
import useGlobal from "../../core/global";


export default function SwipeProfileModal({ 
  item,
  colors,
  setIsVisible,
  isVisible,
}) {

  const user = useGlobal(state => state.user)

  const [actionMessage, setActionMessage] = useState('Friend Request')

  useEffect(() => {
    // dynamic action button
    for (let x of item.received_connections) {
      if (user.id === x.sender && x.accepted === true) {
        setActionMessage('Accepted')
      } else if (user.id === x.sender && x.accepted === false) {
        setActionMessage('Pending')
      }
    }
    for (let x of item.sent_connections) {
      if (user.id === x.receiver && x.accepted === true) {
        setActionMessage('Accepted')
      } else if (user.id === x.receiver && x.accepted === false) {
        setActionMessage('Pending')
      }
    }
  }, [item, user])


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
          source={{uri:item.thumbnail}}
          resizeMode={FastImage.resizeMode.cover}
        />
        <DetailBottomSheet 
          item={item}
          setShow={setIsVisible}
          colors={colors}
          message={actionMessage}
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