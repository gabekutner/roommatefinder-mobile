import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Animated,
  View,
	Image,
  Text,
	ImageBackground,
	StyleSheet,
} from 'react-native';

// import Title from '../components/UI/Title';
import useGlobal from '../core/global';
// import { colors as c } from '../assets/config'
import { colors } from '../constants/colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Title from '../components/Brand/Title';
import CustomText from '../components/UI/Custom/CustomText';


export default function SplashScreen() {

	// const theme = useGlobal(state => state.theme)
	// const colors = c[theme]

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
		<ImageBackground
			source={require('../assets/images/image_part_003.png')}
			style={styles.container}
		>
			<StatusBar barStyle='light-content' />
			<Animated.View style={{ marginBottom:verticalScale(200), transform: [{ translateY }] }}>
				<View style={styles.title}>
					<Title 
						title='roommatefinder'
						color={colors.tint}
						fontSize={verticalScale(30)}
						style={{ textAlign:'center' }}
					/>
				</View>
			</Animated.View>
			<View style={styles.version}>
				<CustomText style={styles.text}>
					v. 1.0.0
				</CustomText>
			</View>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	container: {
		flex:1,
		alignItems:'center',
		justifyContent:'center',
		backgroundColor:colors.primary,
	},
	title: {
		backgroundColor:colors.primary,
		paddingTop:verticalScale(15),
		paddingBottom:verticalScale(8),
		paddingHorizontal:moderateScale(12),
		borderWidth:2,
		borderRadius:12
	},
	version: {
		position:'absolute',
		right:0, 
		left:0,
		bottom:verticalScale(40),
		backgroundColor:colors.primary,
		marginHorizontal:moderateScale(100),
		borderWidth:2,
		borderRadius:12,
		paddingVertical:verticalScale(10),
	},
	text: {
		color:colors.tint,
		textAlign:'center',
		fontWeight:'600',
		fontSize:verticalScale(16),
	}
})