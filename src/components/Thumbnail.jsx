import React from "react";
import FastImage from "react-native-fast-image";
import utils from "../core/utils";


export default function Thumbnail({ url, size, borderColor }) {
	return (
		<FastImage
			key={url.uri}
			style={{ 
				width:size, 
				height:size, 
				borderRadius: size / 2,
				backgroundColor:'#e0e0e0',
				borderWidth:1,
				borderColor:borderColor
			}}
			source={utils.thumbnail(url)}
			resizeMode={FastImage.resizeMode.cover}
		/>
	)
}