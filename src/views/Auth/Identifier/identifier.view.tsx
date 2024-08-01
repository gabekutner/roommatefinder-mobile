import React from "react";
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconButton, Button, TextInput, Snackbar } from "react-native-paper";
import { themeType } from "assets/theme";

interface ContentProps {
  theme: themeType;
  navigation: {
    goBack: () => void;
  };
  id: string;
  phoneInput: () => JSX.Element;
  identifier: string;
  setIdentifier: (text: string) => void;
  loading: boolean;
  handleDisabled: () => boolean;
  buttonClick: () => void;
  visible: {
    status: boolean;
    message?: string;
  };
  onDismissSnackBar: () => void;
};

const Content: React.FC<ContentProps> = props => {
  const fill = {flex: 1};
  return (
    <SafeAreaView style={[fill, { backgroundColor: props.theme.colors.background }]}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={fill}>
          <View style={{ justifyContent:'center', alignItems:'flex-start', marginLeft:15, marginTop:15 }}>
            <IconButton 
              onPress={() => props.navigation.goBack()}
              icon={() => <FontAwesomeIcon icon="arrow-left" color={props.theme.colors.primary} />}
              size={22}
              mode="contained"
            />
          </View>
          <View style={{ justifyContent:'center', alignItems: 'center' }}>
            {/* header */}
            <View style={{ justifyContent:'center', alignItems:'center', marginVertical:40 }}>
              {/* logo */}
              <View style={{height:50, width:50, backgroundColor:props.theme.colors.onTertiary, marginBottom:25}}></View>
              <View style={{height:20, width:20, backgroundColor:props.theme.colors.tertiary, marginTop:-50, marginBottom:25}}></View>
                
              <View style={{ width:200, alignItems:'center', justifyContent:'center' }}>
                <Text style={{ fontSize:18, fontFamily:'NotoSans_Condensed-Regular', fontWeight:'700', color:props.theme.colors.primary, textAlign:'center' }}>
                  Let's start with your {props.id !== 'UID' ? props.id.toLowerCase() : props.id}
                </Text>
              </View>
            </View>
            {/* content */}
            <View style={{ gap: 35, height:50 }}>
              {props.id === 'Phone Number' ? (
                props.phoneInput()
              ) : (
                <TextInput 
                  mode="outlined"
                  label={props.id}
                  value={props.identifier}
                  onChangeText={text => props.setIdentifier(text)}
                  placeholder={props.id === 'UID' ? "u1234567" : ""}
                  outlineColor={props.theme.colors.primary}
                  textColor={props.theme.colors.primary}
                  contentStyle={{width: 300}}                 
                  keyboardType={props.id === 'phone number' ? "phone-pad" : "email-address"}
                  autoCapitalize="none"
                  maxLength={props.id === 'phone number' ? 10 : undefined}
                />
              )}
              <Button
                loading={props.loading}
                disabled={props.handleDisabled()}
                onPress={props.buttonClick}
                mode="elevated"
                buttonColor={props.theme.colors.onTertiary}
                labelStyle={{
                  fontFamily: 'NotoSans_Condensed-Regular',
                  fontSize: 16, 
                  fontWeight: '700',
                  color: props.theme.colors.secondary
                }}
              >
                <Text>Continue</Text>
              </Button>
            </View>
          </View>
          <Snackbar
            visible={props.visible.status}
            onDismiss={props.onDismissSnackBar}
            action={{
              label: 'Got it',
              labelStyle: { color: props.theme.colors.secondary }
            }}
            wrapperStyle={{ backgroundColor: props.theme.colors.onTertiary }}
          >
            <Text style={{fontSize:14, color:props.theme.colors.secondary}}>
              {props.visible.message}
            </Text>
          </Snackbar>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export { Content };