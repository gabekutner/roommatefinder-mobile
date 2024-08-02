import React, {useRef, useState} from "react";
import {SafeAreaView, Text, View, TouchableWithoutFeedback, Keyboard, TextInput as RNTextInput} from "react-native";
import {Button, IconButton, TextInput, Snackbar} from "react-native-paper";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import useBearStore from "../../../libs/store";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "types/StackParamList";
import {theme} from "assets/theme";

type VerificationCodeViewNavigationProp = StackNavigationProp<AuthStackParamList, 'code'>;

interface  VerificationCodeProps {
  navigation: VerificationCodeViewNavigationProp;
};

interface VisibleState {
  status: boolean;
  message?: string;
};

const VerificationCodeView: React.FC<VerificationCodeProps> = ({ 
  navigation
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const user = useBearStore((state) => state.user)

  const inputRef1 = useRef<RNTextInput | null>(null);
  const inputRef2 = useRef<RNTextInput | null>(null);
  const inputRef3 = useRef<RNTextInput | null>(null);
  const inputRef4 = useRef<RNTextInput | null>(null);

  const [input1, setInput1] = useState<string>("")
  const [input2, setInput2] = useState<string>("")
  const [input3, setInput3] = useState<string>("")
  const [input4, setInput4] = useState<string>("")

  const [visible, setVisible] = useState<VisibleState>({
    status: false,
    message: "",
  });

  const onDismissSnackBar = () => setVisible({...visible, status:false});

  const sendOTP = useBearStore((state) => state.sendOTP);

  const handleTextChange = (text: string, inputRef: React.RefObject<RNTextInput>, setInput: React.Dispatch<React.SetStateAction<string>>) => {
    setInput(text);
    // Check if maxLength is reached
    if (text.length === 1) {
      // Focus on the next TextInput
      switch (inputRef) {
        case inputRef1:
          inputRef2.current?.focus();
          break;
        case inputRef2:
          inputRef3.current?.focus();
          break;
        case inputRef3:
          inputRef4.current?.focus();
          break;
        default:
          break;
      };
    };
  };

  const buttonClick = async () => {
    setLoading(true);
    // combine all inputs 
    const otp = `${input1}${input2}${input3}${input4}`;
    const response = await sendOTP(otp);

    // e.response.status object
    if (response === 400) {
      setVisible({ ...visible, status:true, message:'Incorrect validation code' });
    } else if (response === 404) {
      // 404 - profile not found, check sendIdentifier function
      setVisible({ ...visible, status:true, message:'Server error, close the app and try again' });
    } else {
      if (response.data.otp_verified) {
        // good
        navigation.navigate('setup')
      };
    };
    setLoading(false);
  };

  return (
    <SafeAreaView style={{flex:1 , backgroundColor: theme.colors.background}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{flex:1}}>
          <View style={{ justifyContent:'center', alignItems:'flex-start', marginLeft:15, marginTop:15 }}>
            <IconButton 
              onPress={() => navigation.goBack()}
              icon={() => <FontAwesomeIcon icon="arrow-left" color={theme.colors.primary} />}
              size={22}
              mode="contained"
            />
          </View>
          <View style={{ justifyContent:'center', alignItems: 'center' }}>
            {/* header */}
            <View style={{justifyContent:'center', alignItems:'center', marginVertical:40}}>
              {/* logo */}
              <View style={{height:50, width:50, backgroundColor:theme.colors.onTertiary, marginBottom:25}}></View>
              <View style={{height:20, width:20, backgroundColor:theme.colors.tertiary, marginTop:-50, marginBottom:25}}></View>

              <View style={{ width:200, alignItems:'center', justifyContent:'center' }}>
                <Text style={{fontSize:18, fontFamily:'NotoSans_Condensed-Regular', fontWeight:'700', color:theme.colors.primary, textAlign:'center'}}>
                  Type the verification code sent to `{user.identifier}`
                </Text>
              </View>
            </View>
            {/* content */}
            <View style={{gap: 35}}>

              <View style={{flexDirection:'row',gap:5}}>
                <TextInput 
                  mode="outlined"
                  outlineColor={theme.colors.primary}
                  textColor={theme.colors.primary}
                  autoCapitalize={'none'}
                  ref={inputRef1}
                  maxLength={1}  // Example maxLength
                  onChangeText={(text) => handleTextChange(text, inputRef1, setInput1)}
                  value={input1}
                />
                <TextInput 
                  mode="outlined"
                  outlineColor={theme.colors.primary}
                  textColor={theme.colors.primary}
                  autoCapitalize={'none'}
                  ref={inputRef2}
                  maxLength={1}
                  onChangeText={(text) => handleTextChange(text, inputRef2, setInput2)}
                  value={input2}
                />
                <TextInput 
                  mode="outlined"
                  outlineColor={theme.colors.primary}
                  textColor={theme.colors.primary}
                  autoCapitalize={'none'}
                  ref={inputRef3}
                  maxLength={1}
                  onChangeText={(text) => handleTextChange(text, inputRef3, setInput3)}
                  value={input3}
                />
                <TextInput 
                  mode="outlined"
                  outlineColor={theme.colors.primary}
                  textColor={theme.colors.primary}
                  autoCapitalize={'none'}
                  ref={inputRef4}
                  maxLength={1} 
                  onChangeText={(text) => handleTextChange(text, inputRef4, setInput4)}
                  value={input4}
                />
              </View>
              
              <Button
                loading={loading}
                onPress={buttonClick}
                mode="elevated"
                buttonColor={theme.colors.onTertiary}
                labelStyle={{
                  fontFamily: 'NotoSans_Condensed-Regular',
                  fontSize: 16, 
                  fontWeight: '700',
                  color: theme.colors.secondary
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
              labelStyle: {color: theme.colors.secondary}
            }}
            wrapperStyle={{backgroundColor: theme.colors.onTertiary}}
          >
            <Text style={{fontSize:14, color:theme.colors.secondary}}>
              {visible.message}
            </Text>
          </Snackbar>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export {VerificationCodeView};