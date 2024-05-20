import React, { useState, useRef } from "react";
import { 
  View,
  FlatList,
  Text,
  Dimensions,
  Animated,
  SafeAreaView,
  StyleSheet,
 } from "react-native";

import Button from '../../components/Button';
import Birthday from "./Create/Birthday";
import Sex from "./Create/Sex";
import Dorm from "./Create/Dorm";
import Interests from "./Create/Interests";
import Thumbnail from "./Create/Thumbnail";

import slides from '../../assets/Dictionary';
import useGlobal from "../../core/global";
import { colors as c } from '../../assets/config';

const window = Dimensions.get('window')


function Paginator({ colors, data, scrollX }) {
  return (
    <View style={{ flexDirection:'row' }}>
      {data.map((_, i) => {
        const inputRange = [(i-1) * window.width, i * window.width, (i+1) * window.width]
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp'
        })
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp'
        })

        return <Animated.View style={{ height:10, borderRadius:5, backgroundColor:colors.accent, marginHorizontal:8, width:dotWidth, opacity, }} key={i.toString()} />
      })}
    </View>
  )
}


function Item({ item, colors, form, setForm }) {

  if (item.title === 'Birthday') {
    return <Birthday form={form} setForm={setForm} />
  }

  if (item.title === 'Sex') {
    return <Sex colors={colors} form={form} setForm={setForm} />
  }

  if (item.title === 'Dorm') {
    return <Dorm colors={colors} form={form} setForm={setForm} />
  }

  if (item.title === 'Interests') {
    return <Interests colors={colors} form={form} setForm={setForm} />
  }

  if (item.title === 'Thumbnail') {
    return <Thumbnail colors={colors} form={form} setForm={setForm} />
  }  
}


function SubmitButton({ colors, form }) {

  const user = useGlobal(state => state.user)
  const createProfile = useGlobal(state => state.createProfile)

  return (
    <Button 
      onButtonPress={() => createProfile(form, user)}
      colors={colors}
      buttonText="All Done"
      linkQuestion={"                                      "}
    />
  )
}


export default function CreateProfile() {

  const theme = useGlobal(state => state.theme)
  activeColors = c[theme]

  const [form, setForm] = useState({
    birthday: new Date(),
    sex: "",
    dorm: "",
    interests: [],
    thumbnail: null
  })

  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollX = useRef(new Animated.Value(0)).current
  const slidesRef = useRef(null)

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index)
  }).current

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold : 50 }).current

  return (
    <SafeAreaView style={{ flex:1, alignItems:'center' }}>
      
      <Text style={{ marginVertical:50, textAlign:'center', color:activeColors.tertiary }}>
        NO INFORMATION PROVIDED HERE WILL BE SENT TO THE UNIVERSITY OF UTAH
      </Text>

      <Paginator 
        colors={activeColors}
        data={slides}
        scrollX={scrollX}
      />

      <View style={{ flex:3 }}>
        <FlatList 
          horizontal
          data={slides}
          renderItem={({ item }) => (
            <View style={{ flex:1, marginTop:75, alignItems:'center', width:window.width }}>
              <Text style={styles.label}>
                {item.label}
              </Text>
              <Item item={item} colors={activeColors} form={form} setForm={setForm} />
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x : scrollX  } } }], {
            useNativeDriver: false,
          })}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>

      {currentIndex === 4 ? <SubmitButton colors={activeColors} form={form} /> : <></>}
      
    </SafeAreaView>
   )
}

const styles = StyleSheet.create({
  title: {
    marginTop:50, 
    textAlign:'center', 
  },
  label: {
    fontSize:25, 
    fontWeight:'500', 
    marginBottom:30,
  },
  input: {
    backgroundColor:'#fff',
    paddingHorizontal:20,
    height: 66,
    borderRadius:12,
    fontSize:20,
    fontWeight:'500',
    color:'#222',
    borderWidth:1,
    borderColor:'#ccc',
  },
  inputSelect: {
    padding:15,
    width:75,
    borderRadius:10,
    alignItems:'center',
  },
  inputSelectText: {
    fontFamily:'NotoSans_Condensed-Regular',
    fontSize:20,
    fontWeight:'500'
  }
})