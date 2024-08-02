import React, { useState, useRef } from "react";
import { View, ViewStyle, TextInput as RNTextInput } from "react-native";
import { TextInput } from "react-native-paper";
import useBearStore from "../../../libs/store";
import { Content } from "./identifier.view";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "types/StackParamList";
import {theme} from "assets/theme";

// Types for navigation and route props
type IdentifierViewNavigationProp = StackNavigationProp<AuthStackParamList, 'identifier'>;
type IdentifierViewRouteProp = RouteProp<AuthStackParamList, 'identifier'>;

interface IdentifierViewProps {
  route: IdentifierViewRouteProp;
  navigation: IdentifierViewNavigationProp;
};

interface VisibleState {
  /** Types for component state */
  status: boolean;
  message?: string;
};

const IdentifierView: React.FC<IdentifierViewProps> = ({ 
  route, 
  navigation 
}) => {  
  const { id } = route.params;

  const [identifier, setIdentifier] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const inputRef1 = useRef<RNTextInput | null>(null);
  const inputRef2 = useRef<RNTextInput | null>(null);
  const inputRef3 = useRef<RNTextInput | null>(null);

  const [input1, setInput1] = useState<string>("");
  const [input2, setInput2] = useState<string>("");
  const [input3, setInput3] = useState<string>("");

  const [visible, setVisible] = useState<VisibleState>({
    status: false,
    message: "",
  });

  const onDismissSnackBar = () => setVisible({ ...visible, status:false });

  const sendIdentifier = useBearStore((state) => state.sendIdentifier)

  const buttonClick = async () => {
    setLoading(true);
    // possible status code - 400 (bad req), 201, 403 (identifier already exists)
    if (identifier === "") {
      const status_code = await sendIdentifier(`${input1}${input2}${input3}`);
      if (status_code === 400) {
        // bad request
        setVisible({
          ...visible,
          status:true,
          message:'Please provide a real phone number.',
        });
      } else if (status_code === 403) {
        // identifier already exists
        setVisible({
          ...visible,
          status: true,
          message: 'A profile with this phone number already exists, try logging in.',
        });
      } else if (status_code === 201) {
        // move on
        navigation.navigate('code');
      }
    } else {
      const status_code = await sendIdentifier(identifier);
      if (status_code === 400) {
        // bad request
        setVisible({
          ...visible,
          status: true,
          message: `Please provide a real ${id}.`,
        });
      } else if (status_code === 403) {
        // identifier already exists
        setVisible({
          ...visible,
          status: true,
          message: `A profile with this ${id} already exists, try logging in.`,
        });
      } else if (status_code === 201) {
        // move on
        navigation.navigate('code');
      };
    };
    setLoading(false);
  };
  
  const handleTextChange = (text: string, inputRef: React.RefObject<RNTextInput>, setInput: React.Dispatch<React.SetStateAction<string>>) => {
    setInput(text);
    // Check if maxLength is reached
    if (text.length === 3) {
      // Focus on the next TextInput
      switch (inputRef) {
        case inputRef1:
          inputRef2.current?.focus();
          break;
        case inputRef2:
          inputRef3.current?.focus();
          break;
        default:
          break;
      };
    };
  };

  const handleDisabled = () => {
    if (id === 'Phone Number') {
      return input1 === "" || input2 === "" || input3 === "";
    } else {
      return identifier === "";
    };
  };

  const phoneInput = () => {
    return (
      <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' } as ViewStyle}>
        <TextInput
          mode="outlined"
          outlineColor={theme.colors.primary}
          textColor={theme.colors.primary}
          autoCapitalize="none"
          ref={inputRef1}
          maxLength={3}
          onChangeText={(text) => handleTextChange(text, inputRef1, setInput1)}
          value={input1}
        />
        <View style={{ height:2, backgroundColor:theme.colors.primary, width:10 }}/>
        <TextInput
          mode="outlined"
          outlineColor={theme.colors.primary}
          textColor={theme.colors.primary}
          autoCapitalize="none"
          ref={inputRef2}
          maxLength={3}
          onChangeText={(text) => handleTextChange(text, inputRef2, setInput2)}
          value={input2}
        />
        <View style={{ height:2, backgroundColor:theme.colors.primary, width:10 }}/>
        <TextInput
          mode="outlined"
          outlineColor={theme.colors.primary}
          textColor={theme.colors.primary}
          autoCapitalize="none"
          ref={inputRef3}
          maxLength={4}
          style={{ width: 70 }}
          onChangeText={(text) => handleTextChange(text, inputRef3, setInput3)}
          value={input3}
        />
      </View>
    );
  };

  return (
    <Content 
      theme={theme}
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
  );
};

export { IdentifierView };