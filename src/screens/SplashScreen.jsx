import { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Animated,
  View,
  Text,
} from 'react-native';

import Title from '../components/Title';
import Colors from '../assets/Colors';


export default function SplashScreen() {

  const translateY = new Animated.Value(0)
	const duration = 2000

	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(translateY, {
					toValue: 20,
					duration: duration,
					useNativeDriver: true
				}),
				Animated.timing(translateY, {
					toValue: 0,
					duration: duration,
					useNativeDriver: true
				})
			]) 
		).start()
	}, [])

  return (
		<SafeAreaView
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: Colors.utahRed
			}}
		>
			<StatusBar barStyle='light-content' />
			<Animated.View style={[{ transform: [{ translateY }] }]}>
				<Title text='roommatefinder' color={Colors.utahWhite} />
			</Animated.View>
      <View 
        style={{ 
          bottom:40, 
          right:0, 
          left:0,
          position:'absolute'
        }}
      >
        <Text 
          style={{ 
            color:Colors.utahWhite,
            textAlign:'center',
            fontSize:16,
            fontFamily:'Glegoo-Bold' 
          }}>v. 1.0.0</Text>
      </View>
		</SafeAreaView>
	)
}