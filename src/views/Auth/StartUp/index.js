import React from "react";
import {SafeAreaView, Text, View, StyleSheet} from "react-native";
import {Button, useTheme} from "react-native-paper";


function StartUpView({ navigation }) {
  const customTheme = useTheme();
  return (
    <SafeAreaView style={{flex:1 , backgroundColor: customTheme.colors.background, alignItems: 'center'}}>
      <View>
        {/* header */}
        <View style={{justifyContent:'center', alignItems:'center', marginVertical:40}}>
          {/* logo */}
          <View style={{height:50, width:50, backgroundColor:customTheme.colors.tertiaryDark, marginBottom:25}}></View>
          <View style={{height:20, width:20, backgroundColor:customTheme.colors.tertiary, marginTop:-50, marginBottom:25}}></View>

          <View style={{ width:150, alignItems:'center', justifyContent:'center' }}>
            <Text style={{fontSize:18, fontFamily:'NotoSans_Condensed-Regular', fontWeight:'700', color:customTheme.colors.primary, textAlign:'center'}}>Sign up or log in to start college</Text>
          </View>
        </View>
        {/* content */}
        <View style={{gap:15}}>

          <Button
            onPress={() => navigation.navigate('identifier', {id: 'Email'})}
            mode="elevated"
            buttonColor={customTheme.colors.primary} 
            labelStyle={[
              styles.fontFamily,
              styles.buttonText,
              {color: customTheme.colors.secondary}
            ]}
          >
            <Text>Continue with email</Text>
          </Button>

          <Button
            onPress={() => navigation.navigate('identifier', {id: 'Phone Number'})}
            mode="elevated"
            buttonColor={customTheme.colors.primary} 
            labelStyle={[
              styles.fontFamily,
              styles.buttonText,
              {color: customTheme.colors.secondary}
            ]}
          >
            <Text>Continue with phone number</Text>
          </Button>

          <Button
            onPress={() => navigation.navigate('identifier', {id: 'UID'})}
            mode="elevated"
            buttonColor={customTheme.colors.primary} 
            labelStyle={[
              styles.fontFamily,
              styles.buttonText,
              {color: customTheme.colors.secondary}
            ]}
          >
            <Text>Continue with UID</Text>
          </Button>

          {/* spacer */}
          <View style={{flexDirection:'row', gap: 10, alignItems:'center', justifyContent:'center'}}>
            <View 
              style={[
                styles.spacer,
                {backgroundColor:customTheme.colors.primary}
              ]}
            />
            <Text style={{fontSize: 12, color: customTheme.colors.primary, fontWeight: '500'}}>or</Text>
            <View 
              style={[
                styles.spacer,
                {backgroundColor:customTheme.colors.primary}
              ]}
            />
          </View>

          <Button
            onPress={() => navigation.reset({index: 0, routes: [{ name: 'login' }], })}
            mode="elevated"
            buttonColor={customTheme.colors.tertiaryDark}
            labelStyle={[
              styles.fontFamily,
              styles.buttonText,
              {color: customTheme.colors.secondary}
            ]}
          >
            <Text>Log in</Text>
          </Button>

        </View>
      </View>


      {/* footer */}
      <View style={{position:'absolute', right:50, left:50, bottom:35 }}>
        <Text 
          style={[
            styles.text,
            styles.smallText,
            {
              textAlign: 'center',
              color: customTheme.colors.primary,
              textDecorationLine: 'none'
            }
          ]}
        >
          By continuing to use DormParty, you agree to our
          {' '}
          <Text 
            style={[
              styles.text,
              styles.smallText,
              {color: customTheme.colors.primary}
            ]}
          >
            Terms of Service
          </Text>
          {' '}
          and
          {' '}
          <Text 
            style={[
              styles.text,
              styles.smallText,
              {color: customTheme.colors.primary}
            ]}
          >
            Privacy Policy
          </Text>
          .
        </Text>
      </View>
    </SafeAreaView>
  );
};

export {StartUpView};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'NotoSans_Condensed-Regular',
  },
  
  smallText: {
    fontSize: 11, 
    textDecorationLine:'underline'
  },
  buttonText: {
    fontSize: 16, 
    fontWeight: '700'
  },

  spacer: {
    height: .5, 
    width: 100,
  }

});