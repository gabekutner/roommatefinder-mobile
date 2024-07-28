import React from "react";
import { SafeAreaView, View} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { useTheme, IconButton } from "react-native-paper";


function PrivacyPolicy({ navigation }) {
  const customTheme = useTheme()
  return (
    <SafeAreaView style={{flex:1, backgroundColor:customTheme.colors.background}}>
      <View style={{ justifyContent:'center', alignItems:'flex-start', marginLeft:15, marginTop:15 }}>
        <IconButton 
          onPress={() => navigation.goBack()}
          icon={() => <FontAwesomeIcon icon="arrow-left" color={customTheme.colors.primary} />}
          size={22}
          mode="contained"
        />
      </View>
      <View>

      </View>
    </SafeAreaView>
  )
}

export {PrivacyPolicy}