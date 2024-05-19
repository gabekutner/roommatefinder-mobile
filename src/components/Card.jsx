import {
  View,
  Text,
  Image
} from 'react-native';


export default function CardItem({ navigation, item, colors }) {

  return (
    <View style={{ flex:1 }}>
      <Image 
        source={{uri: item.thumbnail}}
        style={{ 
          height:'60%', 
          width:'100%',
          resizeMode:'cover',
          borderRadius:10,
          // borderColor
          // temp
          // borderWidth:1 
        }}  
      />
      {/* <Text style={{color: colors.tint, fontSize: 25}}>Swipe left or right</Text> */}
      <Text style={{color: colors.tint, fontSize: 18}}>{item.name}</Text>
      
    </View>
  )
}