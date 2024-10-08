import React, {useState, useEffect} from "react";
import {Platform, InputAccessoryView} from "react-native";

import {useTheme} from "react-native-paper";
// import useStore from "../../../zustand/store";

import {Container, MessagesWrapper, GroupModal} from "./message.view";
import {MessageHeader} from "./Components/MessageHeader";
import {MessageInput} from "./Components/MessageInput";
import useBearStore from "../../../libs/store";


function MessageView({navigation, route}) {
  const theme = useTheme();

  const [message, setMessage] = useState("");
  const messagesList = useBearStore((state) => state.messagesList);
  const messagesNext = useBearStore((state) => state.messagesNext);
  const messageList = useBearStore((state) => state.messageList);
  const messageSend = useBearStore((state) => state.messageSend);
  const messageType = useBearStore((state) => state.messageType);

  const connectionId = route.params.id;
  const friend = route.params.friend;

  useEffect(() => {
    messageList(connectionId);
  }, []);

  function onSend() {
    const cleaned = message.replace(/\s+/g, " ").trim();
    if (cleaned.length === 0) return;
    messageSend(connectionId, cleaned);
    setMessage("");
  }

  function onType(value) {
    setMessage(value);
    messageType(friend.id);
  }

  return (
    <Container theme={theme}>
      <MessageHeader theme={theme} friend={friend} navigation={navigation} />
      <MessagesWrapper
        messagesList={messagesList}
        messagesNext={messagesNext}
        connectionId={connectionId}
        friend={friend}
        theme={theme}
      />
      {Platform.OS === "ios" ? (
        <InputAccessoryView>
          <MessageInput
            message={message}
            setMessage={onType}
            onSend={onSend}
            theme={theme}
          />
        </InputAccessoryView>
      ) : (
        <MessageInput
          message={message}
          setMessage={onType}
          onSend={onSend}
          theme={theme}
        />
      )}
    </Container>
  );
}

export {MessageView};
