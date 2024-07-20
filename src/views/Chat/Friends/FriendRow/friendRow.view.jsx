import React from "react";
import {View, TouchableOpacity} from "react-native";

import Cell from "../../../../components/Cell";
import CustomText from "../../../../components/UI/Custom/CustomText";
import Thumbnail from "../../../../components/Thumbnail";

import utils from "../../../../core/utils";
import {styles} from "./friendRow.styles";


function Row(props) {
  return (
    <Cell>
			<TouchableOpacity onPress={() => props.navigation.navigate('profile-detail', {item: props.profile})}>
				<Thumbnail
					url={props.item.friend.thumbnail}
					size={60}
				/>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => props.navigation.navigate('messages', props.item)}>
				<View style={styles.container}>
					<CustomText 
            fontSize="medium" 
            style={[
              styles.name, 
              {color: props.theme.colors.primary}
            ]}
          >
						{props.item.friend.name}
					</CustomText>
					<View style={styles.wrapper}>
						<CustomText 
              fontSize="small" 
              style={{
                color: props.theme.colors.primary
              }}
            >
							{props.item.preview} 
						</CustomText>
						<CustomText 
              fontSize="small" 
              style={{
                color: props.theme.colors._tint_primary
              }}
            >
							{utils.formatTime(props.item.updated)}
						</CustomText>
					</View>
				</View>
			</TouchableOpacity>
		</Cell>
  );
};

export {Row};