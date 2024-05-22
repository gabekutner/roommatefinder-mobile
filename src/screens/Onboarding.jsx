import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  FlatList, 
  Image, 
  Dimensions,
} from 'react-native';

import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';

import CustomText from '../components/UI/Custom/CustomText';

import useGlobal from '../core/global';
import { colors as c} from '../assets/config';

const { width, height } = Dimensions.get('window')


export default function Onboarding({ navigation }) {

  const theme = useGlobal(state => state.theme)
  const colors = c[theme]

  const [screen, setScreen] = useState(0)
  const slides = [
    {
      id:1,
      title:'roommatefinder.com', 
      subtitle:'WELCOME TO',
      description:`Find your future dorm roommates!`, 
      imagePath: require('../assets/images/image_part_001.png'),
    },
    {
      id:2,
      title:'title',
      subtitle:'...',
      description:'some description text...',
      imagePath: require('../assets/images/image_part_002.png')
    },
    {
      id:3,
      title:'title',
      subtitle:'...',
      description:'some description text...',
      imagePath: require('../assets/images/image_part_003.png')
    }
  ]

  const onViewableItemsChanged = ({ viewableItems }) => {
    setScreen(viewableItems[0].key)
  }

  const viewabilityConfigCallbackPairs = useRef([
    { onViewableItemsChanged },
  ])

  return (
    <View style={{ flex:1, backgroundColor:colors.accentDark }}>
      <View style={{ flex:0.8, backgroundColor:colors.constWhite }}>
        <FlatList
          data={slides}
          horizontal={true}
          key={({item}) => {item.id}}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          renderItem={({ item }) => {
            return(
              <View 
                style={{
                  width:width,
                  justifyContent:'flex-end'
                }}
              >
                <Image 
                  style={{
                    width:width,
                    height:height,
                  }} 
                  source={item.imagePath} 
                />
                <View  
                  style={{
                    position:'absolute', 
                    top:0,
                    left:0, 
                    right:0, 
                    bottom:300, 
                    justifyContent:'center', 
                    alignItems:'center',
                    padding:20,
                  }}
                >
                  <CustomText 
                    style={[styles.bold, {
                      fontSize:12,
                      paddingBottom:15,
                    }]}
                  >
                    {item.subtitle}
                  </CustomText>
                  <CustomText 
                    style={[styles.bold, {
                      fontSize:22,
                    }]}
                  >
                    {item.title}
                  </CustomText>
                  <CustomText 
                    style={[styles.bold, {
                      fontSize:14,
                      textAlign:'center',
                      paddingTop: 5,
                    }]}
                  >
                    {item.description}
                  </CustomText>
                </View>
              </View>
            )
          }}
        />
        <View 
          style={{
            flexDirection:'row',
            position:'absolute',
            right:0, 
            left:0,
            bottom:8,
            justifyContent:'center',
          }}
        >
          <View style={[styles.dot, { backgroundColor: screen === 1 ? colors.accent : colors.constWhite, borderColor:colors.constWhite }]} />
          <View style={[styles.dot, { backgroundColor: screen === 2 ? colors.accent : colors.constWhite, borderColor:colors.constWhite }]} />
          <View style={[styles.dot, { backgroundColor: screen === 3 ? colors.accent : colors.constWhite, borderColor:colors.constWhite }]} />
        </View>
      </View>

      <View style={{ flex:0.2, marginBottom: 25 }}>
        <TouchableOpacity 
          onPress={() => navigation.navigate("signin")}
          style={{
            backgroundColor:colors.constWhite,
            padding:moderateVerticalScale(20),
            marginHorizontal:moderateScale(20),
            marginVertical:moderateVerticalScale(5),
            justifyContent:'center',
            alignItems:'center',
            borderRadius:5,
            marginTop:moderateScale(15),
          }}
        >
          <Text style={[styles.buttonText, styles.bold, { color:colors.accentDark }]}>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => navigation.navigate("signup")}
          style={{
            borderWidth:1,
            borderColor:colors.constWhite,
            padding:20,
            marginHorizontal:20,
            marginVertical:5,
            justifyContent:'center',
            alignItems:'center',
            borderRadius:5,
          }}
        >
          <Text style={[styles.buttonText, styles.bold, {color:colors.constWhite}]}>Create an Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bold: { fontWeight:'bold' },
  dot: {
    width:12,
    height:12,
    borderRadius:50,
    marginHorizontal:5,
    borderWidth:1,
  },
  buttonText: { fontSize:17 },
})