import React, {useState} from "react";
import { ImageBackground, ScrollView, StatusBar, Text, TouchableOpacity, View, Image } from "react-native";
import {Button, Switch, useTheme} from "react-native-paper";
import useBearStore from "../../libs/store";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {dormsData} from "../../assets/Dictionary";
import { appendFullUrl } from "../../libs/utils/appendFullUrl";
import {theme} from "../../assets/theme";


function NewProfileView({ navigation }) {

  const user = useBearStore((state) => state.user)
  const logout = useBearStore((state) => state.logout)
  const pauseProfile = useBearStore((state) => state.pauseProfile)

  const getThumbnail = () => {
    if (user.thumbnail !== null) {
      return appendFullUrl(user.thumbnail)
    } else {
      // return whatever the default is? assets/images/profile.png
      return {};
    };
  };

  const [pauseEnabled, setPauseEnabled] = useState(user.pause_profile);
  const togglePaused = () => {
    setPauseEnabled((previousState) => !previousState);
    pauseProfile()
  };


  return (
    <View style={{flex:1}}>
      <StatusBar barStyle="dark-content" />
      <ImageBackground 
        source={require('../../assets/images/image_part_001.png')}
        style={{flex:1,bottom:470}}
        imageStyle={{opacity:.9}}
      />
      <View 
        style={{
          height:'100%',
          position:'absolute',
          bottom:0,
          top:100,
          left:0,
          right:0,
          backgroundColor: theme.colors.background,  
          borderTopLeftRadius:12,
          borderTopRightRadius: 12,

          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -5,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          alignItems:'center',
          paddingTop:25,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false} style={{flex:1, width:'100%'}}>
          <View style={{alignItems:'center', overflow:'visible'}}>
            {/* top bar */}
            <View style={{ flexDirection:'row' }}>
              <View style={{flex:1}}></View>
              <View style={{flex:2, justifyContent:'center', alignItems:'center'}}>
                <Image 
                  source={getThumbnail()}
                  imageStyle={{borderRadius:12}}
                  style={{ 
                    height:150,
                    width:150,
                    borderRadius:100,
                    borderWidth:1,
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
                  <Text style={{fontFamily:'NotoSans_Condensed-Regular', color:theme.colors.primary, fontSize:18, fontWeight:'500'}}>
                    {user.name}
                  </Text>
                </View>
              </View>
              <View style={{flex:1, alignItems:'center', paddingTop:10}}>
                <TouchableOpacity onPress={() => navigation.navigate('edit-profile')}>
                  <FontAwesomeIcon 
                    icon="pen-to-square"
                    size={20}
                    color={theme.colors.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{marginTop:15, paddingHorizontal:25, width:'100%', gap:15, marginBottom:200, alignItems:'center'}}>
              
              <View 
                style={{
                  gap:10,
                  width:'90%', 
                  backgroundColor:theme.colors.background, 
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  paddingVertical:10,
                  paddingHorizontal:15,
                  borderRadius:12
                  
                }}
              >
                <Text style={{
                  fontFamily: 'NotoSans_Condensed-Regular',
                  fontSize: 18, 
                  fontWeight: '700',
                  color: theme.colors.primary
                }}>Your Profile</Text>
                <Button 
                  onPress={() => navigation.navigate('edit-profile')}
                  mode="elevated"
                  buttonColor={theme.colors.primary}
                  labelStyle={{
                    fontFamily: 'NotoSans_Condensed-Regular',
                    fontSize: 14, 
                    fontWeight: '700',
                    color: theme.colors.secondary
                  }}
                  style={{borderRadius:12}}
                >
                  <Text>Edit Profile</Text>
                </Button>

                <Button 
                  onPress={() => navigation.navigate('preview', { user: user })}
                  mode="elevated"
                  buttonColor={theme.colors.tertiary}
                  labelStyle={{
                    fontFamily: 'NotoSans_Condensed-Regular',
                    fontSize: 14, 
                    fontWeight: '700',
                    color: theme.colors.secondary
                  }}
                  style={{borderRadius:12}}
                >
                  <Text>Preview Profile</Text>
                </Button>
               </View>

               <View 
                style={{
                  gap:10,
                  width:'90%', 
                  backgroundColor:theme.colors.background, 
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  paddingVertical:10,
                  paddingHorizontal:15,
                  borderRadius:12
                  
                }}
              >
                <Text style={{
                  fontFamily: 'NotoSans_Condensed-Regular',
                  fontSize: 18, 
                  fontWeight: '700',
                  color: theme.colors.primary
                }}>Matching Quiz 🧪</Text>
                <Text style={{
                  fontFamily: 'NotoSans_Condensed-Regular',
                  fontSize: 16, 
                  fontWeight: '500',
                  color: theme.colors.primary
                }}>Take our roommate matching quiz!</Text>
                <Button 
                  onPress={() => navigation.navigate('quiz')}
                  mode="elevated"
                  buttonColor={theme.colors.primary}
                  labelStyle={{
                    fontFamily: 'NotoSans_Condensed-Regular',
                    fontSize: 14, 
                    fontWeight: '700',
                    color: theme.colors.secondary
                  }}
                  style={{borderRadius:12}}
                >
                  <Text>Let's do it!</Text>
                </Button>
              </View>

              <View 
                style={{
                  gap:10,
                  width:'90%', 
                  backgroundColor:theme.colors.background, 
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  paddingVertical:10,
                  paddingHorizontal:15,
                  borderRadius:12
                  
                }}
              >
                <Text style={{
                  fontFamily: 'NotoSans_Condensed-Regular',
                  fontSize: 18, 
                  fontWeight: '700',
                  color: theme.colors.primary
                }}>Preferences</Text>
                <View style={{flexDirection:'row', justifyContent:"space-between", alignItems:'center'}}>
                  <Text style={{
                    fontFamily: 'NotoSans_Condensed-Regular',
                    fontSize: 16, 
                    fontWeight: '500',
                    color: theme.colors.primary
                  }}>Pause Profile</Text>
                  <Switch 
                    trackColor={{true: theme.colors.tertiary}}
                    thumbColor={theme.colors.secondary}
                    ios_backgroundColor={theme.colors._tint_secondary}
                    onValueChange={togglePaused}
                    value={pauseEnabled}
                    style={{
                      transform: [{scaleX: 0.9}, {scaleY: 0.9}],
                    }}
                  />
                </View>
                <Button 
                   onPress={() => navigation.navigate('how-to')}
                  mode="elevated"
                  buttonColor={theme.colors.primary}
                  labelStyle={{
                    fontFamily: 'NotoSans_Condensed-Regular',
                    fontSize: 14, 
                    fontWeight: '700',
                    color: theme.colors.secondary
                  }}
                  style={{borderRadius:12}}
                >
                  <Text>How can I find a roommate?</Text>
                </Button>
                <Button 
                   onPress={() => navigation.navigate('privacy-policy')}
                  mode="elevated"
                  buttonColor={theme.colors.primary}
                  labelStyle={{
                    fontFamily: 'NotoSans_Condensed-Regular',
                    fontSize: 14, 
                    fontWeight: '700',
                    color: theme.colors.secondary
                  }}
                  style={{borderRadius:12}}
                >
                  <Text>Terms and Privacy</Text>
                </Button>


              </View>
              <Button
                onPress={logout}
                mode="elevated"
                buttonColor={theme.colors.onTertiary}
                labelStyle={{
                  fontFamily: 'NotoSans_Condensed-Regular',
                  fontSize: 14, 
                  fontWeight: '700',
                  color: theme.colors.secondary
                }}
                style={{width:'90%', borderRadius:12}}
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