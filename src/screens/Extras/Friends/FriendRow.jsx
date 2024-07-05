import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import { moderateScale, verticalScale } from "react-native-size-matters";

import CustomButton from "../../../components/UI/Custom/CustomButton";
import CustomText from "../../../components/UI/Custom/CustomText";
import Cell from "../../../components/Cell";
import Thumbnail from "../../../components/Thumbnail";

import useGlobal from "../../../core/global";
import { colors } from "../../../constants/colors";
import utils from "../../../core/utils";


export default function FriendRow({ navigation, item }) {

	const user = useGlobal(state => state.user)
	const getSwipeProfile = useGlobal(state => state.getSwipeProfile)
	const [profile, setProfile] = useState()

	useEffect(() => {
    const fetchProfile = async() => {
      const resp = await getSwipeProfile(user, user.id)
      setProfile(resp.data)
    }
    fetchProfile()
  }, [])

	return (
		<Cell colors={colors}>
			<CustomButton
				onClick={() => navigation.navigate('profile-detail', { item:profile })}
				style={{ borderWidth:0 }}
			>
				<Thumbnail
					url={item.friend.thumbnail}
					size={76}
					borderColor={colors.tint}
				/>
			</CustomButton>
			<CustomButton onClick={() => navigation.navigate('messages', item)} style={{ borderWidth:0 }}>
				<View style={styles.container}>
					<CustomText style={styles.name}>
						{item.friend.name}
					</CustomText>
					<View style={styles.wrapper}>
						<CustomText style={{ color:colors.tint }}>
							{item.preview} 
						</CustomText>
						<CustomText style={styles.date}>
							{utils.formatTime(item.updated)}
						</CustomText>
					</View>
				</View>
			</CustomButton>
		</Cell>
	)
}

const styles = StyleSheet.create({
  container: {
    flex:1, 
    paddingHorizontal:moderateScale(15), 
    justifyContent:'center' 
  },
  name: {
    fontWeight:'600', 
    fontSize:verticalScale(14), 
    color:colors.tint, 
    marginBottom:verticalScale(4),
  },
  wrapper: {
    flexDirection:'row',
		gap:moderateScale(5)
  },
  date: {
    color:colors.tertiary, 
		fontSize:verticalScale(11),
  }
})