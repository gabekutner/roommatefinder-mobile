import React, {useRef, useState} from "react";
import {SafeAreaView, Text, View, TouchableWithoutFeedback, Keyboard} from "react-native";
import {Button, IconButton, useTheme, TextInput} from "react-native-paper";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import useBearStore from "../../../libs/store";


function VerificationCodeView({ navigation }) {
  
  const customTheme = useTheme();
  const [loading, setLoading] = useState(false);

  const user = useBearStore((state) => state.user)

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);

  const [input1, setInput1] = useState("")
  const [input2, setInput2] = useState("")
  const [input3, setInput3] = useState("")
  const [input4, setInput4] = useState("")

  const sendOTP = useBearStore((state) => state.sendOTP);

  const handleTextChange = (text, inputRef, setInput) => {
    setInput(text)
    // Check if maxLength is reached
    if (text.length === 1) {
      // Focus on the next TextInput
      switch (inputRef) {
        case inputRef1:
          inputRef2.current.focus();
          break;
        case inputRef2:
          inputRef3.current.focus();
          break;
        case inputRef3:
          inputRef4.current.focus();
          break;
        // Add more cases if you have more TextInput components
        default:
          break;
      }
    }
  };

  const buttonClick = async () => {
    setLoading(true)
    // combine all inputs 
    const otp = `${input1}${input2}${input3}${input4}`;
    const res = await sendOTP(otp)
    setLoading(false)

    if (res.otp_verified) {
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: 'setup' }],
      // })
      navigation.navigate('setup')
    } else {
      // snackbar error
    }
  }

  return (
    <SafeAreaView style={{flex:1 , backgroundColor: customTheme.colors.background}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <View style={{ justifyContent:'center', alignItems:'flex-start', marginLeft:15, marginTop:15 }}>
            <IconButton 
              onPress={() => navigation.goBack()}
              icon={() => <FontAwesomeIcon icon="arrow-left" color={customTheme.colors.primary} />}
              size={22}
              mode="contained"
            />
          </View>
          <View style={{ justifyContent:'center', alignItems: 'center' }}>
            {/* header */}
            <View style={{justifyContent:'center', alignItems:'center', marginVertical:40}}>
              {/* logo */}
              <View style={{height:50, width:50, backgroundColor:customTheme.colors.tertiaryDark, marginBottom:25}}></View>
              <View style={{height:20, width:20, backgroundColor:customTheme.colors.tertiary, marginTop:-50, marginBottom:25}}></View>

              <View style={{ width:200, alignItems:'center', justifyContent:'center' }}>
                <Text style={{fontSize:18, fontFamily:'NotoSans_Condensed-Regular', fontWeight:'700', color:customTheme.colors.primary, textAlign:'center'}}>
                  Type the verification code sent to `{user.identifier}`
                </Text>
              </View>
            </View>
            {/* content */}
            <View style={{gap: 35}}>

              <View style={{flexDirection:'row',gap:5}}>
                <TextInput 
                  mode="outlined"
                  outlineColor={customTheme.colors.primary}
                  textColor={customTheme.colors.primary}
                  // contentStyle={{width: 300}}
                  autoCapitalize={false}
                  ref={inputRef1}
                  maxLength={1}  // Example maxLength
                  onChangeText={(text) => handleTextChange(text, inputRef1, setInput1)}
                  value={input1}
                />
                <TextInput 
                  mode="outlined"
                  outlineColor={customTheme.colors.primary}
                  textColor={customTheme.colors.primary}
                  // contentStyle={{width: 300}}
                  autoCapitalize={false}
                  ref={inputRef2}
                  maxLength={1}
                  onChangeText={(text) => handleTextChange(text, inputRef2, setInput2)}
                  value={input2}
                />
                <TextInput 
                  mode="outlined"
                  outlineColor={customTheme.colors.primary}
                  textColor={customTheme.colors.primary}
                  // contentStyle={{width: 300}}
                  autoCapitalize={false}
                  ref={inputRef3}
                  maxLength={1}
                  onChangeText={(text) => handleTextChange(text, inputRef3, setInput3)}
                  value={input3}
                />
                <TextInput 
                  mode="outlined"
                  outlineColor={customTheme.colors.primary}
                  textColor={customTheme.colors.primary}
                  // contentStyle={{width: 300}}
                  autoCapitalize={false}
                  ref={inputRef4}
                  maxLength={1} 
                  onChangeText={(text) => handleTextChange(text, inputRef4, setInput4)}
                  value={input4}
                />

              </View>
              
              <Button
                // disabled={}
                loading={loading}
                onPress={buttonClick}
                mode="elevated"
                buttonColor={customTheme.colors.tertiaryDark}
                labelStyle={{
                  fontFamily: 'NotoSans_Condensed-Regular',
                  fontSize: 16, 
                  fontWeight: '700',
                  color: customTheme.colors.secondary
                }}
              >
                <Text>Continue</Text>
              </Button>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export {VerificationCodeView}