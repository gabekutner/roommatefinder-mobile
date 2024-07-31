import React, {useState, useRef} from "react";
import {SafeAreaView, Text, View, TouchableWithoutFeedback, Keyboard} from "react-native";
import {Button, IconButton, useTheme, TextInput, Snackbar} from "react-native-paper";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import useBearStore from "../../../libs/store";


function IdentifierView({ route, navigation }) {
  const {id} = route.params
  const customTheme = useTheme();

  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState();

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);

  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");

  const [visible, setVisible] = useState({
    status: false,
    missing: []
  });

  const onDismissSnackBar = () => setVisible({...visible, status:false});

  const sendIdentifier = useBearStore((state) => state.sendIdentifier)

  const buttonClick = async () => {
    setLoading(true)

    const status_code = await sendIdentifier(identifier)
    if (status_code === 400) {
      
    }

    setLoading(false)
    // 1. valid identifier
    // if (identifier === "") {
    //   // 2. create an account via phone number
    //   const res = await sendIdentifier(`${input1}${input2}${input3}`);
    //   console.log(res)

    //   setInput1("")
    //   setInput2("")
    //   setInput3("")
    //   inputRef1.current.focus();
    //   setLoading(false);
    //   // 3. navigate to verification code page
    //   if (res === 201) {
    //     navigation.navigate('code')
    //   } else if (res === 400) {
    //     // means some sort of error with formatting
    //     setVisible({...visible, status:true, message:'Phone numbers must be xxx xxx xxxx'})
    //   } else {
    //     // means a profile already exists
    //     setVisible({...visible, status:true, message:'A profile already exists with this phone number.'})
    //   }
    // } else {
    //   // 2. create an account via identifier
    //   const res = await sendIdentifier(identifier);
    //   console.log(res)

    //   setIdentifier("");
    //   setLoading(false);
    //   // 3. navigate to verification code page
    //   if (res === 201) {
    //     navigation.navigate('code')
    //   } else if (res === 400) {
    //     // means some sort of error with formatting
    //     if (id==="Email") {
    //       setVisible({...visible, status:true, message:'Emails must end in an @something.com'})
    //     } else {
    //       setVisible({...visible, status:true, message:'UIDs must start with the u and end with 7 digits.'})
    //     }
    //   } else {
    //     // means a profile already exists
    //     setVisible({...visible, status:true, message:`A profile already exists with this ${id}.`})
    //   }
    // };

  };
  
  const handleTextChange = (text, inputRef, setInput) => {
    setInput(text);
    // Check if maxLength is reached
    if (text.length === 3) {
      // Focus on the next TextInput
      switch (inputRef) {
        case inputRef1:
          inputRef2.current.focus();
          break;
        case inputRef2:
          inputRef3.current.focus();
          break;
        // Add more cases if you have more TextInput components
        default:
          break;
      };
    };
  };

  const handleDisabled = () => {
    if (id === 'Phone Number') {
      if (input1 === "" || input2 === "" || input3 === "") {
        return true;
      } else {
        return false;
      }
    } else {
      if (identifier === "") {
        return true;
      } else {
        return false;
      };
    };
  };

  const phoneInput = () => {
    return (
      <View style={{flexDirection:'row',gap:5, alignItems:'center'}}>
        <TextInput 
          mode="outlined"
          outlineColor={customTheme.colors.primary}
          textColor={customTheme.colors.primary}
          autoCapitalize={false}
          ref={inputRef1}
          maxLength={3} 
          onChangeText={(text) => handleTextChange(text, inputRef1, setInput1)}
          value={input1}
        />
        <View style={{ height:2, backgroundColor:customTheme.colors.primary, width:10 }}/>
        <TextInput 
          mode="outlined"
          outlineColor={customTheme.colors.primary}
          textColor={customTheme.colors.primary}
          autoCapitalize={false}
          ref={inputRef2}
          maxLength={3}
          onChangeText={(text) => handleTextChange(text, inputRef2, setInput2)}
          value={input2}
        />
        <View style={{ height:2, backgroundColor:customTheme.colors.primary, width:10 }}/>
        <TextInput 
          mode="outlined"
          outlineColor={customTheme.colors.primary}
          textColor={customTheme.colors.primary}
          autoCapitalize={false}
          ref={inputRef3}
          maxLength={4}
          style={{width:70}}
          onChangeText={(text) => handleTextChange(text, inputRef3, setInput3)}
          value={input3}
        />
      </View>
    )
  }

  return (
    <SafeAreaView style={{flex:1 , backgroundColor: customTheme.colors.background}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{flex:1}}>
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
                  Let's start with your {id !== 'UID' ? id.toLowerCase() : id}
                </Text>
              </View>
            </View>
            {/* content */}
            <View style={{gap: 35}}>
              {id === 'Phone Number' ? (
                phoneInput()
              ) : (
                <TextInput 
                  mode="outlined"
                  label={id}
                  value={identifier}
                  onChangeText={text => setIdentifier(text)}
                  placeholder={id === 'UID' ? "u1234567" : ""}
                  outlineColor={customTheme.colors.primary}
                  textColor={customTheme.colors.primary}
                  contentStyle={{width: 300}}
                  keyboardType={id === 'phone number' ? "phone-pad" : "email-address"}
                  autoCapitalize={false}
                  maxLength={id === 'phone number' ? 10 : null}
                />
              )}
              
              <Button
                loading={loading}
                disabled={handleDisabled()}
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
          <Snackbar
            visible={visible.status}
            onDismiss={onDismissSnackBar}
            action={{
              label: 'Got it',
              labelStyle: {color: customTheme.colors.secondary}
            }}
            wrapperStyle={{backgroundColor: customTheme.colors.tertiaryDark}}
          >
            <Text style={{fontSize:14, color:customTheme.colors.secondary}}>
              {visible.message}
            </Text>
          </Snackbar>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export {IdentifierView}