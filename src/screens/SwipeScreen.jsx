/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Animated,
  Dimensions,
  LayoutAnimation,
  PanResponder,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import useGlobal from '../core/global';
import { colors as c } from '../assets/config'; 

const {width} = Dimensions.get('window');
const offset = width / 5;

const random = () => parseInt(Math.random() * 150);
const randomColor = () =>
  'rgb(' + random() + ',' + random() + ' , ' + random() + ')';
let _data = []
for (let i = 0; i < 10; i += 1) {
  _data.push(randomColor())
}
const theme = () => useGlobal(state => state.theme)
const colors = c[theme]


export default class Swipe extends Component {

  constructor() {
    super()
    this.opacity = new Animated.Value(0)
    this.state = {
      data: _data,
      colors: colors,
    }
  }
  removeItem = () => {
    const {data, colors} = this.state
    let newData = [...data]
    newData.splice(0, 1)
    newData = [...newData, randomColor()]
    LayoutAnimation.easeInEaseOut()
    this.setState({data: newData})
    console.log(colors)
  }

  render() {
    const {data} = this.state
    return (
      <View style={styles.container}>
        <Animated.View
          style={[StyleSheet.absoluteFill, {opacity: this.opacity}]}
          ref={e => (this.containerRef = e)}
        />
        <View style={styles.container}>
          {data.map((item, index) => (
            <Card
              key={item}
              item={item}
              data={data}
              i={index}
              colors={colors}
              removeItem={this.removeItem}
            />
          ))}
        </View>
      </View>
    )
  }
}

class Card extends Component {
  constructor() {
    super()
    let isPositive = false
    let isNegative = false
    this.pan = new Animated.ValueXY({x: 0, y: 0})
    this.rotate = this.pan.x.interpolate({
      inputRange: [-width, 0, width],
      outputRange: ['-40deg', '0deg', '40deg'],
    })
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: Animated.event([null, {dx: this.pan.x}], {
        useNativeDriver: false,
        listener: (e, g) => {
          if (!isPositive && g.dx > offset) {
            isPositive = true
          } else if (isPositive && g.dx < offset) {
            isPositive = false
          } else if (isNegative && g.dx < -offset) {
            isNegative = true
          } else if (isNegative && g.dx > -offset) {
            isNegative = false
          }
        },
      }),
      onPanResponderRelease: (e, g) => {
        const {removeItem} = this.props
        if (Math.abs(g.vx) > 1 || Math.abs(g.dx) > offset) {
          Animated.spring(this.pan, {
            toValue: {x: width * 2 * (g.dx < 0 ? -1 : 1), y: 0},
            useNativeDriver: true,
            bounciness: 0,
          }).start()
          setTimeout(() => {
            removeItem()
          }, 100)
        } else {
          Animated.spring(this.pan, {
            toValue: {x: 0, y: 0},
            useNativeDriver: true,
          }).start()
        }
        isPositive = false
        isNegative = false
      },
      onPanResponderTerminate: () => {
        Animated.spring(this.pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
        }).start();
        isPositive = false
        isNegative = false
      },
    })
  }
  render() {
    const {data, i, item} = this.props
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[
          StyleSheet.absoluteFill,
          styles.center,
          {zIndex: data.length - i},
        ]}>
        <Animated.View
          style={[
            styles.item,
            {
              backgroundColor: item,
              transform: [
                {
                  translateX: this.pan.x,
                },
                {
                  rotate: this.rotate,
                },
              ],
              width: 80 - i * 1 + '%',
              marginTop: i * 10,
            },
          ]}>
          <Text style={{color: '#fff', fontSize: 25}}>Swipe left or right</Text>
          <Text style={{color: '#fff', fontSize: 18}}>{item}</Text>
        </Animated.View>
      </Animated.View>
    );
  }
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
});


// export default function Swipe({ navigation }) {

//   const theme = useGlobal(state => state.theme)
//   const activeColors = c[theme]

//   const opacity = new Animated.Value(0)
//   const [data, setData] = useState('')
  

//   return (
//     <SafeAreaView style={{ backgroundColor:activeColors.primary }}>

//       {/* card */}
//       <View style={[styles.card, { borderColor:activeColors.tint, backgroundColor:activeColors.secondary }]}>
//         <Text style={{ color:activeColors.tint, fontSize:20 }}>gabe</Text>
//       </View>

//       {/* buttons */}
//       <View style={[styles.buttonContainer]}>
        
//         <TouchableOpacity style={[styles.button, { backgroundColor:activeColors.accent }]}>
//           <FontAwesomeIcon 
//             icon="arrow-left-long"
//             size={25}
//             color={activeColors.tint}
//           />
//         </TouchableOpacity>

//         <TouchableOpacity style={[styles.button, { backgroundColor:activeColors.accent }]}>
//           <FontAwesomeIcon 
//             icon="arrow-right-long"
//             size={25}
//             color={activeColors.tint}
//           />
//         </TouchableOpacity>

//       </View>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   card: {
//     height:height * .65, 
//     // width:width,
//     margin:5,
//     borderRadius:12,
//     borderWidth:1,

//     // temp
//     justifyContent:'center',
//     alignItems:'center'
//   },
//   buttonContainer: {
//     marginTop:5,
//     flexDirection:'row',
//     gap:15,
//     justifyContent:'center',
//     alignItems:'center'
//   },
//   button: {
//     padding:10,
//     borderRadius:12,
//     width:'45%',
//     alignItems:'center',
//     justifyContent:'center'
//   }
// })