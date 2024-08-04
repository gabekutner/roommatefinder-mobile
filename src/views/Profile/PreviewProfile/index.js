import React from "react";
import { View, ScrollView, Dimensions, Text, StyleSheet } from "react-native";
import { useTheme, IconButton, Icon} from "react-native-paper";
import FastImage from "react-native-fast-image";
import useBearStore from "../../../libs/store";
import { appendFullUrl } from "../../../libs/utils/appendFullUrl";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {dormsData, interestsData} from "../../../assets/Dictionary";
import {theme} from "../../../assets/theme";


function PreviewProfileView({ route, navigation }) {
  const {user} = route.params

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background,}}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
            backgroundColor: theme.colors.background,
            flex: 1,
            padding: 15, // Optional: for spacing
            marginTop:-15,
            gap:10
          }}
        >
          <View 
            style={{
              width:'100%', 
              backgroundColor:theme.colors.background, 
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
          <View style={[styles.box, {backgroundColor:theme.colors.background}]}>
            <View style={[styles.iconBubble, {backgroundColor:theme.colors.secondary}]}>           
              <Text style={{fontFamily:'SuezOne-Regular', fontSize:20}}>🏡</Text>
            </View>
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
                backgroundColor:theme.colors.background,
              }
            ]}
          >
            {user.interests.map((item) => (
              <View 
                key={item} 
                style={{
                  padding: 8,
                  borderRadius: 12,
                  backgroundColor:theme.colors.tertiary
                }}
              >
                <Text style={{ fontFamily:'NotoSans_Condensed-Regular', fontSize:16, color:theme.colors.secondary, fontWeight:'500' }}>
                  {interestsData[item-1].interest}
                </Text>
              </View>
            ))}
          </View>

          <View style={[styles.box, {backgroundColor:theme.colors.background}]}>
            <View style={[styles.iconBubble, {backgroundColor:theme.colors.secondary}]}>           
              <Text style={{fontFamily:'SuezOne-Regular', fontSize:20}}>📍</Text>
            </View>
            <Text style={{fontFamily:'SuezOne-Regular', fontSize:20}}>{user.city}, {user.state}</Text>
          </View>
          <View style={[styles.box, {backgroundColor:theme.colors.background}]}>
            <View style={[styles.iconBubble, {backgroundColor:theme.colors.secondary}]}>           
              <Text style={{fontFamily:'SuezOne-Regular', fontSize:20}}>🎓</Text>
            </View>
            <Text style={{fontFamily:'SuezOne-Regular', fontSize:20}}>{user.major}</Text>
          </View>

          <View style={[styles.box, {backgroundColor:theme.colors.background}]}>
            <View style={[styles.iconBubble, {backgroundColor:theme.colors.secondary}]}>           
              <Text style={{fontFamily:'SuezOne-Regular', fontSize:20}}>📆</Text>
            </View>
            <Text style={{fontFamily:'SuezOne-Regular', fontSize:20}}>{user.graduation_year}</Text>
          </View>
          
          <Text style={{fontFamily:'SuezOne-Regular', fontSize:20}}>About me</Text>
          <View 
            style={[
              styles.box, 
              {
                flexWrap:'wrap', 
                backgroundColor:theme.colors.background,
              }
            ]}
          >
            <Text style={{fontFamily:'NotoSans_Condensed-Regular', fontSize:14}}>{user.description}</Text>
          </View>

          {/* photos */}


       
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
  },
  iconBubble: {
    width:45,
    height:45,
    borderRadius:60,
    justifyContent:'center',
    alignItems:'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

  }
})