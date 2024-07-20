import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import useStore from "../src/zustand/store";
import Cell from "../src/components/Cell";
import CustomButton from "../src/components/UI/Custom/CustomButton";
import CustomText from "../src/components/UI/Custom/CustomText";
import Thumbnail from "../src/components/Thumbnail";



const Row = props => {
  return (
    <Cell>
			<CustomButton 
				shadow
				style={{ borderWidth:0 }} 
				onClick={() => {}}
			>
        <View style={{ height:50, width:50, backgroundColor:props.theme.colors.primary }} />
				{/* <Thumbnail
					url={props.item.friend.thumbnail}
					size={verticalScale(60)}
				/> */}
			</CustomButton>
			<CustomButton onClick={() => {}} style={{ borderWidth:0 }}>
				<View style={styles.container}>
					<CustomText fontSize="medium" style={styles.name}>
						{props.item.name}
					</CustomText>
					<View style={styles.wrapper}>
						<CustomText fontSize="small">
							{props.item.preview} 
						</CustomText>
						<CustomText fontSize="small">
              now
							{/* {utils.formatTime(props.item.updated)} */}
						</CustomText>
					</View>
				</View>
			</CustomButton>
		</Cell>
  )
}

function MockFriend({ navigation }) {
  const theme = useTheme()
  const friendList = [
    {
      id: 1,
      name: 'dave',
      preview: "hey whatddup?"
    },
    {
      id: 2,
      name: 'dave',
      preview: "hey whatddup?"
    },
    {
      id: 3,
      name: 'dave',
      preview: "hey whatddup?"
    },
  ]
  return (
    <View style={{flex: 1, justifyContent:'center', alignItems:'center', backgroundColor:theme.colors.background}}>
			<FlatList
				data={friendList}
				renderItem={({ item }) => (
					<Row navigation={navigation} item={item} theme={theme}/>
				)}
				keyExtractor={item => item.id}
			/>
    </View>
  )
}

export {MockFriend}

const styles = StyleSheet.create({
  container: {
    flex:1, 
    paddingHorizontal: 15,
    justifyContent:'center' 
  },
  name: {
    fontWeight:'600', 
    marginBottom: 4,
  },
  wrapper: {
    flexDirection:'row',
		gap: 5
  },
})