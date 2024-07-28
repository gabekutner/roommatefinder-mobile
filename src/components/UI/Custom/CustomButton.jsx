// Custom Button component
// import React, {useState} from "react";
// import {Animated, TouchableOpacity, Easing} from "react-native";

// import {verticalScale} from "react-native-size-matters";

// import {colors} from "../../../constants/colors";

// export default function CustomButton({
//   children,
//   onClick,
//   style,
//   disabled,
//   onLayout,
//   shadow, // bool
// }) {
//   const [scaleValue] = useState(new Animated.Value(1)); // Initial scale value
//   const [opacityValue] = useState(new Animated.Value(1)); // Initial opacity value

//   const animateButton = () => {
//     // Scale animation
//     Animated.timing(scaleValue, {
//       toValue: 0.9,
//       duration: 100,
//       easing: Easing.linear,
//       useNativeDriver: true,
//     }).start(() => {
//       // Reverse scale animation
//       Animated.timing(scaleValue, {
//         toValue: 1,
//         duration: 100,
//         easing: Easing.linear,
//         useNativeDriver: true,
//       }).start();
//     });

//     // Opacity animation
//     Animated.timing(opacityValue, {
//       toValue: 0.5,
//       duration: 100,
//       easing: Easing.linear,
//       useNativeDriver: true,
//     }).start(() => {
//       // Reverse opacity animation
//       Animated.timing(opacityValue, {
//         toValue: 1,
//         duration: 100,
//         easing: Easing.linear,
//         useNativeDriver: true,
//       }).start();
//     });
//   };

//   return (
//     <TouchableOpacity
//       disabled={disabled}
//       delayPressIn={200}
//       delayPressOut={200}
//       onLayout={onLayout}
//       style={{
//         gap: "0.5rem",
//         borderWidth: 0.75,
//         borderRadius: 12,
//         borderColor: colors.tint,
//         paddingVertical: verticalScale(15),
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "center",
//         transform: [
//           {
//             scale: scaleValue,
//           },
//         ],
//         ...style,
//         shadowColor: shadow ? "#000" : null,
//         shadowOpacity: shadow ? 0.7 : null,
//         shadowRadius: shadow ? 0.6 : null,
//         shadowOffset: {
//           width: shadow ? 1.5 : 0,
//           height: shadow ? 2 : 0,
//         },
//       }}
//       onPress={() => {
//         onClick();
//         animateButton();
//       }}
//       activeOpacity={0.6}
//     >
//       {children}
//     </TouchableOpacity>
//   );
// }
