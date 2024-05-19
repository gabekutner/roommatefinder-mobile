import React, { useState, useRef } from 'react';
import {
  Animated,
  Dimensions,
  LayoutAnimation,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import useGlobal from '../core/global';
import { colors as c } from '../assets/config'; 

const { width } = Dimensions.get('window')
const offset = width / 5



const random = () => parseInt(Math.random() * 150);
const randomColor = () =>
  'rgb(' + random() + ',' + random() + ' , ' + random() + ')';
let _data = []
for (let i = 0; i < 10; i += 1) {
  _data.push(randomColor())
}


export default function Swipe() {

  const theme = useGlobal(state => state.theme)
  const colors = c[theme]

  const opacity = useRef(new Animated.Value(0)).current
  const [data, setData] = useState(_data)

  const removeItem = () => {
    let newData = [...data]
    newData.splice(0, 1)
    newData = [...newData, randomColor()]
    LayoutAnimation.easeInEaseOut()
    setData(newData)
  }

  return (
    <View style={[styles.container, { backgroundColor:colors.primary }]}>
      <Animated.View
        style={[StyleSheet.absoluteFill, {opacity: opacity}]}
        ref={e => (this.containerRef = e)}
      />
      <View style={styles.container}>
        {data.map((item, index) => (
          <Card
            key={item}
            item={item}
            data={data}
            index={index}
            colors={colors}
            removeItem={removeItem}
          />
        ))}
      </View>
    </View>
  )
}

const Card = ({ item, data, index, colors, removeItem }) => {
  const pan = useRef(new Animated.ValueXY({x: 0, y: 0})).current
  const rotate = pan.x.interpolate({
    inputRange: [-width, 0, width],
    outputRange: ['-40deg', '0deg', '40deg'],
  })

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: Animated.event([null, {dx: pan.x}], {
        useNativeDriver: false,
        listener: (e, gestureState) => {
          // logic for positive and negative gestures
        },
      }),
      onPanResponderRelease: (e, gestureState) => {
        if (Math.abs(gestureState.vx) > 1 || Math.abs(gestureState.dx) > offset) {
          Animated.spring(pan, {
            toValue: {x: width * 2 * (gestureState.dx < 0 ? -1 : 1), y: 0},
            useNativeDriver: true,
            bounciness: 0,
          }).start();
          setTimeout(() => {
            removeItem()
          }, 100);
        } else {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            useNativeDriver: true,
          }).start()
        }
      },
      onPanResponderTerminate: () => {
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
        }).start()
      },
    })
  ).current

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        StyleSheet.absoluteFill,
        styles.center,
        {
          zIndex: data.length - index,
          marginBottom:150,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.item,
          {
            backgroundColor: colors.secondary,
            borderColor:colors.tint,
            borderWidth:.5,
            transform: [
              { translateX: pan.x },
              { rotate: rotate },
            ],
            width: 90 - index * 1 + '%',
            marginTop: index * 10,
            height:600,
          },
        ]}
      >
        {/* card content */}
        <Text style={{color: colors.tint, fontSize: 25}}>Swipe left or right</Text>
        {/* <Text style={{color: colors.tint, fontSize: 18}}>{item}</Text> */}
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    height: '50%',
    borderWidth: 1,
    borderColor: '#00000055',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
})