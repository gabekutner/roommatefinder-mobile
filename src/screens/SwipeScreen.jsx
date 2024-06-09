import React, { useState, useRef, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  LayoutAnimation,
  PanResponder,
  StyleSheet,
  View,
} from 'react-native';

import { verticalScale } from 'react-native-size-matters';

import Empty from '../components/Empty';
import CustomText from '../components/UI/Custom/CustomText';
import CardItem from '../components/Card';

import useGlobal from '../core/global';
import { colors } from '../constants/colors';

const { width } = Dimensions.get('window')
const offset = width / 5


export default function Swipe({ navigation }) {

  const user = useGlobal(state => state.user)
  const getSwipe = useGlobal(state => state.getSwipe)

  const opacity = useRef(new Animated.Value(0)).current
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchData(page)
  }, [page])

  const fetchData = async(page) => {
    try {
      const response = await getSwipe(user, page)
      if (response === 404) {
        const response = await getSwipe(user, 1)
        const userData = await response.data.results
        setData(userData)
      } else {
        const userData = await response.data.results
        setData(userData)
      }
    } catch(error) {
      console.log(error)
    }
  }

  const removeItem = () => {
    setData(prevData => {
      // remove the first item from the previous data array
      const newData = prevData.slice(1)
      LayoutAnimation.easeInEaseOut()
      // if newData.length is 0, we ran out of users so fetch 
      // more data on the next page
      if (newData.length === 0) {
        setPage(prevPage => prevPage + 1)
      }
      return newData
    })
  }

  if (data.length === 0) return <Empty icon='hourglass' message='You ran out of people.' colors={colors} />

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <Animated.View
        style={[StyleSheet.absoluteFill, { opacity: opacity }]}
        ref={e => (this.containerRef = e)}
      />
      <View style={styles.container}>
        { data.length !== 0 
          ? 
            <>
              {data.map((item, index) => (
                <Card
                  key={item.id}
                  item={item}
                  data={data}
                  index={index}
                  colors={colors}
                  removeItem={removeItem}
                  navigation={navigation}
                />
              ))}
            </>
          : null
        }
      </View>
    </View>
  )
}

const Card = ({ item, data, index, colors, removeItem, navigation}) => {

  const requestConnect = useGlobal(state => state.requestConnect)

  const pan = useRef(new Animated.ValueXY({x: 0, y: 0})).current
  const rotate = pan.x.interpolate({
    inputRange: [-width, 0, width],
    outputRange: ['-40deg', '0deg', '40deg'],
  })

  let lastSwipeValue = 0; // Initialize variable to store the last swipe value

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: Animated.event([null, {dx: pan.x}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gestureState) => {
        // Update last swipe value
        lastSwipeValue = gestureState.dx;
        if (lastSwipeValue > 0) {
          // send friend request
          requestConnect(item.id)
        }
        // No need to handle left swipe
        
        if (Math.abs(gestureState.vx) > 1 || Math.abs(gestureState.dx) > offset) {
          // Update last swipe value
          lastSwipeValue = gestureState.dx;
          Animated.spring(pan, {
            toValue: {x: width * 2 * (gestureState.dx < 0 ? -1 : 1), y: 0},
            useNativeDriver: true,
            bounciness: 0,
          }).start()
          setTimeout(() => {
            removeItem()
          }, 100)
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
  ).current;


  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        StyleSheet.absoluteFill,
        styles.center,
        {
          zIndex: data.length - index,
          marginBottom: verticalScale(68), // Adjusted margin bottom
        },
      ]}
    >
      <Animated.View
        style={{
          backgroundColor: colors.secondary,
          borderColor: colors.constBlack,
          borderWidth: 3,
          transform: [
            { translateX: pan.x },
            { rotate: rotate },
          ],
          width: 90 - index * 1 + '%',
          marginTop: index * 10,
          height: verticalScale(490),
        }}
      >
        <CardItem navigation={navigation} item={item} colors={colors} />
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
