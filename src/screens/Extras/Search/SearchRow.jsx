import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { moderateScale, verticalScale } from "react-native-size-matters";

import Cell from "../../../components/Cell";
import CustomButton from "../../../components/UI/Custom/CustomButton";
import CustomText from "../../../components/UI/Custom/CustomText";
import Thumbnail from "../../../components/Thumbnail";
import SearchButton from "./SearchButton";

import useGlobal from "../../../core/global";
import { colors } from "../../../constants/colors";


export default function SearchRow({ navigation, item }) {

	const user = useGlobal(state => state.user)
	const getSwipeProfile = useGlobal(state => state.getSwipeProfile)
	const [profile, setProfile] = useState()

	useEffect(() => {
		async function fetchData() {
			const profile = await getSwipeProfile(user, item.id)
			const userData = await profile.data
			setProfile(userData)
		}
		fetchData()
	}, [getSwipeProfile, user, item])

	return (
		<Cell colors={colors}>
			<CustomButton style={{ borderWidth:0 }} onClick={() => navigation.navigate('profile-detail', { item:profile })}>
				<Thumbnail
					url={item.thumbnail}
					size={verticalScale(60)}
					borderColor={colors.secondary}
				/>
			</CustomButton>
			<View style={styles.textContainer}>
				<CustomText style={styles.text}>
					{item.name}
				</CustomText>	
			</View>
			<SearchButton user={item}/>
		</Cell>
	)
}

const styles = StyleSheet.create({
  textContainer: {
    flex:1, 
    paddingHorizontal:moderateScale(16)
  },
  text: {
    fontWeight:'600', 
    fontSize:verticalScale(15), 
    color:colors.tint, 
    marginBottom:verticalScale(4)
  }
})