import React, {useRef} from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
} from "react-native";
import useStore from "../../../zustand/store";
import {CardSwiper} from "./CardSwiper";

const {width} = Dimensions.get("window");
const offset = width / 5;

/*global setTimeout */
/*eslint no-undef: "error"*/


function CardSwipeContainer(props) {
  const requestConnect = useStore((state) => state.requestConnect);

  const pan = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const rotate = pan.x.interpolate({
    inputRange: [-width, 0, width],
    outputRange: ["-40deg", "0deg", "40deg"],
  });

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
          requestConnect(props.item.id);
        };
        // No need to handle left swipe
        if (
          Math.abs(gestureState.vx) > 1 ||
          Math.abs(gestureState.dx) > offset
        ) {
          // Update last swipe value
          lastSwipeValue = gestureState.dx;
          Animated.spring(pan, {
            toValue: {x: width * 2 * (gestureState.dx < 0 ? -1 : 1), y: 0},
            useNativeDriver: true,
            bounciness: 0,
          }).start();
          setTimeout(() => {
            props.removeItem();
          }, 100);
        } else {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            useNativeDriver: true,
          }).start();
        };
      },
      onPanResponderTerminate: () => {
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  return (
    <CardSwiper
      panResponder={panResponder}
      data={props.data}
      pan={pan}
      rotate={rotate}
      index={props.index}
      theme={props.theme}
      item={props.item}
    />
  );
};

export {CardSwipeContainer};