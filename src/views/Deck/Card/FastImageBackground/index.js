import React from "react";
import {FlatList, Text, View} from "react-native";
import {styles} from "./fastImageBackground.styles";
import {LoadingIndicator} from "./LoadingIndicator";
// react-native-image-progress is a bridge between the image component,
// or react-native-fast-image, and the progress views in react-native-progress.
// Or you can use it to render a custom progress indicator.
import FastImage from "react-native-fast-image";
import {createImageProgress} from "react-native-image-progress";
import { appendFullUrl } from "../../../../libs/utils/appendFullUrl";
// Wrap FastImage with react-native-image-progress.
const Image = createImageProgress(FastImage);


function FastImageBackground(props) {

  const thumbnail = {
    id: "1",
    image: props.item.thumbnail,
    profile: props.item.id
  }

  const photos = [...props.item.photos]
  photos.push(thumbnail)

  return (
    <View
      style={[
        styles.container,
        props.containerStyle
      ]}
    >
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        data={photos}
        style={{height:'100%', width:'100%'}}
        renderItem={({item}) => (
          <Image 
            resizeMode="cover"
            style={{height:'100%', width:50}}
            // style={{flex:1}}
            source={appendFullUrl(item.image)}
            indicator={() => <LoadingIndicator />}
          />
        )}
        // renderItem={({item}) => {
        //   console.log(appendFullUrl(item.image))
        //   return (
        //     <Image
        //       style={[
        //         styles.image,
        //         props.imageStyle
        //       ]}
        //       source={require('../../../../assets/images/profile.png')}
        //       resizeMode={props.resizeMode}
        //       indicator={() => <LoadingIndicator />}
        //     />
        //   )
        // }}
      >
        
      </FlatList>
    </View>
  );
};

export {FastImageBackground};