import React, {useState, useRef} from "react";
import { View } from "react-native";
import { useTheme, TextInput, } from "react-native-paper";
import useBearStore from "../../../libs/store";
import { Content } from "./identifier.view";


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
    // possible status code - 400 (bad req), 201, 403 (identifier already exists)
    if (identifier === "") {
      const status_code = await sendIdentifier(`${input1}${input2}${input3}`)
      if (status_code === 400) {
        // bad request
        setVisible({ ...visible, status:true, message:'Please provide a real phone number.' })
      } else if (status_code === 403) {
        // identifier already exists
        setVisible({ ...visible, status:true, message:'A profile with this phone number already exists, try logging in.' })
      } else if (status_code === 201) {
        /// move on 
        navigation.navigate('code')      }
    } else {
      const status_code = await sendIdentifier(identifier)
      if (status_code === 400) {
        // bad request
        setVisible({ ...visible, status:true, message:`Please provide a real ${id}.` })
      } else if (status_code === 403) {
        // identifier already exists
        setVisible({ ...visible, status:true, message:`A profile with this ${id} already exists, try logging in.` })
      } else if (status_code === 201) {
        /// move on 
        navigation.navigate('code')
      }
    }
    setLoading(false)
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
    <Content 
      customTheme={customTheme}
      navigation={navigation}
      id={id}
      phoneInput={phoneInput}
      identifier={identifier}
      setIdentifier={setIdentifier}
      loading={loading}
      handleDisabled={handleDisabled}
      buttonClick={buttonClick}
      visible={visible}
      onDismissSnackBar={onDismissSnackBar}
    />
  )
}

export {IdentifierView}