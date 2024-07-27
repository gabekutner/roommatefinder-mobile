import React from "react";
import { ImageBackground, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import {Button, useTheme} from "react-native-paper";
import useBearStore from "../../libs/store";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {dormsData} from "../../assets/Dictionary";
import { appendFullUrl } from "../../libs/utils/appendFullUrl";


function NewProfileView({ navigation }) {

  const customTheme = useTheme()

  const user = useBearStore((state) => state.user)
  const logout = useBearStore((state) => state.logout)

  const quizClick = () => {
    console.log('quiz')
  }


  const getThumbnail = () => {
    if (user.thumbnail !== null) {
      return appendFullUrl(user.thumbnail)
    } else {
      // return whatever the default is?
      return {}
    }
  }


  return (
    <View style={{flex:1}}>
      <StatusBar barStyle="dark-content" />
      <ImageBackground 
        source={require('../../assets/images/image_part_001.png')}
        style={{flex:1,bottom:470}}
      />
      <View 
        style={{
          height:'100%',
          position:'absolute',
          bottom:0,
          top:100,
          left:0,
          right:0,
          backgroundColor: customTheme.colors.background,  
          borderTopLeftRadius:12,
          borderTopRightRadius: 12,

          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          alignItems:'center',
          paddingTop:25,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false} style={{flex:1, width:'100%', marginBottom:200}}>
          <View style={{alignItems:'center', overflow:'visible'}}>
            {/* top bar */}
            <View style={{ flexDirection:'row' }}>
              <View style={{flex:1}}></View>
              <View style={{flex:2, justifyContent:'center', alignItems:'center'}}>
                <ImageBackground 
                  source={getThumbnail()}
                  imageStyle={{borderRadius:12}}
                  style={{ 
                    height:150,
                    width:100,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                  }} 
                />
                <View style={{marginTop: 10, width:'100%', justifyContent:'center', alignItems:'center'}}>
                  <Text style={{fontFamily:'NotoSans_Condensed-Regular', color:customTheme.colors.primary, fontSize:18, fontWeight:'500'}}>
                    {user.name}
                  </Text>
                </View>
                {/* <View style={{marginTop:5, width:'100%', justifyContent:'center', alignItems:'center', backgroundColor:customTheme.colors.primary}}>
                  <Text style={{fontFamily:'NotoSans_Condensed-Regular', color:customTheme.colors._tint_secondary, fontSize:18, fontWeight:'500'}}>
                    {dormsData[user.dorm_building-1].dorm}
                  </Text>
                </View> */}
              </View>
              <View style={{flex:1, alignItems:'center', paddingTop:10}}>
                <TouchableOpacity>
                  <FontAwesomeIcon 
                    icon="pen-to-square"
                    size={20}
                    color={customTheme.colors.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* <View style={{height:1, backgroundColor:customTheme.colors.primary, width:'80%', marginVertical:15}} /> */}

            {/* promos go here */}
            <View 
              style={{
                marginTop:20,
                backgroundColor:customTheme.colors.secondary,
                height:125,
                width:'80%',
                borderRadius:12,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                flexDirection:'row',
                // stop of items from flowing out
                overflow:'visible'
              }}
            >
              <View style={{flex:.6, paddingVertical:10, paddingHorizontal:15,}}>
                <Text style={{flex:1, fontFamily:'NotoSans_Condensed-Regular', fontSize:15, fontWeight:'600', color:customTheme.colors.primary}} >
                  Take Our Roommate Matching Quiz
                </Text>
                <View style={{flex:1}}>
                  <Button
                    onPress={quizClick}
                    mode="elevated"
                    buttonColor={customTheme.colors.tertiaryDark}
                    labelStyle={{
                      fontFamily: 'NotoSans_Condensed-Regular',
                      fontSize: 14, 
                      fontWeight: '700',
                      color: customTheme.colors.secondary
                    }}
                    style={{width:'70%'}}
                  >
                    <Text>Sure</Text>
                  </Button>
                </View>
              </View>
              <View 
                style={{
                  flex:.4, 
                  backgroundColor:customTheme.colors.primary, 
                  borderTopLeftRadius:20,
                  borderBottomLeftRadius:20,
                  borderTopRightRadius:12,
                  borderBottomRightRadius:12,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  overflow:'visible',
                }}
              >
                <Text
                  style={{ 
                    fontSize:110, 
                    position:'absolute', 
                    right:25,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                  }}
                >
                  🧪
                </Text>
              </View>
            </View>

            <View style={{height:1, backgroundColor:customTheme.colors.primary, width:'80%', marginVertical:15}} />

            <View 
              style={{
                height:300,
                width:'80%',
                backgroundColor:customTheme.colors.background,
                shadowColor: "#000",
                borderWidth:2,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              }}
            >

            </View>
            
            {/* logout */}
            <View style={{marginVertical:20, width:"80%"}}>
              <Button
                onPress={logout}
                mode="elevated"
                buttonColor={customTheme.colors.tertiaryDark}
                labelStyle={{
                  fontFamily: 'NotoSans_Condensed-Regular',
                  fontSize: 14, 
                  fontWeight: '700',
                  color: customTheme.colors.secondary
                }}
                style={{width:'100%'}}
              >
                <Text>Logout</Text>
              </Button>
            </View>

          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export {NewProfileView};