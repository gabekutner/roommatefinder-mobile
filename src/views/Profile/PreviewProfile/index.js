import React from "react";
import { View, ScrollView, Dimensions, Text, StyleSheet } from "react-native";
import { useTheme, IconButton, Icon} from "react-native-paper";
import FastImage from "react-native-fast-image";
import useBearStore from "../../../libs/store";
import { appendFullUrl } from "../../../libs/utils/appendFullUrl";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {dormsData} from "../../../assets/Dictionary";



function PreviewProfileView({ route, navigation }) {
  const customTheme = useTheme()
  // const {item} = route.params
  // temp
  const user = useBearStore((state) => state.user)
  return (
    <View style={{flex: 1, backgroundColor: customTheme.colors.background,}}>
      <ScrollView>
        <FastImage
          key={user.id}
          style={{width: '100%', height: Dimensions.get('screen').height * 0.6}}
          source={appendFullUrl(user.thumbnail)}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View 
          style={{
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            backgroundColor: customTheme.colors.background,
            flex: 1,
            padding: 15, // Optional: for spacing
            marginTop:-15,
            gap:10
          }}
        >
          <View style={[styles.box, {backgroundColor:customTheme.colors.background}]}>
            <Text style={{fontFamily:'SuezOne-Regular', fontSize:20}}>{user.name}</Text>
            <IconButton 
              mode="contained"
              onPress={() => navigation.goBack()}
              icon={() => <FontAwesomeIcon icon="arrow-down" size={20} />}
            />
          </View>
          <View style={[styles.box, {backgroundColor:customTheme.colors.background, shadowColor:0}]}>
            <Text style={{fontFamily:'SuezOne-Regular', fontSize:20}}>{dormsData[user.dorm_building-1].dorm}</Text>
            <Text style={{fontFamily:'SuezOne-Regular', fontSize:20}}>🏡</Text>

            {/* <IconButton 
              mode="contained"
              onPress={() => navigation.goBack()}
              icon={() => <FontAwesomeIcon icon="arrow-down" size={20} />}
            /> */}
          </View>





       
      </View>
      </ScrollView>
    </View>
  )
}

export {PreviewProfileView}

const styles = StyleSheet.create({
  box: {
    width:'100%', 
    borderRadius:12, 
    paddingHorizontal:15, 
    paddingVertical:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  }
})