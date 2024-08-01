import React from "react";
import { View, ScrollView, Dimensions, Text } from "react-native";
import { useTheme, IconButton, Icon} from "react-native-paper";
import FastImage from "react-native-fast-image";
import useBearStore from "../../../libs/store";
import { appendFullUrl } from "../../../libs/utils/appendFullUrl";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
<<<<<<< Updated upstream
=======
import {dormsData, interestsData} from "../../../assets/Dictionary";
>>>>>>> Stashed changes



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
          <View 
            style={{
              width:'100%', 
              backgroundColor:customTheme.colors.background, 
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
            }}
          >
            <Text style={{fontFamily:'SuezOne-Regular', fontSize:20}}>{user.name}</Text>
            <IconButton 
              mode="contained"
              onPress={() => navigation.goBack()}
              icon={() => <FontAwesomeIcon icon="arrow-down" size={20} />}
            />
          </View>
<<<<<<< Updated upstream
          <View style={{width:'100%', backgroundColor:customTheme.colors.tertiary, borderRadius:12, paddingHorizontal:15, paddingVertical:10}}>
            <Text style={{fontFamily:'SuezOne-Regular', fontSize:20}}>{user.name}</Text>
=======
          <View style={[styles.box, {backgroundColor:customTheme.colors.background, shadowColor:0}]}>
            <Text style={{fontFamily:'SuezOne-Regular', fontSize:20}}>🏡</Text>
            {/* <Text style={{fontFamily:'SuezOne-Regular', fontSize:20}}>Dorm</Text> */}
            <Text style={{fontFamily:'SuezOne-Regular', fontSize:20}}>{dormsData[user.dorm_building-1].dorm}</Text>
          </View>
          <Text style={{fontFamily:'SuezOne-Regular', fontSize:20}}>Interests</Text>
          <View 
            style={[
              styles.box, 
              {
                flexDirection:'row', 
                justifyContent:'flex-start', 
                gap:8, 
                flexWrap:'wrap', 
                backgroundColor:customTheme.colors.background,
              }
            ]}
          >
            {user.interests.map((item) => (
              <View 
                key={item} 
                style={{
                  padding: 8,
                  borderRadius: 12,
                  backgroundColor:customTheme.colors.tertiary
                }}
              >
                <Text style={{ fontFamily:'NotoSans_Condensed-Regular', fontSize:16, color:customTheme.colors.secondary, fontWeight:'500' }}>
                  {interestsData[item-1].interest}
                </Text>
              </View>
            ))}
          </View>

          <View style={[styles.box, {backgroundColor:customTheme.colors.background}]}>
            <Text style={{fontFamily:'SuezOne-Regular', fontSize:20}}>🏡</Text>
            <Text style={{fontFamily:'SuezOne-Regular', fontSize:20}}>{user.city}, {user.state}</Text>
          </View>
          <View style={[styles.box, {backgroundColor:customTheme.colors.background}]}>
            <Text style={{fontFamily:'SuezOne-Regular', fontSize:20}}>🏡</Text>
            <Text style={{fontFamily:'SuezOne-Regular', fontSize:20}}>{user.major}</Text>
>>>>>>> Stashed changes
          </View>
       
      </View>
      </ScrollView>
    </View>
  )
}

export {PreviewProfileView}