import { useState, useRef } from "react";
import { 
  View,
  FlatList,
  Text,
  Dimensions,
  Animated,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
 } from "react-native";

import { launchImageLibrary } from "react-native-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import Button from '../components/Button';
import Birthday from "./Create/Birthday";
import Sex from "./Create/Sex";
import Dorm from "./Create/Dorm";
import Interests from "./Create/Interests";
import Thumbnail from "./Create/Thumbnail";

import slides, { interestsData } from '../assets/Dictionary';
import useGlobal from "../core/global";
import { colors as c } from '../assets/config';

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

// function InterestsItem({ item, colors }) {
//   return (
//     <TouchableOpacity 
//       style={[styles.inputSelect, { 
//         backgroundColor:colors.accent, 
//         borderColor:colors.tertiary, 
//         borderWidth:1,
//         width:'auto',
//         marginBottom:7,
//       }]}
//     >
//       <Text style={[styles.inputSelectText, { color:colors.primary }]}>{item.interest}</Text>
//     </TouchableOpacity>
//   )
// }

// function InputSelect({ colors, which }) {
//   return (
//     which === 'Sex' ? (
//       <>
//         <Text style={{ marginBottom:6 }} />
//         <View style={{ flexDirection:'row', gap:20 }}>
//           <TouchableOpacity style={[styles.inputSelect, { backgroundColor:colors.accent, borderColor:colors.tertiary, borderWidth:1 }]}>
//             <Text style={[styles.inputSelectText, { color:colors.primary }]}>Guy</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.inputSelect, { backgroundColor:colors.accent, borderColor:colors.tertiary, borderWidth:1 }]}>
//             <Text style={[styles.inputSelectText, { color:colors.primary }]}>Girl</Text>
//           </TouchableOpacity>
//         </View>
//       </>
//     ) : (
//       which === 'Interests' ? (
//         <View style={{ marginBottom:100 }}>
//           <Text style={{ marginBottom:6 }} />
//           <FlatList 
//             vertical
//             scrollEnabled
//             showsVerticalScrollIndicator={false}
//             data={interestsData}
//             renderItem={({ item }) => <InterestsItem item={item} colors={colors} />}
//             keyExtractor={(item) => item.id}
//           />
//         </View>
//       ) : (
//         <TouchableOpacity
//           style={{
//             width:180, 
//             height:180, 
//             borderRadius:90,
//             backgroundColor:'transparent',
//             borderWidth:1,
//             borderColor:colors.tertiary,
//             borderStyle:'dashed',
//             justifyContent:'center'
//           }}
//           onPress={() => {
//             launchImageLibrary({ includeBase64:true, }, (response) => {
//               if (response.didCancel) return
//               const file = response.assets[0]
//               // set thumbnail here
//             })
//           }}
//         >
//           <FontAwesomeIcon 
//             icon="image"
//             size={25}
//             color={colors.tertiary}
//             style={{ alignSelf:'center' }}
//           />
//         </TouchableOpacity>
//       )
//     )
//   )
// }

function NextButton({ colors }) {
  return (
    <TouchableOpacity
      style={{ 
        marginTop:12,
        backgroundColor:colors.accent,
        padding:12,
        borderRadius:24,
      }}
    >
      <FontAwesomeIcon 
        icon="arrow-right"
        size={25}
        color='#f3f4f6'
      />
    </TouchableOpacity>
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
    return (
      <Interests colors={colors} form={form} setForm={setForm} />
    )
  }

  if (item.title === 'Thumbnail') {
    return (
      <Thumbnail colors={colors} form={form} setForm={setForm} />
    )
  }  
}

function SubmitButton({ colors, form }) {
  const setProfileCreated = useGlobal(state => state.setProfileCreated)
  return (
    <Button 
      onButtonPress={() => console.log(form)}
      colors={colors}
      buttonText="All Done"
      linkQuestion={"                                      "}
    />
  )
}


export default function CreateProfileScreen() {

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