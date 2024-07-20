import React from "react";
import {View} from 'react-native';

import Thumbnail from "../../../../../../components/Thumbnail";
import CustomText from "../../../../../../components/UI/Custom/CustomText";
import {MessageTypingAnimation} from "../MessageTypingAnimation";

// import {styles} from "./messageBubbleFriend.styles";
import {styles} from "../messageBubble.styles";


function MessageBubbleFriend(props) {
	return (
		<View style={styles.container}>
			<Thumbnail
				url={props.friend.thumbnail}
				size={42}
			/>
			<View 
        style={[
          styles.bubble,
          {
						backgroundColor: props.theme.colors.primary,
						marginLeft: 8
					}
        ]}
      >
				{props.typing ? (
					<View style={{flexDirection: 'row'}}>
						<MessageTypingAnimation offset={0} theme={props.theme} />
						<MessageTypingAnimation offset={1} theme={props.theme} />
						<MessageTypingAnimation offset={2} theme={props.theme} />
					</View>
				) : (
					<>
						<CustomText fontSize="large" style={{fontFamily: 'SuezOne-Regular', color: props.theme.colors.tertiary}}>
							{props.friend.name}
						</CustomText>
						<CustomText 
							fontSize="medium" 
							style={[
								styles.text,
								{color: props.theme.colors.secondary}
							]}
						>
							{props.message.text}
						</CustomText>
					</>
				)}
			</View>
			<View style={{flex: 1}} />
		</View>
	);
};

export {MessageBubbleFriend};