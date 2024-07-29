import React, {useEffect, useState} from "react";
import {FlatList, SafeAreaView, Text, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import FastImage from "react-native-fast-image"
import { useTheme, IconButton, TextInput } from "react-native-paper";
import Empty from "../../components/Empty";
import Cell from "../../components/Cell";
import useBearStore from "../../libs/store";
import {appendFullUrl} from "../../libs/utils/appendFullUrl";


function SearchView({navigation}) {
  const customTheme = useTheme()
  
  const [query, setQuery] = useState("")
  const searchList = useBearStore((state) => state.searchList);
  const searchUsers = useBearStore((state) => state.searchUsers);

  useEffect(() => {
    searchUsers(query);
  }, [query]);

  const getStatus = (status) => {
    switch (status) {
      case "no-connection":
        return 'plus'
      case "pending-them":
        return 'plus'
      case "pending-me":
        return 'plus'
      case "connected":
        return 'check'
      default:
        break;
    }
  }

  return (
    <SafeAreaView style={{flex:1, backgroundColor:customTheme.colors.background}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{flex:1}}>
        <View style={{flex:1}}>
          <View style={{ justifyContent:'center', alignItems:'flex-start', marginLeft:15, marginTop:5 }}>
            <IconButton 
              onPress={() => navigation.goBack()}
              icon={() => <FontAwesomeIcon icon="arrow-left" color={customTheme.colors.primary} />}
              size={22}
              mode="contained"
            />
          </View>
          <View style={{ alignItems:'center', marginHorizontal:25 }}>
            {/* input */}
            <View 
              style={{
                flexDirection:'row',
                marginTop:10,
              }}
            >
              <TextInput 
                mode="outlined"
                label={"Search"}
                value={query}
                onChangeText={text => setQuery(text)}
                outlineColor={customTheme.colors.primary}
                textColor={customTheme.colors.primary}
                keyboardType={"default"}
                autoCapitalize={false}
                style={{flex:1}}
              />
            </View>
            <View 
              style={{ 
                height:1.5, 
                borderRadius:12,
                marginVertical:15, 
                backgroundColor:customTheme.colors.primary, 
                width:"100%"
              }} 
            />

            <View style={{width:'100%', height:'100%'}}> 
              {searchList.length === 0 && query === "" ? (
                <Empty
                  emoji="🔎"
                  message="Search for friends"
                  theme={customTheme}
                />
              ) : searchList.length === 0 && query !== "" ?
                  <Empty
                    emoji="🤔"
                    message={`Can't find anything for ${query}.`}
                    theme={customTheme}
                  />
              :(
                <FlatList
                  data={searchList}
                  keyExtractor={(item) => item.id}
                  style={{width:'100%'}}
                  renderItem={({item}) => (
                    <Cell>
                      <TouchableOpacity>
                        <FastImage
                          key={item.id}
                          style={{
                            width: 70,
                            height: 70,
                            borderRadius: 70 / 2,
                            backgroundColor: customTheme.colors.background,
                            borderWidth: 1,
                            borderColor: customTheme.colors.primary,
                          }}
                          source={appendFullUrl(item.thumbnail)}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                      </TouchableOpacity>
                      {/* <TouchableOpacity> */}
                      <View style={{
                        flex: 1,
                        paddingHorizontal: 15,
                        justifyContent: "center",
                      }}>
                        <Text 
                          style={{
                            fontSize:16,
                            fontWeight: "600",
                            marginBottom: 4,
                            color: customTheme.colors.primary
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>
                      <IconButton 
                        icon={() => <FontAwesomeIcon icon={getStatus(item.status)} color={customTheme.colors.primary} />}
                        size={22}
                        mode="contained"
                      />
                    </Cell>
                  )}
                />
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export {SearchView};