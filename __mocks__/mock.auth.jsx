import React from "react"
import {Modal, SafeAreaView, Text, View} from "react-native"
import { Button, useTheme } from "react-native-paper"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import {fab} from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(fab)


function MockAuth() {
  const theme = {
    background: '#FFFFFF',
    thirdPartyBg: '#EFEFEC',
    tertiaryDark: '#2D4219',
    
  }
  const customTheme = useTheme()
  return (
    <SafeAreaView style={{flex:1 , backgroundColor: customTheme.colors.background, alignItems: 'center'}}>
      <View style={{marginTop:50}}>
        {/* header */}
        <View style={{justifyContent:'center', alignItems:'center', marginBottom:35}}>
          <View style={{height:50, width:50, backgroundColor:'#890000', marginBottom:25}}></View>
          <View style={{height:20, width:20, backgroundColor:'#be0000', marginTop:-50, marginBottom:25}}></View>

          <View style={{ width:150, alignItems:'center', justifyContent:'center' }}>
            <Text style={{fontSize:18, fontFamily:'NotoSans_Condensed-Regular', fontWeight:'700', color:customTheme.colors.primary, textAlign:'center'}}>Sign up or log in to start college</Text>
          </View>
        </View>
        {/* content */}
        <View style={{gap:15}}>
          
          <Button
            mode="contained" // changed to "contained" to use the elevated style
            buttonColor={customTheme.colors.primary} // changed to color instead of buttonColor
            contentStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }} // added flexDirection and alignItems
            labelStyle={{ fontSize: 16, fontWeight: '700', color: customTheme.colors.secondary }}
          >
            <FontAwesomeIcon
              icon={['fab', 'apple']}
              size={18}
              color={customTheme.colors.secondary}
              style={{ marginLeft: 16, marginRight: 8 }} // Adjust margin as needed
            />
            <Text>Continue with Apple</Text>
          </Button>

          <Button
            icon={() => <FontAwesomeIcon icon={['fab', 'google']} size={18} color={customTheme.colors.secondary}/>}
            mode="elevated"
            buttonColor={customTheme.colors.primary} 
            labelStyle={{ fontSize: 16, fontWeight: '700', color: customTheme.colors.secondary }}
          >
            <Text>Continue with Google</Text>
          </Button>

          <View style={{ height:.5, backgroundColor:customTheme.colors.primary }}/>

          <Button
            mode="elevated"
            buttonColor={'#890000'}
            contentStyle={{
              width: '100%',
            }}
          >
            <Text style={{fontSize:16, color:customTheme.colors.secondary, fontWeight:'700'}}>Continue with email</Text>
          </Button>
        </View>
      </View>





      {/* footer */}
      <View style={{position:'absolute', right:10, left:10, bottom:15 }}>
        <Text style={{fontSize: 11, color: customTheme.colors.primary, textAlign:'center'}}>
          By continuing to use DormParty, you agree to our
          {' '}
          <Text style={{fontSize: 11, color:customTheme.colors.primary, textDecorationLine:'underline'}}>Terms of Service</Text>
          {' '}
          and
          {' '}
          <Text style={{fontSize: 11, color:customTheme.colors.primary, textDecorationLine:'underline'}}>Privacy Policy</Text>
          . Personal data added to DormParty is public by default -- refer to our Privacy FAQ to make changes.
        </Text>
      </View>
    </SafeAreaView>
  )
}

export {MockAuth}