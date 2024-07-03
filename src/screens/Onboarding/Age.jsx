import React, { useRef, useState} from "react";
import { 
  FlatList, 
  View, 
  Dimensions,
  StyleSheet,
  Animated,
  ImageBackground
} from "react-native";

import DatePicker from 'react-native-date-picker';
import { verticalScale, moderateScale } from 'react-native-size-matters';

import Paginator from "./Components/Base/Paginator";
import Header from "./Components/Base/Header";
import Carousel from "./Components/Base/Carousel";

import CustomText from "../../components/UI/Custom/CustomText";
import Label from "./Components/Label";
import Card from "./Components/Card";
import useGlobal from "../../core/global";
import { colors } from "../../constants/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import CustomButton from "../../components/UI/Custom/CustomButton";


export default function AgeScreen({ navigation }) {

  const form = useGlobal(state => state.form)
  const setForm = useGlobal(state => state.setForm)

  const scrollX = useRef(new Animated.Value(0)).current
  const [currentIndex, setCurrentIndex] = useState(0)
  const dataRef = useRef(null)

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index)
  }).current

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

  const scrollNext = () => {
    if (currentIndex < data.length - 1) {
      dataRef.current.scrollToIndex({ index: currentIndex + 1 })
    } else {
      console.log('last item')
    }
  }
  const scrollBack = () => {
    if (currentIndex < data.length && currentIndex != 0) {
      dataRef.current.scrollToIndex({ index: currentIndex - 1 })
    } else {
      console.log('first item')
    }
  }
  
  const data = [
    {'id': 1, 'title': 'age'},
    {'id':2, 'title': 'sex'},
    {'id': 3, 'title': 'major'},
  ]

  const Item = ({ item }) => {
    return (
      <View style={styles.cardContainer}>
        <View 
          style={{ 
            ...styles.shared,
            ...styles.card, 
          }}
        >
          <CustomText>{item.title}</CustomText>
        </View>
      </View>
    )
  }

  return (
    <ImageBackground 
      source={require('../../assets/images/image_part_002.png')}
      style={{ flex:1, backgroundColor:colors.primary }}
      imageStyle={{ opacity:0.5 }}
    >
      <Header 
        scrollNext={scrollNext} 
        scrollBack={scrollBack} 
        data={data} 
        scrollX={scrollX} 
      />
      <View style={{ flex:3 }}>
        <Carousel 
          data={data}
          scrollX={scrollX}
          viewableItemsChanged={viewableItemsChanged}
          viewConfig={viewConfig}
          dataRef={dataRef}
        />
        {/* <FlatList 
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
        /> */}

      </View>
    </ImageBackground>      
  )
}

// {/* <Label text="How old are you?" style={{ marginVertical:verticalScale(20) }} />
      // <DatePicker
      //   inlined
      //   date={form.birthday}
      //   mode={'date'}
      //   theme={'light'}
      //   onDateChange={birthday => setForm({ ...form, birthday:birthday })}
      // /> */}

const styles = StyleSheet.create({
  cardContainer: {
    flex:1,
    width:Dimensions.get('window').width,
    alignItems:'center',
    justifyContent:'center',
  },
  shared: {
    width:Dimensions.get('window').width ,
    alignItems:'center',
    height:100,
    alignSelf:'center',
    justifyContent:"center",
    backgroundColor:colors.primary,
    paddingVertical:verticalScale(12),
    paddingHorizontal:6,
    borderRadius:12,
    borderWidth:2,
  },
  card: {},
  subCard: {
    position:'absolute',
    left:0,
    right:0,
    bottom:verticalScale(35),
  },
  subCardText: {
    fontSize:verticalScale(11),
    fontWeight:'500',
    textAlign:'center',
    color:colors.tertiary
  },
  dot: {
    height:10,
    borderRadius:5,
    backgroundColor:colors.accent,
    marginHorizontal:8
  }
})