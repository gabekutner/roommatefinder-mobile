import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Animated,
  View,
	Image,
  Text,
} from 'react-native';



import Title from '../components/UI/Title';
import useGlobal from '../core/global';
import { colors as c } from '../assets/config';


export default function SplashScreen() {

	const theme = useGlobal(state => state.theme)
	const colors = c[theme]

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
				flex:1,
				alignItems:'center',
				justifyContent:'center',
				backgroundColor:colors.accent
			}}
		>
			<StatusBar barStyle='light-content' />
			<Animated.View style={[{ transform: [{ translateY }] }]}>
				<Image 
					source={require('../assets/images/uofulogo-clear_prev_ui.png')}
					style={{
						width:400,
						height:300,
					}}
				/>
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
            color:colors.constWhite,
            textAlign:'center',
            fontSize:16,
            fontFamily:'Glegoo-Bold' 
          }}>v. 1.0.0</Text>
      </View>
		</SafeAreaView>
	)
}