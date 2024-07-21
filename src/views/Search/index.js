import React, {useEffect, useState} from "react";
import {FlatList, SafeAreaView, StyleSheet, View} from "react-native";
import {useTheme} from "react-native-paper";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import { moderateScale, verticalScale } from "../../libs/react-native-size-matters";

import useStore from "../../zustand/store";
import { styles } from "./search.styles";


function SearchView({navigation}) {
  const theme = useTheme();
  
  const [query, setQuery] = useState("");
  const searchList = useStore((state) => state.searchList);
  const searchUsers = useStore((state) => state.searchUsers);

  useEffect(() => {
    searchUsers(query);
  }, [query]);

  return (
    <SafeAreaView 
      style={[
        styles.container,
        {backgroundColor: theme.colors.background}
      ]}
    >
      {/* <View style={styles.wrapper}>
        <CustomButton
          onClick={() => navigation.goBack()}
          style={{paddingLeft: moderateScale(16), borderWidth: 0}}
        >
          <FontAwesomeIcon
            icon="arrow-left"
            size={verticalScale(24)}
            color={colors.tint}
          />
        </CustomButton>
        <View style={{width: moderateScale(290)}}>
          <CustomTextInput
            placeholder={"Search ..."}
            placeholderTextColor={colors.tertiary}
            colors={colors}
            value={query}
            onChangeText={setQuery}
            icon="magnifying-glass"
            iconColor={colors.tertiary}
            iconStyle={{marginHorizontal: moderateScale(8)}}
            containerStyle={styles.inputContainer}
            inputStyle={styles.inputTextContainer}
          />
        </View>
      </View>
      {searchList === null ? (
        <Empty
          icon="magnifying-glass"
          message="Search for friends"
          centered={false}
          colors={colors}
        />
      ) : searchList.length === 0 ? (
        <Empty
          emoji="🤷‍♂️"
          message={"Hmmm... couldn't find anything for '" + query + "'"}
          centered={false}
          colors={colors}
        />
      ) : (
        <FlatList
          data={searchList}
          renderItem={({item}) => (
            <SearchRow navigation={navigation} item={item} />
          )}
          keyExtractor={(item) => item.id}
        />
      )} */}
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.primary,
//   },
//   wrapper: {
//     flexDirection: "row",
//     gap: moderateScale(20),
//     alignItems: "center",
//   },
//   inputContainer: {
//     paddingLeft: moderateScale(8),
//     borderRadius: 12,
//     height: verticalScale(45),
//     marginBottom: verticalScale(14),
//     backgroundColor: colors.secondary,
//     borderWidth: 2,
//     borderColor: colors.tint,
//     paddingRight: moderateScale(45),
//     marginTop: verticalScale(15),
//   },
//   inputTextContainer: {
//     color: colors.tint,
//     fontSize: verticalScale(14),
//   },
// });


export {SearchView};