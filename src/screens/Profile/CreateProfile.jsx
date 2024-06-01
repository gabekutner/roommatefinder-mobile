import React, { 
  useState, 
  useRef 
} from "react";
import { 
  View,
  FlatList,
  Dimensions,
  Animated,
  SafeAreaView,
} from "react-native";

import CustomText from "../../components/UI/Custom/CustomText";
import CustomButton from "../../components/UI/Custom/CustomButton";
import Birthday from "./Create/Birthday";
import Sex from "./Create/Sex";
import Dorm from "./Create/Dorm";
import Interests from "./Create/Interests";
import Thumbnail from "./Create/Thumbnail";

import slides from '../../assets/Dictionary';
import useGlobal from "../../core/global";
import { colors as c } from '../../assets/config';

const { width } = Dimensions.get('window')


function Paginator({ colors, data, scrollX }) {
  return (
    <View style={{ flexDirection:'row' }}>
      {data.map((_, i) => {
        const inputRange = [(i-1) * width, i * width, (i+1) * width]
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

        return (
          <Animated.View 
            style={{ 
              height:10, 
              borderRadius:5, 
              backgroundColor:colors.accent, 
              marginHorizontal:8, 
              width:dotWidth, 
              opacity
            }} 
            key={i.toString()}
          />
        )
      })}
    </View>
  )
}


function Item({ item, theme, colors, form, setForm }) {

  if (item.title === 'Birthday') {
    return <Birthday theme={theme} colors={colors} form={form} setForm={setForm} />
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
    <CustomButton 
      onClick={() => createProfile(form, user)}
      style={{
        width:200,
        borderWidth:1,
        borderColor:colors.constWhite,
        backgroundColor:colors.accentDark,
        shadowColor: '#222',
        shadowOffset: { width: 7, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 1,  
        marginBottom:50
      }}
    >
      <CustomText 
        style={{ 
          fontSize:20, 
          fontWeight:'600', 
          color:colors.constWhite 
        }}
      >
        All Done
      </CustomText>
    </CustomButton>
  )
}


export default function CreateProfile() {

  const theme = useGlobal(state => state.theme)
  const colors = c[theme]

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
    <SafeAreaView 
      style={{ 
        flex:1, 
        alignItems:'center',
        backgroundColor:colors.primary
      }}
    >
      
      <CustomText style={{ marginVertical:50, textAlign:'center', color:colors.tertiary }} />
        {/* NO INFORMATION PROVIDED HERE WILL BE SENT TO THE UNIVERSITY OF UTAH
      </Text> */}

      <Paginator 
        colors={colors}
        data={slides}
        scrollX={scrollX}
      />

      <View style={{ flex:3 }}>
        <FlatList 
          horizontal
          data={slides}
          renderItem={({ item }) => (
            <View style={{ flex:1, marginTop:75, alignItems:'center', width:width }}>
              <CustomText 
                style={{
                  fontSize:25, 
                  fontWeight:'500', 
                  marginBottom:30,
                  color:colors.tint,
                }}
              >
                {item.label}
              </CustomText>
              <Item item={item} theme={theme} colors={colors} form={form} setForm={setForm} />
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

      {currentIndex === 4 ? <SubmitButton colors={colors} form={form} /> : <></>}
      
    </SafeAreaView>
  )
}