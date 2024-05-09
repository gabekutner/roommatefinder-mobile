import { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  FlatList, 
  Image, 
  Dimensions,
} from 'react-native';

import Colors from '../assets/Colors';


export default function Onboarding({ navigation }) {

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
      title:'Title', 
      subtitle:`WELCOME TO`,
      description:`Some description text ...`, 
      imagePath: require('../assets/images/image_part_002.png')
    },
    {
      id:3,
      title:'Title', 
      subtitle:'WELCOME TO',
      description:`Some description text ...`, 
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
    <View 
      style={{
        flex:1, 
        backgroundColor:Colors.utahRedRocks,
      }}
    >
      <View 
        style={{
          flex:0.8,
          backgroundColor:Colors.bg,
        }}
      >
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
                  width:Dimensions.get('window').width,
                  justifyContent:'flex-end'
                }}
              >
                <Image 
                  style={{
                    width:Dimensions.get('window').width,
                    height:Dimensions.get('window').height,
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
                  <Text 
                    style={{
                      fontWeight:'bold',
                      fontSize:12,
                      paddingBottom:15,
                      fontFamily:'NotoSans_Condensed-Regular'
                    }}>{item.subtitle}</Text>
                  <Text 
                    style={{
                      fontWeight:'bold',
                      fontSize:22,
                      fontFamily:'NotoSans_Condensed-Regular'
                    }}>{item.title}</Text>
                  <Text 
                    style={{
                      fontWeight:'bold',
                      fontSize:14,
                      textAlign:'center',
                      paddingTop: 5,
                      fontFamily:'NotoSans_Condensed-Regular'
                    }}>{item.description}</Text>
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
          <View style={[styles.dot, { backgroundColor: screen === 1 ? Colors.utahRed : Colors.bg }]} />
          <View style={[styles.dot, { backgroundColor: screen === 2 ? Colors.utahRed : Colors.bg }]} />
          <View style={[styles.dot, { backgroundColor: screen === 3 ? Colors.utahRed : Colors.bg }]} />
        </View>
      </View>

      <View 
        style={{
          flex:0.2,
          marginBottom: 25,
        }}
      >
        <TouchableOpacity 
          onPress={() => navigation.navigate("signin")}
          style={{
            backgroundColor:Colors.bg,
            padding:20,
            marginHorizontal:20,
            marginVertical:5,
            justifyContent:'center',
            alignItems:'center',
            borderRadius:5,
            marginTop:20,
          }}
        >
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => navigation.navigate("signup")}
          style={{
            borderWidth:1,
            borderColor:Colors.bg,
            padding:20,
            marginHorizontal:20,
            marginVertical:5,
            justifyContent:'center',
            alignItems:'center',
            borderRadius:5,
          }}
        >
          <Text style={[styles.buttonText, {color:Colors.bg}]}>Create an Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  dot: {
    width:12,
    height:12, 
    backgroundColor:Colors.bg,
    borderRadius:50,
    marginHorizontal:5,
    borderWidth:1,
    borderColor:Colors.bg,
  },
  buttonText: {
    fontWeight:'bold',
    fontSize:17,
    color:Colors.utahRedRocks,
    fontFamily:'NotoSans_Condensed-Regular',
  },
})