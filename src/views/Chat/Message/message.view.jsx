import React from "react";
import {Platform, View, FlatList,Text} from "react-native";


function Container(props) {
  return (
    <View style={{flex: 1, backgroundColor: props.theme.colors.background}}>
      {props.children}
    </View>
  );
};

function MessagesWrapper(props) {
  return (
    <View style={{flex:1, marginBottom: Platform.OS === 'ios' ? 60 : 0}} >
      <FlatList
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={{paddingTop: 20}}
        data={[{id: -1}, ...props.messagesList]}
        inverted={true}
        keyExtractor={item => item.id}
        onEndReached={() => {
          if (props.messagesNext) {
            messageList(props.connectionId, props.messagesNext)
          }
        }}
        renderItem={({ item, index}) => (
          // <MessageBubble
          //   index={index}
          //   message={item}
          //   friend={props.friend}
          // />
          <Text>{item.text}</Text>
        )}
      />
    </View>
  );
};




export {Container, MessagesWrapper};